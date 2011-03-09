String.implement({
	
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
	 * Transforma a string atual em uma url válida, com - (hyphenate)
	 */
	toUri: function(){
		return this.trim().toLowerCase().replace(/\s+/g, '-');
	},
	
	/**
	 * Remove espaços do começo e final da string
	 */
	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	}
	
});