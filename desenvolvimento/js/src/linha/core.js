/**
 * Linha Framework 1.3
 */
window.Linha = {
			   			
	/**
	 * Faz o extend simples da biblioteca
	 * @param object obj
	 */
	extend: function(obj){
	
		for(var item in obj){
			this[item] = obj[item];
		}
		
		return this;
	},
	
	/**
	 * Retorna se o #item é do tipo #type
	 * @param mixed item
	 * @param string type
	 */
	is: function(item, type){
        return typeof obj === type;
    },
	
	/**
	 * Processa cada item de um array com uma função
	 * Loop foreach para os mais nerds
	 * @param object array
	 * @param function fn
	 */
	each: function(array, fn){
		
		/**
		 * Força array
		 */
		if(!array[0]) array = new Array(array);
		
		for( var i = 0; i < array.length; i++ ){
			if( fn.apply(array[i], new Array(i) ) === false ) break;
		}
		
		return this;
	},
	
	/**
	 * Faz o trim em uma string
	 * @param string string
	 */
	trim: function(string){
		return string.replace(/^\s+|\s+$/g, '');
	}
	
};