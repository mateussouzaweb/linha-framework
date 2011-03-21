#!/usr/bin/env node

/**
 * Build/Compilador para todos os itens JS do Linha Framework
 * Requer NodeJS
 *
 * Ao executar o comando "node makefile.js" você pode passar alguns parâmentros:
 *     dev - cancela a criação da versão minifield, e faz apenas a versão dev (aqui define se é pra fazer minifield ou não)
 *     linha - cancela jquery, e executa apenas linha
 *     jquery - cancela linha e executa apenas jquery
 *
 * Ex: "node makefile.js dev linha" //Cria apenas a versão de desenvolvimento do linha
 * Outro Ex: "node makefile.js jquery dev" //Cria apenas a versão de desenvolvimento do jquery
 * Outro Ex: "node makefile.js dev" //Cria apenas a versão de desenvolvimento de todos os JS's
 *
 * Libraries usadas: NodeJS, Node JSBuild, Node Uglify JS & Node JSHint (Comunity Edition)
 */
var VERSION = '1.3',

	BUILD_DIR = '../../arquivos/',
	MIN_DIR = '../../../html/js/',
	
	// Opções
	OPTIONS = {	
		novo: true, //Se true, sempre irá refazer a versão dev, antes do minifield
		separado: false, //Se true, irá separar o Linha JS dos Plugins Linha, na versão minifield (NÂO SE APLICA A VERSÂO DEV)
		extend: false //Se true, também irá pegar os extends dos Plugins jQuery - Ex. acord.extend.js
	},
	
	// Linha JS
	linha = {
		dir: '../src/linha/',
		arquivo : 'linha-' + VERSION + '.js',
		arquivoMin: 'linha-' + VERSION + '.min.js'
	},
	
	// Plugins Linha
	pluginsLinha = {
		dir: '../src/plugins/linha/',
		arquivo: 'linha.plugins.js',
		arquivoMin: 'linha.plugins.min.js'
	},
	
	// Plugins jQuery
	pluginsJquery = {
		dir: '../src/plugins/jquery/',
		arquivo: 'jquery.plugins.linha.js',
		arquivoMin: 'jquery.plugins.linha.min.js'
	};

/**
 * BUILD
 */
var JSBUILD = require('./jsbuild').JSBUILD,
	FS = require('fs'),

Makefile = {

	criadoLinhaMin: false,
				
	/**
	 * Cria a versão de desenvolvimento do Linha JS
	 */
	linhaDev: function(){
	
		var arquivos = [];
		
		/**
		 * Cria a lista de arquivos do CORE
		 * É feito na mão, porque há uma ordem nos elementos que se for feito automaticamente sai errado
		 */
		['core.js', 'string.js', 'object.js', 'array.js', 'dom.js', 'css.js', 'events.js'].forEach(function(file){
			arquivos.push( linha.dir + file );
		});
		
		JSBUILD.dev('Linha JS', arquivos, BUILD_DIR + linha.arquivo);
	
	return this;
	},
	
	/**
 	 * Cria a versão minifield do Linha JS
 	 */
	linhaMin: function(){

		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo){
			try{ 
				this.linhaDev();
				
				if(!OPTIONS.separado)
					this.pluginsLinhaDev();
								
			}catch(e){}
		}
		
		/**
		 * Forma a lista de arquivos
		 */
		var arquivos = [BUILD_DIR + linha.arquivo];
		
		if(!OPTIONS.separado){
		
			arquivos.push(BUILD_DIR + pluginsLinha.arquivo);
			console.log('### ATENÇÂO: Os plugins estaram JUNTOS do Linha JS no minifield.');
		
		}
		
		this.criadoLinhaMin = true;
		
		/**
		 * Cria Minifield
		 */
		var code = JSBUILD.min('Linha JS', arquivos, MIN_DIR + linha.arquivoMin);
		
		/**
		 * Fix para Uglify JS
		 * Isto causa erro em alguns browsers
		 */
		var code = code.replace(/(,Function)/g, ';Function');
		var code = code.replace(/(\n,L.extend)/g, 'L.extend');

		FS.writeFileSync( MIN_DIR + linha.arquivoMin, code );
		
	return this;
	},
	
	/**
	 * Cria a versão de desenvolvimento dos Plugins Linha
	 */
	pluginsLinhaDev: function(){
		
		var arquivos = [];

		/**
		 * Cria a lista de arquivis lendo a pasta dos Plugins Linha
		 */
		FS.readdirSync(pluginsLinha.dir).forEach(function(file){
			arquivos.push( pluginsLinha.dir + file );
		});
		
		JSBUILD.parser = false;
		JSBUILD.dev('Plugins Linha', arquivos, BUILD_DIR + pluginsLinha.arquivo);
	
	return this;
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
				console.log('### PLUGINS LINHA DEVEM ESTAR JUNTOS DO LINHA JS - Alternando para minifield Linha JS...')
				return this.linhaMin();
			}
			
			return this;
		}

		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo)
			this.pluginsLinhaDev();
				
		JSBUILD.min('Plugins Linha', BUILD_DIR + pluginsLinha.arquivo, MIN_DIR + pluginsLinha.arquivoMin);
				
	return this;
	},
	
	/**
 	 * Cria a versão de desenvolvimento dos Plugins jQuery
 	 */
	pluginsJqueryDev: function(){
			
		var arquivos = [];

		/**
		 * Cria a lista de arquivos lendo a pasta dos Plugins jQuery
		 * Também checa se é pra incluir os extends
		 */
		FS.readdirSync(pluginsJquery.dir).forEach(function(file){
			
			if(file.split('.').length > 2 && !OPTIONS.extend)
				return;
				
			arquivos.push( pluginsJquery.dir + file );
			
		});
		
		JSBUILD.parser = false;
		JSBUILD.dev('Plugins jQuery', arquivos, BUILD_DIR + pluginsJquery.arquivo);
	
	return this;
	},
	
	/**
	 * Cria a versão minifield dos Plugins jQuery
	 */
	pluginsJqueryMin: function(){
	
		/**
		 * Remove a versão de desenvolvimento? Para ficar com uma novinha...
		 */
		if(OPTIONS.novo)
			this.pluginsJqueryDev();

		JSBUILD.min('Plugins jQuery', BUILD_DIR + pluginsJquery.arquivo, MIN_DIR + pluginsJquery.arquivoMin);
		
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
	if(linha)
		(dev)? 
			Makefile.linhaDev().pluginsLinhaDev() : 
			Makefile.linhaMin().pluginsLinhaMin();
	
	if(jquery)
		(dev)? 
			Makefile.pluginsJqueryDev() : 
			Makefile.pluginsJqueryMin();

})();
	
/**
 * Método padrão, sem argumentos
 */
}else{
	
	Makefile
	.linhaMin()
	.pluginsLinhaMin()
	.pluginsJqueryMin();
	
}