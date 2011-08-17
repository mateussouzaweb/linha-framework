#!/usr/bin/env node

/**
 * Build para Jquery
 * Use Tuild para rodar este script - https://github.com/mateus007/tuild
 */
var Tuild = require('tuild').Tuild,
	// Estende os plugins com os extends?
	EXTEND = false; 
	// Ativa o modo watch?
	watch = false;

/**
 * Versão DEV
 */
Tuild.command(
'js -dev --no-hint ' + ( (watch) ? '--watch ': '' ) + 
	'../src/acord.js+' + 
	( EXTEND ? '../src/acord.slide.js+' : '' ) + 
	'../src/focuss.js+' + 
	'../src/modal.js+' +
	'../src/nav.js+' + 
	'../src/slidetabs.js+' + 
	'../src/tooltip.js+' +  
	'../src/valida.js' + 
' > ' + 
	'../dist/jquery.linha.plugins.js'
);

/**
 * Versão MIN - adicionar manualmente no arquivo plugins.js
 */
Tuild.command(
'js -min --no-hint ' + ( (watch) ? '--watch ': '' ) + 
	'../dist/jquery.linha.plugins.js' + 
' > ' + 
	'../dist/jquery.linha.plugins.min.js'
);