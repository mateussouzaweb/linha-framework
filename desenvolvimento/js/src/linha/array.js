Array.extend({
	
	/**
	 * Método espelho para Array.forEach - JS 1.6
	 * @param [array] array
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	each: function(array, fn, _this){
		Array.forEach(array, fn, _this);
		return array;
	},
	
	/**
	 * Executa uma função em cada item da array - JS 1.6
	 * @param [array] array
	 * @param [function] fn
	 * @param optional [object] _this
	 */	
	forEach: function(array, fn, _this){
		var i = 0,
			l = array.length;
		
		// Processa cada item	
		for( ; i < l; i++ ){
			if( fn.call(_this, array[i], i, array ) === false ) break;
		}

	}
	
});

Array.implement({
	
	/**
	 * Cria uma nova array limpa, sem valores null ou undefined 
	 */
	clean: function(){
		return this.filter(function(value){
			return value != null;
		});
	},
	
	/**
	 * Método espelho para forEach - JS 1.6
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	each: function(fn, _this){
		this.forEach(fn, _this);
		return this;
	},
	
	/**
	 * Testa se todos os elementos passam em uma determinada função - JS 1.6
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	every: function(fn, _this){
		
		this.each(function(value, i, array){
			if(!fn.call(_this, value, i, array)) return false;
		}, _this);
		
		return true;
	},
	
	/**
	 * Cria uma nova array com todos os elementos que passaram no teste da função executada - JS 1.6
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	filter: function(fn, _this){
	
		var results = [];
		
		this.each(function(value, i, array){
			if(fn.call(_this, value, i, array)) results.push( value );
		}, _this);
		
		return results;
	},
	
	/**
	 * Executa uma função em cada item da array - JS 1.6
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	forEach: function(fn, _this){
		return Array.forEach(this, fn, _this);	
	},
	
	/**
	 * Retorna o primeiro índice que contenha o item na array - JS 1.6
	 * @param [mixed] item
	 * @param optional [number] index
	 */
	indexOf: function(item, index){
		
		var len = this.length;
		
		for (var i = (index < 0) ? Math.max(0, len + index) : index || 0; i < len; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},
	
	/**
	 * Cria uma nova array com os resultados da função executada em cada item da array atual - JS 1.6
	 * @param [function] fn
	 * @param optional [object] _this
	 */
	map: function(fn, _this){
	
		var results = [];
	
		this.each(function(value, i, array){
			results.push( fn.call(_this, value, i, array) );
		}, _this);
	
		return results;
	},

	/**
	 * Remove um determinado item da array, se existir
	 * @param [mixed] item
	 */
	remove: function(item){
		
		var i = this.indexOf(item);
		if(i != -1) this.splice(i, 1);
		
		return this;
	},
	
	/**
	 * Retorna o tamanho da array atual
	 */
	size: function(){
		return this.length;
	}
		
});