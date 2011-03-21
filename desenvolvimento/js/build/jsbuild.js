/**
 * JS Build - JS builder for Node JS
 *
 * Require Node JS, NPM, JSHINT & UGLIFY-JS
 * https://gist.github.com/866799
 */

// Global Itens
var FS = require('fs'),
JSHINT = require('jshint').JSHINT,
UGLIFYJS = require('uglify-js'),

PARSER = UGLIFYJS.parser,
PROCESS = UGLIFYJS.uglify,

/**
 * Mensagem que não devem ser exibidas, devido ao estilo do JS
 */
JSHintOK = {
	"Expected an identifier and instead saw 'undefined' (a reserved word).": true,
	"Use '===' to compare with 'null'.": true,
	"Use '!==' to compare with 'null'.": true,
	"Expected an assignment or function call and instead saw an expression.": true,
	"Expected a 'break' statement before 'case'.": true
},

//JS Build
JSBUILD = {
	
	parser: true,
	
	/**
	 * Check for erros in JS code
	 * @param [string] src
	 */
	hint: function(src){
		
		console.log('### Checking the code with JSHint.')
		
		try{
			
			JSHINT(src, { evil: true, forin: true, undef: true, browser: true });
			
			/**
			 * If errors, but not fail
			 */
			if(JSHINT.errors){
				
				var i = 0;
				
				JSHINT.errors.forEach(function(erro){
					
					if(!JSHintOK[erro.reason]){
						i++;
						console.log(erro.id + " line " + erro.line + ": " + erro.reason + '\n' + erro.evidence + '\n');
	  				}
	  				
	  			});
				
				/**
				 * The return
				 */
				if(i)
	  				console.log('### ' + i + ' Error(s) found.');
	  			else
	  				console.log('### JSHint found no errors. Congratulations!');	  			
	  		}
	  		
	  	/**
	  	 * Fail
	  	 */		
		} catch(e){
			console.log("### JSHint FAIL: " + e.message);
			process.exit(1);
		}
			
	return src;
	},
	
	/**
	 * Minifield the code
	 * Comments that begin with / *! will be preserved - like YUI compressor
	 * @param [string] src
	 */
	minifield: function(src){
	
		var regex = /(\/\*\![\s\S]*?\*\/)/gm,
			comments = src.match(regex),
			src = src.replace(regex, '__COMMENT__'),
			first;
		
		/**
		 * Check if file start with comment
		 * Because Uglify JS change the order of scripts (this maybe have bugs)
		 */
		if(src.indexOf('__COMMENT__') === 0)
			first = true;
			
		/**
		 * UGLIFY JS
		 */	
		src = PARSER.parse(src);
		src = PROCESS.ast_mangle(src);
		src = PROCESS.ast_squeeze(src);
		src = PROCESS.gen_code(src);
		
		/**
		 * Replace the comments
		 */
		if(comments){
	
			comments.forEach(function(value, i){
				
				/**
				 * IF is first comment
				 */
				if(i == 0 && first){
					src = value.replace('/*!', '/**') + '\n' + src.replace(/(__COMMENT__)/, '');
				
				}else{
					src = src.replace(
						/(__COMMENT__)/, '\n\n' + value.replace('/*!', '/**') + '\n'
					);
				}
			});
	
		}
	
	return src;
	},
	
	/**
	 * Create the development version of code
	 * @param [string] name
	 * @param [string - array] src
	 * @param [string] dest
	 */
	dev: function(name, src, dest){
		
		var code = '',
			itens = [];
		
		console.log('### Creating source code for ' + name + '.');
		
		/**
		 * Force array
		 */
		(src.constructor !== Array)? itens.push(src) : itens = src;
			
		/**
		 * Reads the contents on each file and add a newline between each file on #code
		 */
		itens.forEach(function(file, i){
			code += FS.readFileSync(file, 'UTF-8') + ((i + 1) !== itens.length ? '\n\n' : '');
		});
		
		/**
		 * Test the code with JSHINT
		 */
		if(this.parser)
			this.hint(code);

		/**
		 * Write the file
		 */
		FS.writeFileSync(dest, code);
		console.log('### Source code created successfully! [' + dest + ']');
			
	return code;
	},
	
	/**
	 * Create the minifield version of code
	 * @param [string] name
	 * @param [string - array] src
	 * @param [string] dest
	 */
	min: function(name, src, dest){
		
		var code = '',
			itens = [];
		
		console.log('### Creating minifield for ' + name + '.');
		
		/**
		 * Force array
		 */
		(src.constructor !== Array)? itens.push(src) : itens = src;

		/**
		 * Reads the contents on each file and add a newline between each file on #code
		 */
		itens.forEach(function(file, i){
			
			/**
		 	 * Try read the file
		 	 */
			try{
				code += FS.readFileSync(file, 'UTF-8') + ((i + 1) !== itens.length ? '\n\n' : '');
		
			}catch(e){
				console.log('### Error reading file [' + file + ']: ' + e.message);
				process.exit(1);
			}

		});
		
		code = this.minifield(code);
		
		/**
		 * Create the minifield
		 */
		FS.writeFileSync( dest, code );
		
		console.log('### Minifield created successfully! [' + dest + ']');
		
	return code;	
	}

}

// Make JSBUILD a Node module
if (typeof exports == 'object' && exports)
    exports.JSBUILD = JSBUILD;