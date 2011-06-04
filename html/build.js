#!/usr/bin/env node

/**
 * Build para CSS e JS
 * Use Tuild para rodar este script - https://github.com/mateus007/tuild
 */
var Tuild = require('tuild').Tuild,
	watch = false;

//CSS
Tuild.command(
'css ' + ( (watch) ? '--watch ': '' ) + 
	'css/all.css+' +
	'css/screen.css+' +
	'css/print.css' + 
' > ' + 
	'css/estilos.min.css'
);

//JS
Tuild.command(
'js ' + ( (watch) ? '--watch ': '' ) + 
	'js/plugins.js+' + 
	'js/eventos.js' + 
' > ' + 
	'js/plugins.eventos.min.js'
);