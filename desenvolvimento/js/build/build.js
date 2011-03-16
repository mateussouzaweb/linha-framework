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
		novo: true, //Se true, sempre irá deletar o arquivo anterior e criar um novo, se aplica apenas a versão dev
		
		lint: true, //Checa código com JSHint?
		
		separado: false, //Se true, irá separar o Linha JS dos Plugins Linha
		extend: true //Se true, também irá pegar os extends dos Plugins jQuery
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
		arquivo: 'jquery.plugins.linha-' + VERSION + '.js',
		arquivoMin: 'jquery.plugins.linha-' + VERSION + '.min.js'
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
	
	/**
	 * Checa por erros no JS
	 * Se passar não para a execução do script :)
	 * @param [string] src
	 */
	lint: function(src){
		
		if(!OPTIONS.lint) return this;
		
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
	 * Cria a versão de desenvolvimento do Linha JS + Plugins Linha
	 */
	linhaDev: function(){
	
		var data = '', 
			plugins = '';
			
		console.log();
		console.log('--- Criando código fonte para Linha JS');
		
		/**
		 * Processa cada arquivo do CORE
		 * É feito na mão, porque há uma ordem nos elementos que se for feito automaticamente sai errado
		 */
		['core.js', 'string.js', 'object.js', 'array.js', 'dom.js', 'css.js', 'events.js'].forEach(function(file){
		
			data += FS.readFileSync(linha.dir + file, 'UTF-8') + '\n\n';
		
		});
		
		console.log('--- Os plugins estaram ' + ((!OPTIONS.separado)? 'JUNTOS' : 'SEPARADOS') + ' do Linha JS');
		
		/**
		 * Lê a pasta dos Plugins Linha
		 * Processa cada arquivo
		 * Se não for separado, adiciona o conteúdo do arquivo à data
		 * Se for, adiciona à datap
		 */
		FS.readdirSync(pluginsLinha.dir).forEach(function(file){
			
			var content = FS.readFileSync(pluginsLinha.dir + file, 'UTF-8') + '\n\n';
			
			if(!OPTIONS.separado)
				data += content;
			else
				plugins += content;
				
		});
		
		/**
		 * Escreve no arquivo
		 */	
		if(!plugins){
			
			this.lint(data + plugins);
			
			FS.writeFileSync(BUILD_DIR + linha.arquivo, data + plugins);
	
			console.log('--- Arquivo criado: ' + BUILD_DIR + linha.arquivo);
			
		}else{
		
			this.lint(data);
			FS.writeFileSync(BUILD_DIR + linha.arquivo, data);
						
			this.lint(plugins);
			FS.writeFileSync(BUILD_DIR + pluginsLinha.arquivo, plugins);
			
			console.log('--- Arquivos criados/atualizados: ');
			console.log('--- --- ' + BUILD_DIR + linha.arquivo);
			console.log('--- --- ' + BUILD_DIR + pluginsLinha.arquivo);
			
		}
		
	return this;
	},
	
	/**
 	 * Cria a versão minifield do Linha JS + Plugins Linha
 	 */
	linhaMin: function(){
	
		var data, plugins;
		
		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo){
			try{ FS.unlinkSync(BUILD_DIR + linha.arquivo); } catch(e){}
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
		 * Tenta pegar o conteúdo dos Plugins Linha
		 */
		try{				
			plugins = FS.readFileSync(BUILD_DIR + pluginsLinha.arquivo, 'UTF-8');
		}catch(e){}
		
		/**
		 * CRIA MINIFIELD
		 */
		console.log();
		console.log('--- Criando versão minifield do Linha JS' + (plugins? ' + versão minifield Linha JS Plugins' : ''));
		
		//Core
		FS.writeFileSync(
			MIN_DIR + linha.arquivoMin,
			this.minifield(data));
		
		//Plugins
		if(plugins){
		
			FS.writeFileSync(
			MIN_DIR + pluginsLinha.arquivoMin,
			this.minifield(plugins));
			
		}
		
		console.log('--- Minifield criado com sucesso! Arquivos criados/atualizados:');
		console.log('--- --- ' + MIN_DIR + linha.arquivoMin);
		if(plugins) console.log('--- --- ' + MIN_DIR + pluginsLinha.arquivoMin);
	
	return this;
	},
	
	/**
 	 * Cria a versão de desenvolvimento dos Plugins jQuery
 	 */
	jqueryDev: function(){
	
		var data = '';
	
		console.log();	
		console.log('--- Criando código fonte para os Plugins jQuery');
		
		/**
		 * Lê a pasta dos PLUGINS
		 * Processa cada arquivo
		 */
		FS.readdirSync(pluginsJquery.dir).forEach(function(file){	
			
			if(file.split('.').length > 2 && !OPTIONS.extend)
				return;
			
			data += FS.readFileSync(pluginsJquery.dir + file, 'UTF-8') + '\n\n';			
		});
		
		this.lint(data);
		
		/**
		 * Escreve no arquivo
		 */	
		FS.writeFileSync(BUILD_DIR + pluginsJquery.arquivo, data);
		console.log('--- Arquivo criado: ' + BUILD_DIR + pluginsJquery.arquivo);
	
	return this;
	},
	
	/**
	 * Cria a versão minifield dos Plugins jQuery
	 */
	jqueryMin: function(){
	
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
			
			if(!data) this.jqueryDev();
		
		}
		
		/**
		 * CRIA MINIFIELD
		 */
		console.log();
		console.log('--- Criando versão minifield dos Plugins jQuery');
		
		FS.writeFileSync(
			MIN_DIR + pluginsJquery.arquivoMin,
			this.minifield(data));
		
		console.log('--- Minifield criado com sucesso! Arquivo criado/atualizado:');
		console.log('--- --- ' + MIN_DIR + pluginsJquery.arquivoMin);
		
	return this;
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
	if(linha) (dev)? Build.linhaDev() : Build.linhaMin();
	if(jquery) (dev)? Build.jqueryDev() : Build.jqueryMin();

})();
	
/**
 * Método padrão, sem argumentos
 */
}else{
	
	Build
	.linhaMin()
	.jqueryMin();
	
}

console.log();