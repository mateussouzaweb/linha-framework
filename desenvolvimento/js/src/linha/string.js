String.implement({
	
	/**
	 * Transforma a string atual em uma url válida, com - (hyphenate)
	 */
	hyphenate: function(){
		return this.toLowerCase().replace(/\s+/g, '-');
	},
	
	/**
	 * Testa se a string passa no regex
	 * @param [string|regex] pattern
	 * @param optional [string] flags
	 */
	test: function(pattern, flags){
		return ( L.is('regex', pattern) )? pattern : new RegExp(pattern, flags).test(this);
	},
	
	/**
	 * Transforma a string atual em uma array
	 */
	toArray: function(){
		return this.split('');
	},
	
	/**
	 * Remove espaços do começo e final da string
	 */
	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	}
	
});