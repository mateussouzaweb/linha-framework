/*!
 * Linha JS 1.3.1
 * http://www.linhaframework.com
 *
 * Copyright 2011
 * By Mateus Souza - http://www.mateussouza.com
 * Licensed under MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
 */
function L(selector, context){

	//Força o this
	if(!L.prototype.init.prototype.init)
		L.prototype.init.prototype = L.prototype;
	
	return new L.prototype.init(selector, context);
}

/**
 * Estende um objeto
 * @param [object] extend
 */
Function.prototype.extend = function(extend){
	for(var item in extend) this[item] = extend[item];
};

/**
 * Implementa protótipos a um objeto
 * @param [object] implement
 * @param [boolean] overlay
 */
Function.prototype.implement = function(implement, overlay){
	
	for(var item in implement){
		if(!this.prototype[item] || overlay) this.prototype[item] = implement[item];
	}
	
};

/**
 * Grava alguns métodos do CORE JS
 */
var toString = Object.prototype.toString,
	slice = Array.prototype.slice;

/**
 * Funções Core
 */
L.extend({
	
	isReady: false,
	
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
		
		var ret = toString.call(item);
		
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
				return ret == '[object String]';
				
			//Number
			case 'number':
				return ret == '[object Number]';
			
			//Date
			case 'date':
				return item.setDate !== undefined;
			
			//Boolean
			case 'boolean':
				return ret == '[object Boolean]';
				
			//Regex
			case 'regex':
				 return item.test !== undefined && item.exec !== undefined;
			
			//Null
			case 'null':
				return item === null;
				
			//Undefined
			case 'undefined':
				return item === undefined;
			
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
		
		var args = slice.call(arguments, 2);
		
		/**
		 * Define o timeout
		 */
		window.setTimeout(function(){
			return fn.apply(fn, args);
		}, tempo);
		
		return this;
	},
	
	/**
	 * Checa se o DOM está carregado
	 */
	domReady: function(){
		
		/**
		 * Checa se já está pronto o DOM
		 */
		if(document.readyState === 'complete')
			return L.ready();
		
		/**
		 * Mozilla, Opera e Webkit
		 */
		if(document.addEventListener){
		
			//document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
			window.addEventListener('load', L.ready, false);
		
		/**
		 * IE
		 */
		}else if(document.attachEvent){
		
			//document.attachEvent('onreadystatechange', DOMContentLoaded);
			window.attachEvent('onload', L.ready);
		
			/**
			 * Testa o Scroll, porque o IE só "quebra as perna"
			 * Para iframes?
			 */
			var head = document.documentElement,
			toplevel = false;
		
			try{ toplevel = window.frameElement == null; } catch(e){}
		
			if(head.doScroll && toplevel){
			
				(function(){
				
					try{
						head.doScroll('left');
						
					} catch(e){
						setTimeout( arguments.callee, 1 );
						return;
					}
				
				L.ready();
				
				})();
			
			}
		}
	
	},
	
	/**
	 * Ready \o/
	 * Executa uma função assim que o DOM for totalmente carregado
	 * @param [function] fn
	 */
	ready: function(fn){
		
		if(this.isReady){
			if(fn && L.is('function', fn)) fn.call(this, this);
			return this;
		}
		
		/**
		 * Garante que existe o body
		 */
		if(!document.body){
			return setTimeout(function(){ L.ready(fn); }, 1);
		}
		
		this.isReady = true;
		
		return setTimeout(function(){
			L.ready(fn);
		}, 1);
	}
	
});

L.domReady();