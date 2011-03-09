Object.extend({
	
	/**
	 * Cria um novo objeto limpo, sem valores null ou undefined 
	 * @param [object] object
	 * @param optional [mixed] _this
	 */
	clean: function(object, _this){
		return this.filter(object, function(value){
			return value != null;
		}, _this);
	},
				
	/**
	 * Método espelho para forEach
	 * @param [object] object
	 * @param [function] fn
	 * @param optional [mixed] _this
	 */
	each: function(object, fn, _this){
		return this.forEach(object, fn, _this);
	},
		
	/**
	 * Testa se todos os elementos passam em uma determinada função
	 * @param [object] object
	 * @param [function] fn
	 * @param optional [mixed] _this
	 */
	every: function(object, fn, _this){

		for (var key in object){
			if (object.hasOwnProperty(key) && !fn.call(_this, object[key], key, object)) return false;
		}
		
		return true;
	},
		
	/**
	 * Cria um novo objeto com todos os elementos que passaram no teste da função executada
	 * @param [object] object
	 * @param [function] fn
	 * @param optional [mixed] _this
	 */
	filter: function(object, fn, _this){
	
		var results = {};
		
		this.each(object, function(value, key, obj){
			if( fn.call(_this, value, key, obj) ) results[key] = value;
		}, _this);
		
		return results;
	},
	
	/**
	 * Executa uma função em cada item do objeto
	 * @param [object] object
	 * @param [function] fn
	 * @param optional [mixed] _this
	 */
	forEach: function(object, fn, _this){
	
		// Processa cada item
		for(var key in object){
			
			if(object.hasOwnProperty(key))
				if( fn.call(_this, object[key], key, object ) === false ) break;
		}

		return object;	
	},
	
	/**
	 * Retorna a chave índice que contenha o item do objeto
	 * @param [object] object
	 * @param [value] item
	 */
	keyOf: function(object, value){
		
		for (var key in object){
			if (object.hasOwnProperty(key) && object[key] === value) return key;
		}
		return null;
	},
	
	/**
	 * Cria uma arrays com as chaves do objeto - JS 1.8.5
	 * @param [object] object 
	 */
	keys: function(object){

		var keys = [];
		
		for(var key in object){
			if(object.hasOwnProperty(key)) keys.push(key);
		}
				
		return keys;
	},
	
	/**
	 * Cria um novo objeto com os resultados da função executada em cada item do objeto atual
	 * @param [object] object
	 * @param [function] fn
	 * @param optional [mixed] _this
	 */
	map: function(object, fn, _this){
	
		var results = {};
	
		this.each(object, function(value, key, obj){
			results[key] = fn.call(_this, value, key, obj);
		}, _this);
	
		return results;
	},
	
	/**
	 * Método espelho para Linha.extend
	 * @param [object] object
	 * @param [object] merge
	 */
	merge: function(object, merge){
		return L.extend(object, merge);
	},
	
	/**
	 * Remove um determinado item do objeto, se existir
	 * @param [object] object
	 * @param [mixed] item
	 */
	remove: function(object, item){
		
		if(object[item]) delete object[item];
		
		return this;
	},
	
	/**
	 * Retorna o tamanho do objeto
	 * @param [object] object
	 */
	size: function(object){
		return this.keys(object).length;
	},
			
	/**
	 * Método espelho para values
	 * @param [object] object
	 */
	toArray: function(object){
		return this.values(object);
	},
	
	/**
	 * Cria uma nova array, com os valores das chaves do objeto
	 * @param [object] object
	 */
	values: function(object){
		
		var values = [];
		
		for(var key in object){
			if(object.hasOwnProperty(key)) values.push(object[key]);
		}
				
		return values;
	}
	
});