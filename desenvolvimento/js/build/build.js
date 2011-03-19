#!/usr/bin/env node

/**
 * Build/Compilador para todos os itens JS do Linha Framework
 * Requer NodeJS
 *
 * Ao executar o comando "node build.js" você pode passar alguns parâmentros:
 *     dev - cancela a criação da versão minifield, e faz apenas a versão dev (aqui define se é pra fazer minifield ou não)
 *     linha - cancela jquery, e executa apenas linha
 *     jquery - cancela linha e executa apenas jquery
 *
 * Ex: "node build.js dev linha" //Cria apenas a versão de desenvolvimento do linha
 * Outro Ex: "node build.js jquery dev" //Cria apenas a versão de desenvolvimento do jquery
 * Outro Ex: "node build.js dev" //Cria apenas a versão de desenvolvimento de todos os JS's
 *
 * Libraries usadas: NodeJS, Node JSMin, Node JSHint (Comunity Edition)
 */
var VERSION = '1.3',

	BUILD_DIR = '../../arquivos/',
	MIN_DIR = '../../../html/js/',
	
	OPTIONS = {
		dev: true, //Manter versão dev no BUILD_DIR?,
		lint: true, //Checa código com JSHint?
		lintPlugins: false,
		
		novo: true, //Se true, sempre irá deletar o arquivo anterior e criar um novo, se aplica apenas a versão dev
		separado: false, //Se true, irá separar o Linha JS dos Plugins Linha, na versão minifield (NÂO SE APLICA A VERSÂO DEV)
		extend: true //Se true, também irá pegar os extends dos Plugins jQuery - Ex. acord.extend.js
	},
	
	//Linha JS
	linha = {
		dir: '../src/linha/',
		arquivo : 'linha-' + VERSION + '.js',
		arquivoMin: 'linha-' + VERSION + '.min.js'
	},
	
	//Plugins Linha
	pluginsLinha = {
		dir: '../src/plugins/linha/',
		arquivo: 'linha.plugins.js',
		arquivoMin: 'linha.plugins.min.js'
	},
	
	//Plugins jQuery
	pluginsJquery = {
		dir: '../src/plugins/jquery/',
		arquivo: 'jquery.plugins.linha.js',
		arquivoMin: 'jquery.plugins.linha.min.js'
	};
	
/**
 * Global
 */
var FS = require('fs'),
	JSMIN = require('./jsmin.js').jsmin,
	JSHINT = require('./jshint').JSHINT;

/**
 * BUILD
 */
var Build = {
	
	_arquivos: [],
	criadoLinhaMin: false,
	
	/**
	 * Checa por erros no JS
	 * Se passar não para a execução do script :)
	 * @param [string] src
	 */
	lint: function(src){
		
		try{
		
			JSHINT(src, { evil: true, forin: true, undef: true, browser: true });
			
			if(JSHINT.errors){
				JSHINT.errors.forEach(function(erro){
					console.log(erro.id + " linha " + erro.line + ": " + erro.reason, erro.evidence);
  				});
  			}
  			
		} catch(e){
			console.log("JSHint FALHOU: " + e.message);
			process.exit(1);
		}
		
	return this;
	},
	
	/**
	 * Faz o minifield de um arquivos
	 * Comentários que começem com /*! serão preservados como comentários - like YUI compressor
	 * @param [string] src
	 * @param [number] nivel
	 */
	minifield: function(src, nivel){
	
		var regex = /(\/\*\![\s\S]*?\*\/)/gm,
			comentarios = src.match(regex);
		
		if(!nivel) nivel = 2;
	
		src = JSMIN(src.replace(regex, '__COMENTARIO__'), nivel);
	
		/**
		 * Re-coloca (isso existe?) os comentários
		 */
		if(comentarios){
	
			comentarios.forEach(function(value, index){
	
				src = src.replace(
					/(__COMENTARIO__)/, 
					((index != 0)? '\n\n' : '') + value.replace('/*!', '/**')
				);
			
			});
	
		}	
	
	return src;
	},
	
	/**
	 * Adiciona um arquivo para dar console no final
	 * @param [string] src
	 */
	addArquivo: function(src){
		
		this._arquivos.push(src);
		
		return this;
	},
	
	/**
	 * Cria a versão de desenvolvimento do Linha JS
	 */
	linhaDev: function(){
	
		var data = '';

		console.log('--- Criando fonte do Linha JS.');
		
		/**
		 * Processa cada arquivo do CORE
		 * É feito na mão, porque há uma ordem nos elementos que se for feito automaticamente sai errado
		 */
		['core.js', 'string.js', 'object.js', 'array.js', 'dom.js', 'css.js', 'events.js'].forEach(function(file){
		
			data += FS.readFileSync(linha.dir + file, 'UTF-8') + '\n\n';
		
		});
		
		/**
		 * Testa e escreve no arquivo
		 */	
		if(OPTIONS.lint) this.lint(data);
		FS.writeFileSync(BUILD_DIR + linha.arquivo, data);
		
		console.log('--- Fonte criado com sucesso!');
				
	return this.addArquivo(BUILD_DIR + linha.arquivo);
	},
	
	/**
 	 * Cria a versão minifield do Linha JS
 	 */
	linhaMin: function(){
	
		var data;
		
		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo){
			try{ 
				FS.unlinkSync(BUILD_DIR + linha.arquivo);
				
				if(!OPTIONS.separado)
					FS.unlinkSync(BUILD_DIR + pluginsLinha.arquivo);
			
			} catch(e){}
		}
		
		/**
		 * Tenta (nem que seja forçando) pegar o conteúdo do Linha JS
		 */
		while(data == undefined){
			
			try{				
				data = FS.readFileSync(BUILD_DIR + linha.arquivo, 'UTF-8');
			}catch(e){}
			
			if(!data) this.linhaDev();
		
		}
		
		/**
		 * Pegar o conteúdo dos Plugins Linha
		 */
		if(!OPTIONS.separado){
		
			var plugins;
			
			while(plugins == undefined){
			
				try{ plugins = FS.readFileSync(BUILD_DIR + pluginsLinha.arquivo, 'UTF-8'); }catch(e){}
			
				if(!plugins) this.pluginsLinhaDev();
		
			}
			
			data += plugins;
			
		}
		
		this.criadoLinhaMin = true;
		
		/**
		 * CRIA MINIFIELD
		 */
		console.log('--- Criando minifield do Linha JS.');	
		console.log('--- --- Os plugins estaram ' + ((!OPTIONS.separado)? 'JUNTOS' : 'SEPARADOS') + ' do Linha JS no minifield.');
			
		FS.writeFileSync(MIN_DIR + linha.arquivoMin, this.minifield(data));
			
		console.log('--- Minifield criado com sucesso!');

	return this.addArquivo(MIN_DIR + linha.arquivoMin);
	},
	
	/**
	 * Cria a versão de desenvolvimento dos Plugins Linha
	 */
	pluginsLinhaDev: function(){
		
		var data = '';
		
		console.log('--- Criando fonte dos Plugins Linha.');
	
		/**
		 * Lê a pasta dos Plugins Linha
		 * Processa cada arquivo
		 */
		FS.readdirSync(pluginsLinha.dir).forEach(function(file){
			
			data += FS.readFileSync(pluginsLinha.dir + file, 'UTF-8') + '\n\n';
				
		});
		
		/**
		 * Testa e escreve no arquivo
		 */				
		if(OPTIONS.lintPlugins) this.lint(data);
		FS.writeFileSync(BUILD_DIR + pluginsLinha.arquivo, data);
		
		console.log('--- Fonte criado com sucesso!');
		
	return this.addArquivo(BUILD_DIR + pluginsLinha.arquivo);
	},
	
	/**
	 * Cria a versão minifield dos Plugins Linha
	 */
	pluginsLinhaMin: function(){
		
		/**
		 * Checa se não é pra ficar junto
		 */
		if(!OPTIONS.separado){
		
			if(!this.criadoLinhaMin){
				console.log('--- PLUGINS LINHA DEVEM ESTAR JUNTOS DO LINHA JS - Alternando para minifield Linha JS...')
				return this.linhaMin();
			}
			
			return this;
		}
				
		var data;
		
		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo){
			try{ FS.unlinkSync(BUILD_DIR + pluginsLinha.arquivo); } catch(e){}
		}
		
		/**
		 * Tenta (nem que seja forçando) pegar o conteúdo dos Plugins Linha
		 */
		while(data == undefined){
			
			try{				
				data = FS.readFileSync(BUILD_DIR + pluginsLinha.arquivo, 'UTF-8');
			}catch(e){}
			
			if(!data) this.pluginsLinhaDev();
		
		}
		
		/**
		 * CRIA MINIFIELD
		 */
		console.log('--- Criando minifield dos Plugins Linha.');
		
		FS.writeFileSync( MIN_DIR + pluginsLinha.arquivoMin,	this.minifield(data) );
		
		console.log('--- Minifield criado com sucesso!');
		
	return this.addArquivo(MIN_DIR + pluginsLinha.arquivoMin);	
	},
	
	/**
 	 * Cria a versão de desenvolvimento dos Plugins jQuery
 	 */
	pluginsJqueryDev: function(){
	
		var data = '';
	
		console.log('--- Criando fonte dos Plugins jQuery.');
		
		/**
		 * Lê a pasta dos PLUGINS
		 * Processa cada arquivo
		 */
		FS.readdirSync(pluginsJquery.dir).forEach(function(file){	
			
			if(file.split('.').length > 2 && !OPTIONS.extend)
				return;
			
			data += FS.readFileSync(pluginsJquery.dir + file, 'UTF-8') + '\n\n';			
		});
				
		/**
		 * Testa e escreve no arquivo
		 */	
		if(OPTIONS.lintPlugins) this.lint(data);
		FS.writeFileSync(BUILD_DIR + pluginsJquery.arquivo, data);
		
		console.log('--- Fonte criado com sucesso!');
		
	return this.addArquivo(BUILD_DIR + pluginsJquery.arquivo);
	},
	
	/**
	 * Cria a versão minifield dos Plugins jQuery
	 */
	pluginsJqueryMin: function(){
	
		var data;
		
		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo){
			try{ FS.unlinkSync(BUILD_DIR + pluginsJquery.arquivo);} catch(e){}
		}
		
		/**
		 * Tenta (nem que seja forçando) pegar o conteúdo dos Plugins jQuery
		 */
		while(data == undefined){
			
			try{				
				data = FS.readFileSync(BUILD_DIR + pluginsJquery.arquivo, 'UTF-8');
			}catch(e){}
			
			if(!data) this.pluginsJqueryDev();
		
		}
		
		/**
		 * CRIA MINIFIELD
		 */
		console.log('--- Criando minifield dos Plugins jQuery.');
		
		FS.writeFileSync(
			MIN_DIR + pluginsJquery.arquivoMin,
			this.minifield(data));
		
		console.log('--- Minifield criado com sucesso!');
		
	return this.addArquivo(MIN_DIR + pluginsJquery.arquivoMin);
	}
}

/**
 * INICIA
 */
if(process.argv.length > 2){	
(function(){
		
	var dev, linha, jquery;
	
	/**
	 * Passo 1, detecta se é min ou dev
	 */
	dev = process.argv.some(function(e){ return e == 'dev' });

	/**
	 * Passo 2, checa se é pra fazer linha e/ou jquery 
	 */
	linha = process.argv.some(function(e){ return e == 'linha' });
	jquery = process.argv.some(function(e){ return e == 'jquery' });
	
	if(!linha && !jquery)
		linha = jquery = true;
	
	/**
	 * Passo 3, executa os scripts
	 */
	if(linha)
		(dev)? Build.linhaDev().pluginsLinhaDev() : Build.linhaMin().pluginsLinhaMin();
	
	if(jquery)
		(dev)? Build.pluginsJqueryDev() : Build.pluginsJqueryMin();

})();
	
/**
 * Método padrão, sem argumentos
 */
}else{
	
	Build
	.linhaMin()
	.pluginsLinhaMin()
	.pluginsJqueryMin();
	
}

/**
 * Exibe os arquivos que foram atualizados
 */
console.log('--- Arquivo(s) criado(s)/atualizado(s):');

Build._arquivos.forEach(function(item){
	console.log('--- --- ' + item);
});