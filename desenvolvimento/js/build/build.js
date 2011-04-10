#!/usr/bin/env node

/**
 * Build para JSs
 * Requer Node JS e Tuild
 */
var	VERSION = '1.3.1',

	DEV_DIR = '../../arquivos/',
	MIN_DIR = '../../../html/js/',
	
	SEPARADO = false, //Se true, irá separar o Linha JS dos Plugins Linha, na versão minifield (NÂO SE APLICA A VERSÂO DEV)
	EXTEND = false, //Se true, também irá pegar os extends dos Plugins jQuery - Ex. acord.extend.js
	
	// Linha JS
	linha = {
		dir: '../src/linha/',
		arquivoDev : 'linha-' + VERSION + '.js',
		arquivoMin: 'linha-' + VERSION + '.min.js'
	},
	
	// Plugins Linha
	pluginsLinha = {
		dir: '../src/plugins/linha/',
		arquivoDev: 'linha.plugins.js',
		arquivoMin: 'linha.plugins.min.js'
	},
	
	// Plugins jQuery
	pluginsJquery = {
		dir: '../src/plugins/jquery/',
		arquivoDev: 'jquery.plugins.linha.js',
		arquivoMin: 'jquery.plugins.linha.min.js'
	};

var Tuild = require('tuild');

Tuild.JS.addHintOk("'L' is not defined.");

Tuild = Tuild.Tuild;
//Tuild.__quiet = true;

//JS - Linha DEV
Tuild.log('\nConstruindo Linha - DEV');

Tuild.command(
'js -dev ' + 
	linha.dir + 'core.js+' +  
	linha.dir + 'string.js+' + 
	linha.dir + 'object.js+' +
	linha.dir + 'array.js+' + 
	linha.dir + 'dom.js+' + 
	linha.dir + 'css.js+' + 
	linha.dir + 'events.js ' + 
'> ' + 
	DEV_DIR + linha.arquivoDev
);

// JS - Plugins Linha DEV
Tuild.log('\nConstruindo Plugins Linha - DEV');

Tuild.command(
'js -dev ' + 
	pluginsLinha.dir + 'browserSelector.js+' + 
	pluginsLinha.dir + 'load.js ' + 
'> ' + 
	DEV_DIR + pluginsLinha.arquivoDev
);

/**
 * Separa ou não o Linha JS dos plugins?
 * > SIM
 * > NÃO
 */
if(SEPARADO){
	
	//JS - Linha MIN
	Tuild.log('\nConstruindo & Comprimindo Linha - MIN');

	Tuild.command(
	'js -min ' + 
		linha.dir + 'core.js+' +  
		linha.dir + 'string.js+' + 
		linha.dir + 'object.js+' +
		linha.dir + 'array.js+' + 
		linha.dir + 'dom.js+' + 
		linha.dir + 'css.js+' + 
		linha.dir + 'events.js ' + 
	'> ' + 
		MIN_DIR + linha.arquivoMin
	);

	// JS - Plugins Linha MIN
	Tuild.log('\nConstruindo & Comprimindo Plugins Linha - MIN');

	Tuild.command(
	'js -min ' + 
		pluginsLinha.dir + 'browserSelector.js+' + 
		pluginsLinha.dir + 'load.js ' + 
	'> ' + 
		MIN_DIR + pluginsLinha.arquivoMin
	);
	
}else{
	
	//JS - Linha * Plugins MIN
	Tuild.log('\nConstruindo & Comprimindo Linha + Plugins Linha - MIN');
	
	Tuild.command(
	'js -min ' + 
		linha.dir + 'core.js+' +  
		linha.dir + 'string.js+' + 
		linha.dir + 'object.js+' +
		linha.dir + 'array.js+' + 
		linha.dir + 'dom.js+' + 
		linha.dir + 'css.js+' + 
		linha.dir + 'events.js+' +
		pluginsLinha.dir + 'browserSelector.js+' + 
		pluginsLinha.dir + 'load.js ' + 
	'> ' + 
		MIN_DIR + linha.arquivoMin
	);
	
}

//JS - Plugins jQuery DEV
Tuild.log('\nConstruindo Plugins jQuery - DEV');

Tuild.command(
'js -dev --no-hint ' + 
	pluginsJquery.dir + 'acord.js+' +  
	( EXTEND ? pluginsJquery.dir + 'acord.slide.js+' : '' ) + 
	pluginsJquery.dir + 'focuss.js+' +
	pluginsJquery.dir + 'modal.js+' + 
	pluginsJquery.dir + 'nav.js+' + 
	pluginsJquery.dir + 'slidetabs.js+' +
	pluginsJquery.dir + 'tooltip.js+' + 
	pluginsJquery.dir + 'valida.js ' + 
'> ' + 
	DEV_DIR + pluginsJquery.arquivoDev
);

//JS - Plugins jQuery MIN
Tuild.log('\nConstruindo & Comprimindo Plugins jQuery - MIN');

Tuild.command(
'js -min ' + 
	pluginsJquery.dir + 'acord.js+' +  
	( EXTEND ? pluginsJquery.dir + 'acord.slide.js+' : '' ) + 
	pluginsJquery.dir + 'focuss.js+' +
	pluginsJquery.dir + 'modal.js+' + 
	pluginsJquery.dir + 'nav.js+' + 
	pluginsJquery.dir + 'slidetabs.js+' +
	pluginsJquery.dir + 'tooltip.js+' + 
	pluginsJquery.dir + 'valida.js ' + 
'> ' + 
	MIN_DIR + pluginsJquery.arquivoMin
);

Tuild.log('');
