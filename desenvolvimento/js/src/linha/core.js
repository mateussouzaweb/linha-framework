/**
 * Linha Framework 1.3
 * @param [string] selector
 * @param [object] context
 */
window.L = function(selector, context){

	//Força o this
	if(!L.prototype.init.prototype.init)
		L.prototype.init.prototype = L.prototype;
	
	return new L.prototype.init(selector, context);
};

/**
 * Estende um objeto
 * @param [object] extend
 */
Function.prototype.extend = function(extend){
	for(var item in extend) this[item] = extend[item];
}

/**
 * Implementa protótipos a um objeto
 * @param [object] implement
 * @param [boolean] overlay
 */
Function.prototype.implement = function(implement, overlay){
	
	for(var item in implement){
		if(!this.prototype[item] || overlay) this.prototype[item] = implement[item];
	}
}

/**
 * Funções Core
 */
L.extend({
	
	slice: [].slice,
	toString: {}.toString,
 			
	/**
	 * Faz o extend simples de um objeto
	 * @param [object] object
	 * @param [object] extend
	 */
	extend: function(object, extend){
		
		if(!extend){
			extend = object;
			object = this;
		}
		
		for(var item in extend)
			object[item] = extend[item];
		
		return object;
	},
		
	/**
	 * Retorna se o item é do tipo type
	 * TIPOS: empty, element, node, array, object, function, string, number, date, boolean, regex, null, undefined
	 * @param [string] type
	 * @param [mixed] item
	 */
	is: function(type, item){

		var ret = this.toString.call(item);

		switch(type.toLowerCase()){
				
			//Empty
			case 'empty':
				return !item || !item.length;
			
			//Element | Node
			case 'element': case 'node':
				return item && item.nodeType == 1;
				
			//Array
			case 'array':
				return ret === '[object Array]';
			
			//Object
			case 'object':
				return ret === '[object Object]';
			
			//Function
			case 'function':
				return item.call !== undefined && item.apply !== undefined;

			//String
			case 'string':				
				return ret == 'string';
				
			//Number
			case 'number':
				return ret == 'number';

			//Date
			case 'date':
				return item.setDate !== undefined;	

			//Boolean
			case 'boolean':
				return ret == 'boolean';
				
			//Regex
			case 'regex':
				 return item.test !== undefined && item.exec !== undefined;

			//Null
			case 'null':
				return item === null;
				
			//Undefined
			case 'undefined':
				return item === void 0;
		
			//Padrão
			default:
				return (typeof item === type || item == type);
		}
		
        return false;
    },
	
	/**
	 * Executa uma função depois de um certo tempo/delay
	 * @param [function] fn
	 * @param [number] tempo
	 * @arguments *
	 */
	delay: function(fn, tempo /*, arguments*/){
		
		var args = this.slice.call(arguments, 2);
		
		/**
		 * Define o timeout
		 */
		window.setTimeout(function(){
			return fn.apply(fn, args);
		fn}, tempo);
		 
		return this;
	}
	
});