#!/usr/bin/env node

/**
 * Build para CSS e JS
 * Use Tuild para rodar este script - https://github.com/mateus007/tuild
 */
var Tuild = require('tuild').Tuild,
	watch = false;

//CSS
Tuild.command(
'css -min ' + ( (watch) ? '--watch ': '' ) + 
	'../css/all.css+' +
	'../css/screen.css+' +
	'../css/print.css' + 
' > ' + 
	'../css/estilos.min.css'
);

//JS
Tuild.command(
'js -min ' + ( (watch) ? '--watch ': '' ) + 
	'../js/plugins.js+' + 
	'../js/eventos.js' + 
' > ' + 
	'../js/plugins.eventos.min.js'
);

/**
 * Depois de ter rodado este script
 * Abra o seu(s) arquivo(s) html e altere as referências para o CSS e JS
 * 
 * CSS: remova todos os css ("all.css", "screen.css" e "print.css") e insira o css único "estilos.min.css"
 *
 * JS: remova os scripts "plugin.js" e "eventos.js" e insira o script "plugins.eventos.min.js"
 * Também altere a versão do jquery ("jquery.js") para a versão minifield ("jquery.min.js"), que já está na pasta js/
 *
 * Se necessário otimize as imagens usando o http://www.smushit.com/ysmush.it/
 *
 * E para finalizar renomeio o arquivo "exemplo.htaccess" para somente ".htaccess", para que a otimização de cache e compressão seja ativa - Somente Apache
 */