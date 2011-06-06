#!/usr/bin/env node

/**
 * Build para CSS e JS
 * Use Tuild para rodar este script - https://github.com/mateus007/tuild
 */
var Tuild = require('tuild').Tuild,
	// Estende os plugins com os extends?
	EXTEND = false; 
	// Ativa o modo watch?
	watch = false;

/**
 * Forma apenas a versão minifield que vai no arquivo plugins.js...
 * Se quiser a versão dev altere "-min" para "-dev"
 */
Tuild.command(
'js ' + ( (watch) ? '--watch ': '' ) + '-min --no-hint ' + 
	'../src/acord.js+' + 
	( EXTEND ? '../src/acord.slide.js+' : '' ) + 
	'../src/focuss.js+' + 
	'../src/modal.js+' +
	'../src/nav.js+' + 
	'../src/slidetabs.js+' + 
	'../src/tooltip.js+' +  
	'../src/valida.js' + 
' > ' + 
	'../../html/js/plugins.js'
);