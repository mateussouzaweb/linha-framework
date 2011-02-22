/**
* Linha v1.3
* http://www.linhaframework.com
*
* Copyright 2011
* By Mateus Souza - http://www.mateussouza.com
* Licensed under MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
*/
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
	
});String.implement({
	
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
	
});Object.extend({
	
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

		return this;	
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
	
});Array.extend({
	
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
		
});L.extend({
	
	/**
	 * Regex's
	 */
	r_xhtmlTag: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	
	/**
	 * Retorna o node name do elemento
	 * @param [object] elem
	 */
	nodeName: function(elem){
		return elem.nodeName.toLowerCase();
	}
	
});

/**
 * Protótipos
 */
L.implement({
	
	/**
	 * Valores padrão
	 */
	selector: '',
	context: document,
	length: 0,
	
	/**
	 * Faz com que o this seja uma array :P - roubei do jQuery 
	 */
	push: [].push,
	sort: [].sort,
	splice: [].splice,
	
	/**
	 * Seleciona os elementos de acordo com o selector
	 *  - #id
	 *  - .class
	 *  - div
	 * @param [string|object] selector
	 * @param [object] context
	 */
	init: function(selector, context){
	
		var dom = [];
		selector = selector || document;
		context = context && context.nodeType ? context : document;

		/**
		 * DOM :)
		 */
		if(selector.nodeType){
			dom[0] = selector;
			
		/**
		 * IDS
		 */
		}else if(selector.indexOf('#') == 0){
			dom[0] = context.getElementById( selector.replace('#', '') );

		/**
		 * Classes
		 */
		}else if(selector.indexOf('.') == 0){
			dom = context.getElementsByClassName(selector.replace('.', ''));
			
		/**
		 * TAGs
		 */	
		}else{
			dom = context.getElementsByTagName(selector);
		}
		
		if(!dom) return this;
		
		this.selector = selector;
		this.context = context;
		
		/**
		 * Puxa os elementos
		 */
		if(dom.length){
			
			for(var i = 0, l = dom.length; i < l; i++) this.push( dom[i] );
			this.length = dom.length;
			
		}else{
			
			this.push( dom[0] );
			this.length = 1;
		
		} 

		return this;
	},
	
	/**
	 * Processa cada elemento, semelhante a Array.each
	 * @param [function] fn
	 */
	each: function(fn){
		
		return Array.each(this, function(elem, index){
			fn.call(elem, index, elem);
		}, this);
	},
	
	/**
	 * Retorna o número de elementos selecionados
	 */
	size: function(){
		return this.length;
	},
	
	/**
	 * Retorna o elemento da posição eq
	 * @param [number] eq
	 */
	eq: function(eq){
		return L(this[eq]);
	},
    
    /**
     * Retorna o primeiro elemento
     */
    first: function(){
    	return L(this[0]);
    },
    
    /**
     * Retorna o último elemento
     */
    last: function(){
    	return L(this[this.length - 1]);
    },
	
	/**
	 * Recupera/Seta o HTML do elemento
	 * @param optional [string] value
	 */
	html: function(value){
		
		/**
		 * Seta o HTML
		 */
		if(typeof value === 'string'){
			
			value = value.toLowerCase().replace(L.r_xhtmlTag, '<$1></$2>');
			
			return this.each(function(){
				
				if(this.nodeType === 1){
					this.innerHTML = value;
				}
				
			});
				
		}
		
		return this[0] && this[0].nodeType === 1 ? this[0].innerHTML : null;
	},
	
	/**
	 * Recupera/Seta o texto ao elemento
	 * @param optional [string] text
	 */
	text: function(text){
		
		var all = document.all;
		
		/**
		 * Seta o texto
		 */
		if(typeof text === 'string'){
			
			return this.each(function(){
			
				if(all)
					this.innerText = text;
				else
					this.textContent = text;
				
			});

		}
		
		return (all)? this[0].innerText : this[0].textContent;
	},
	
	/**
	 * Recupera/Seta um atributo ao elemento
	 * @param [string] name
	 * @param optional [mixed] value
	 */
	attr: function(name, value){
		
		if(value != undefined){
			
			this.each(function(){
				this.setAttribute(name, value);
			});
			
		}
		
		return this[0].getAttribute(name);
	},
	
	/**
	 * Remove um atributo dos elementos
	 * @param [string] name
	 */	
	removeAttr: function(name){
		
		return this.each(function(){

			this[name] = '';
			
			if(this.nodeType === 1)
				this.removeAttribute(name);
        
        });
	
	},
	
	/**
	 * Recupera/Seta um atributo do tipo data-
	 * @param [string] name
	 * @param optional [mixed] value
	 */
	data: function(name, value){
		return this.attr('data-' + name, value);
	},
	
	/**
	 * Remove um atributo data- dos elementos
	 * @param [string] name
	 */	
	removeData: function(name){
		return this.removeAttr('data-' + name);
	},
	
	/**
	 * Recupera/Seta o valor do input atual. input: input|textarea|select|...
	 * @param optional [mixed] value
	 */
	val: function(value){
	
		/**
		 * Recupera os valores
		 */
		if(value == undefined){
			
			if(!this.length) return undefined;
			
			var elem = this[0],
				nodeName = L.nodeName(elem);
			
			/**
			 * Se for select
			 */
			if(nodeName == 'select'){
				
				var index = elem.selectedIndex,
                    values = [],
                    options = elem.options,
                    one = elem.type == 'select-one';
				
				/**
				 * Valor único
				 */
				if(one){
					return index >= 0 ? 
						
						options[index].hasAttribute('value') ? 
							options[index].value : 
							options[index].text : 
						
						null;
				}
				
				/**
				 * Junta os valores
				 */
				Array.each(options, function(option){
					
					if(option.selected)
						values.push( option.hasAttribute('value') ? option.value : option.text );
				});
				
				return values;
			}
			
			/**
			 * Demais itens
			 */
			return (elem.value || "").replace(/\r/g, "");			
		}
		
		if( value.constructor == Number ) value += '';
		
		/**
		 * Seta o valor
		 */
		return this.each(function(){
		
			if(this.nodeType != 1) return;
			
			/**
			 * Se for radio/checkbox
			 */
			if( value.constructor == Array && /radio|checkbox/.test(this.type) ){
				
				this.checked = ( value.indexOf(this.value) >= 0 || value.indexOf(this.name) >= 0);
			
			/**
			 * Se for select
			 */
			}else if( L.nodeName(this) == 'select' ){
				
				/**
				 * Força Array
				 */
				var values = !L.is('array', value)? [value] : value;

				/**
				 * Processa cada opção do array
				 */
				L('option', this).each(function(){
				
				   	this.selected = ( values.indexOf(this.value) >= 0 || values.indexOf(this.text) >= 0);
            	
            	});

            	if(!values.length) this.selectedIndex = -1;
			
			/**
			 * Demais
			 */
        	}else{
        		this.value = value;
    		}
    	});
	}	
});L.extend({
	
	/**
	 * Faz o regex pque procura uma classe
	 * @param [string] name
	 */
	regexClass: function(name){
		return new RegExp("(^|\\s)" + name + "(\\s|$)")
	}
		
});

/**
 * Protótipos
 */
L.implement({
		
	/**
	 * Checa se já tem a classe no elemento
	 * @param [string] name
	 */
	hasClass: function(name){

		if( !L.is('function', name) ) name = L.regexClass(name);
		
		return name.test(this[0].className);
	},
	
	/**
	 * Adiciona classes ao elemento
	 * @param [string] name
	 */
	addClass: function(name){

		return this.each(function(){
			!L(this).hasClass(name) && 
				(this.className += (this.className ? ' ' : '') + name);
		});
	},
	
	/**
	 * Remove classes do elemento
	 * @param [string] name
	 */
	removeClass: function(name){
		
		return this.each(function(){
			this.className = this.className.replace( L.is('string', name)? L.regexClass(name) : name, '').trim();
		});
	},
	
	/**
	 * Adicion/Remove classes do elemento
	 * @param string name
	 */
	toggleClass: function(name){

		return this.each(function(){
		
			var elem = L(this);
			elem.hasClass(name)? 
				elem.removeClass(name) : 
				elem.addClass(name);
		});
	},
	
	/**
	 * Recupera o CSS do Elemento
	 * @param [mixed] name
	 */
	getStyle: function(name){
	
		var one = L.is('string', name)? true : false,
			styles = [],
			itens = one? [name] : name;
			
		/**
		 * Processa cada item
		 */
		itens.forEach(function(item){
			
			item = item.replace(/([A-Z])/g, '-$1').toLowerCase();
			
	    	var value = document.defaultView
	    		.getComputedStyle(this, '')
	    		.getPropertyValue(item);
		
			styles.push ( value ? value : undefined );
	
		}, this[0]);
		
		if(one) return styles[0];
		return styles;
	},
	
	/**
	 * Seta o CSS do elemento
	 * @param [mixed] name
	 * @param optional [string] value
	 */
	setStyle: function(name, value){
		
		if(!value && L.is('string', name)) return;
		
		var styles = {},
			itens = {};
		
		/**
		 * Força objeto
		 */
		if(value !== undefined) itens[name] = value;
		else itens = name;

		/**
		 * Processa/Limpa as propriedades
		 */
		Object.forEach(itens, function(value, key){
		
			var name = key.replace(/\-[a-z]/g, function(l){
            	return l[1].toUpperCase();
            });
            
            styles[name] = value;
        });
		
		/**
		 * Processa cada elemento
		 */
		return this.each(function(){

			/**
			 * Checa se permite estilo CSS
			 */
			if(this.nodeType === 3 || this.nodeType === 8 || !this.style) return;
			
			Object.forEach(styles, function(value, name){
				this.style[name] = value;
			}, this);
			
		});
	},
		
	/**
	 * Recupera/Seta o CSS do elemento
	 * @param [mixed] style
	 * @param optional [string] value
	 */		
	css: function(style, value){
						
		if(!L.is('object', style) && value === undefined)
			return this.getStyle(style);
		
		/**
		 * Seta o CSS
		 */	
		return this.setStyle(style, value);
	},
	
	offset: function(){
		return;
	}
	
});L.implement({

	bind: function(event, fn){
	},
	
	unbind: function(event){
	},
	
	delegate: function(event, fn){
	},
	
	undelegate: function(event){
	}
	
});L.extend({
	
	/**
	 * Regex's
	 */
	r_xhtmlTag: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	
	/**
	 * Retorna o node name do elemento
	 * @param [object] elem
	 */
	nodeName: function(elem){
		return elem.nodeName.toLowerCase();
	}
	
});

/**
 * Protótipos
 */
L.implement({
	
	/**
	 * Valores padrão
	 */
	selector: '',
	context: document,
	length: 0,
	
	/**
	 * Faz com que o this seja uma array :P - roubei do jQuery 
	 */
	push: [].push,
	sort: [].sort,
	splice: [].splice,
	
	/**
	 * Seleciona os elementos de acordo com o selector
	 *  - #id
	 *  - .class
	 *  - div
	 * @param [string|object] selector
	 * @param [object] context
	 */
	init: function(selector, context){
	
		var dom = [];
		selector = selector || document;
		context = context && context.nodeType ? context : document;

		/**
		 * DOM :)
		 */
		if(selector.nodeType){
			dom[0] = selector;
			
		/**
		 * IDS
		 */
		}else if(selector.indexOf('#') == 0){
			dom[0] = context.getElementById( selector.replace('#', '') );

		/**
		 * Classes
		 */
		}else if(selector.indexOf('.') == 0){
			dom = context.getElementsByClassName(selector.replace('.', ''));
			
		/**
		 * TAGs
		 */	
		}else{
			dom = context.getElementsByTagName(selector);
		}
		
		if(!dom) return this;
		
		this.selector = selector;
		this.context = context;
		
		/**
		 * Puxa os elementos
		 */
		if(dom.length){
			
			for(var i = 0, l = dom.length; i < l; i++) this.push( dom[i] );
			this.length = dom.length;
			
		}else{
			
			this.push( dom[0] );
			this.length = 1;
		
		} 

		return this;
	},
	
	/**
	 * Processa cada elemento, semelhante a Array.each
	 * @param [function] fn
	 */
	each: function(fn){
		
		return Array.each(this, function(elem, index){
			fn.call(elem, index, elem);
		}, this);
	},
	
	/**
	 * Retorna o número de elementos selecionados
	 */
	size: function(){
		return this.length;
	},
	
	/**
	 * Retorna o elemento da posição eq
	 * @param [number] eq
	 */
	eq: function(eq){
		return L(this[eq]);
	},
    
    /**
     * Retorna o primeiro elemento
     */
    first: function(){
    	return L(this[0]);
    },
    
    /**
     * Retorna o último elemento
     */
    last: function(){
    	return L(this[this.length - 1]);
    },
	
	/**
	 * Recupera/Seta o HTML do elemento
	 * @param optional [string] value
	 */
	html: function(value){
		
		/**
		 * Seta o HTML
		 */
		if(typeof value === 'string'){
			
			value = value.toLowerCase().replace(L.r_xhtmlTag, '<$1></$2>');
			
			return this.each(function(){
				
				if(this.nodeType === 1){
					this.innerHTML = value;
				}
				
			});
				
		}
		
		return this[0] && this[0].nodeType === 1 ? this[0].innerHTML : null;
	},
	
	/**
	 * Recupera/Seta o texto ao elemento
	 * @param optional [string] text
	 */
	text: function(text){
		
		var all = document.all;
		
		/**
		 * Seta o texto
		 */
		if(typeof text === 'string'){
			
			return this.each(function(){
			
				if(all)
					this.innerText = text;
				else
					this.textContent = text;
				
			});

		}
		
		return (all)? this[0].innerText : this[0].textContent;
	},
	
	/**
	 * Recupera/Seta um atributo ao elemento
	 * @param [string] name
	 * @param optional [mixed] value
	 */
	attr: function(name, value){
		
		if(value != undefined){
			
			this.each(function(){
				this.setAttribute(name, value);
			});
			
		}
		
		return this[0].getAttribute(name);
	},
	
	/**
	 * Remove um atributo dos elementos
	 * @param [string] name
	 */	
	removeAttr: function(name){
		
		return this.each(function(){

			this[name] = '';
			
			if(this.nodeType === 1)
				this.removeAttribute(name);
        
        });
	
	},
	
	/**
	 * Recupera/Seta um atributo do tipo data-
	 * @param [string] name
	 * @param optional [mixed] value
	 */
	data: function(name, value){
		return this.attr('data-' + name, value);
	},
	
	/**
	 * Remove um atributo data- dos elementos
	 * @param [string] name
	 */	
	removeData: function(name){
		return this.removeAttr('data-' + name);
	},
	
	/**
	 * Recupera/Seta o valor do input atual. input: input|textarea|select|...
	 * @param optional [mixed] value
	 */
	val: function(value){
	
		/**
		 * Recupera os valores
		 */
		if(value == undefined){
			
			if(!this.length) return undefined;
			
			var elem = this[0],
				nodeName = L.nodeName(elem);
			
			/**
			 * Se for select
			 */
			if(nodeName == 'select'){
				
				var index = elem.selectedIndex,
                    values = [],
                    options = elem.options,
                    one = elem.type == 'select-one';
				
				/**
				 * Valor único
				 */
				if(one){
					return index >= 0 ? 
						
						options[index].hasAttribute('value') ? 
							options[index].value : 
							options[index].text : 
						
						null;
				}
				
				/**
				 * Junta os valores
				 */
				Array.each(options, function(option){
					
					if(option.selected)
						values.push( option.hasAttribute('value') ? option.value : option.text );
				});
				
				return values;
			}
			
			/**
			 * Demais itens
			 */
			return (elem.value || "").replace(/\r/g, "");			
		}
		
		if( value.constructor == Number ) value += '';
		
		/**
		 * Seta o valor
		 */
		return this.each(function(){
		
			if(this.nodeType != 1) return;
			
			/**
			 * Se for radio/checkbox
			 */
			if( value.constructor == Array && /radio|checkbox/.test(this.type) ){
				
				this.checked = ( value.indexOf(this.value) >= 0 || value.indexOf(this.name) >= 0);
			
			/**
			 * Se for select
			 */
			}else if( L.nodeName(this) == 'select' ){
				
				/**
				 * Força Array
				 */
				var values = !L.is('array', value)? [value] : value;

				/**
				 * Processa cada opção do array
				 */
				L('option', this).each(function(){
				
				   	this.selected = ( values.indexOf(this.value) >= 0 || values.indexOf(this.text) >= 0);
            	
            	});

            	if(!values.length) this.selectedIndex = -1;
			
			/**
			 * Demais
			 */
        	}else{
        		this.value = value;
    		}
    	});
	}	
});/**
 * Linha Browser Selector 1.0
 */
Linha.extend({
	
	/**
	 * User Agent e HTML Node
	 */
	ua: navigator.userAgent.toLowerCase(),
	
	html: document.childNodes[1],
	
	/**
	 * Classes CSS
	 */
	screens: [320, 480, 640, 768, 1024, 1280, 1440, 1680, 1920],
	
	css3: 'background-origin background-clip background-size box-sizing box-shadow box-reflect border-image border-radius columns perspective transform transition'.split(' '),
	
	_classes: [],
	
	/**
	 * Adiciona uma classe para o HTML
	 */
	htmlClass: function(classe){
		this._classes.push(classe);
	},
	
	/**
	 * Define a classe para o OS atual
	 */
	osSelector: function(){
		var ua = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(this.ua);
		this.htmlClass(ua[1]);
		
		return this;
	},
	
	/**
	 * Define a classe para o browser atual e a sua versão
	 */
	browserSelector: function(){
		
		var ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(this.ua);
		
		this.htmlClass(ua[1]);
				
		/**
		 * Fix safari
		 */
		if(ua[1] == 'safari') this.htmlClass(ua[1] + '-' + ua[2].substring(0, 1));
		else this.htmlClass(ua[1] + '-' + parseInt(ua[2]));

		/**
		 * Condicionais IE
		 */
		if(ua[1] == 'ie'){
		
			for(var ver = 3; ver < 10; ver++) {
				if(parseInt(ua[2]) < ver) this.htmlClass('lt-ie-' + ver);		
			}
		}
		
		return this;
	},
	
	/**
	 * Define a classe para o tamanho da tela atual
	 * Suporta redimensionamento...
	 */
	screenSelector: function(){
		
		var w = window.outerWidth || this.html.clientWidth;
		
		/**
		 * Remove a classe atual
		 */
		this._removeClass(this.html, / ?(screen|width)-\d+/g);
		
		this._addClass(this.html, 'width-' + w);
		
		/**
		 * Processa cada resolução disponível
		 */
		this.each(this.screens, function(){
			
			if(w <= this){
				Linha._addClass(Linha.html, 'screen-' + this);
				return false;
			}
			
		});
		
		return this;	
	},
	
	/**
	 * Define quais itens do CSS3 funcionam no navegador e adiciona a classe correspodente
	 */
	css3Selector: function(){
		
		var vendors = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'],
		l = vendors.length,
		
		style = document.createElement('div').style,
		
		/**
		* Faz o teste do suporte a propriedade
		*/	
		test = function(item){
			
			/**
			* Upercase nos itens
			*/
			item = item.replace(/(^|-)[a-z]/ig, function(val){
				return val.replace('-', '').toUpperCase();
			});

			if(item in style) return true;
			
			/**
			 * Checa com os verdors
			 */
			for(var i = 0; i < l; i++){
				if(vendors[i] + item in style) return true;			
			}
			
			return false;
		}
		
		/**
		* Começa a checagem
		*/
		var i = this.css3.length;
		
		while(i--){
			var c = this.css3[i]; if(!test(c)) c = 'sem-' + c;
			this.htmlClass(c);
		}
		
		// Demais pripriedades que não funcionam no loop :(
		 
		/**
		 * Multi-backgrounds
		 */ 
		var multiBackgrounds = function(){
			style.cssText = 'background: url(//:), url(//:), white url(//:)';
			return new RegExp('(url\\s*\\(.*?){3}').test(style.background);
		};
		
		/**
		 * Gradientes
		 */
		var gradientes = function(){
		
			var str1 = 'background-image:',
				str2 = 'gradient(linear, left top, right bottom, from(#9f9), to(white));',
				str3 = 'linear-gradient(left top, #9f9, white);';
			
			style.cssText = 
				str1 + str2
				+ str1 + '-webkit-' + str2
				+ str1 + '-moz-' + str2
				+ str1 + '-khtml-' + str2
				+ str1 + '-o-' + str2
				+ str1 + '-ms-' + str2
				+ str1 + str3
				+ str1 + '-webkit-' + str3
				+ str1 + '-moz-' + str3
				+ str1 + '-khtml-' + str3
				+ str1 + '-o-' + str3
				+ str1 + '-ms-' + str3;

			return !!style.backgroundImage;
		}
		
		/**
		 * Background Color - rgba, hsla
		 */
		var backgroundColor = function(cor){
			style.cssText = 'background-color: ' + cor;		
			return !!style.backgroundColor;
		}
		
		/**
		 * Font-face
		 * http://paulirish.com/2009/font-face-feature-detection/
		 */
		var fontFace = function(){
		
			var head = document.getElementsByTagName('head')[0],
				sheet,
				style = document.createElement("style"),
				impl = document.implementation || { hasFeature: function() { return false; } };
			
			/**
			 * Seta o tipo e insere no head
			 */	
			style.type = 'text/css';
			
			head.insertBefore(style, head.firstChild);
			sheet = style.sheet || style.styleSheet;
 			
 			/**
 			 * Checa se tem CSS2
 			 */
 			var supportAtRule = impl.hasFeature('CSS2', '') ?
        	
        	// True
        	function(rule){
        	
            	if (!(sheet && rule)) return false;
            	var result = false;
            	
            	try {
                	sheet.insertRule(rule, 0);
                	result = !(/unknown/i).test(sheet.cssRules[0].cssText);
                	sheet.deleteRule(sheet.cssRules.length - 1);
            	} catch(e) { }
            
            return result;
        	}:
        	
        	// False
        	function(rule) {
            	
            	if (!(sheet && rule)) return false;
            	sheet.cssText = rule;
 
            	return sheet.cssText.length !== 0 && !(/unknown/i).test(sheet.cssText) &&
              		sheet.cssText
                	.replace(/\r+|\n+/g, '')
                	.indexOf(rule.split(' ')[0]) === 0;
        	};
 
			return supportAtRule('@font-face { font-family: "font"; src: "font.ttf"; }');
		}
		
		/**
		 * Adiciona outras classes
		 */ 
		this.htmlClass( ((style.textShadow === '')? '' : 'sem-') + 'text-shadow');
		this.htmlClass( ((style.resize === '')? '' : 'sem-') + 'resize');
		this.htmlClass( ((style.opacity === '')? '' : 'sem-') + 'opacity');
		this.htmlClass( ((gradientes())? '' : 'sem-') + 'gradientes');
		this.htmlClass( ((multiBackgrounds())? '' : 'sem-') + 'multiplos-backgrounds');
		this.htmlClass( ((backgroundColor('rgba(0, 0, 0, 0.5)'))? '' : 'sem-') + 'rgba');
		this.htmlClass( ((backgroundColor('hsla(120, 40%, 100%, 0.5)'))? '' : 'sem-') + 'hsla');
		this.htmlClass( ((fontFace())? '' : 'sem-') + 'font-face');
	
		return this;
	}
	
})

/**
 * Inicia Teste CSS
 */
.osSelector()
.browserSelector()
.screenSelector()
.css3Selector()

/**
 * Adiciona as Classes ao HTML
 */
._addClass(Linha.html, Linha._classes.join(' '));

window.onresize = function(){
	Linha.screenSelector();
};/**
 * Linha HTML5 1.0
 */
Linha.extend({
	
	/**
	 * Elementos HTML5 que serão inseridos
	 */
	html5: 'abbr article aside audio canvas datalist details figure footer header hgroup mark menu meter nav output progress ruby rt section time video'.split(' '),
		
	/**
	 * Cria alguns elementos HTML5 em navegadores antigos
	 */
	criarHtml5: function(){

        var i = this.html5.length;
        while( i-- ){
            elem = document.createElement( this.html5[i] );
        }
        
    	return this;
    }
	
})

// Cria o HTML5
.criarHtml5();/**
 * Linha Load 1.0
 */
Linha.extend({
	
	head: document.getElementsByTagName('head')[0],
	
	isReady: false,
	
	fila: [],
	
	/**
	 * Carrega um script Javascript na página
	 * @param string src
	 * @param string callback
	 */
	script: function(src, callback){
						
		/**
		 * Checa se o DOM está pronto para fazer a inserção
		 */
		if(!this.isReady){
			
			var args = arguments,
			self = this;
			
			/**
			 * Adiciona à fila
			 */
			this.fila.push(function(){
				self.script.apply(self, args);				
			});
			
			return this;
		}
		
		/**
		 * Cria o script
		 */	
		var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.async = true;
		
		/**
		 * Adicionar o evento quando completar
		 */
		s.onreadystatechange = s.onload = function(){
			
			var state = s.readyState;
			
			if(!state || /loaded|complete/.test(state)){
			
				/**
		 		 * Executa a função
		 		 */
				if(typeof(callback) === 'function') callback.call();	
			}
			
			/**
			 * Fix de memória IE
			 */
			s.onload = s.onreadystatechange = null;
		}; 
			
		this.head.appendChild(s);
		
		return this;
	},
	
	/**
	 * Carrega um estilo CSS na página
	 * @param string src
	 * @param string media
	 */
	css: function(src, media){
	
		var l = document.createElement('link');
			l.type = 'text/css';
			l.rel = 'stylesheet';
			l.href = src;
			l.media = (media || 'screen');
						
		this.head.appendChild(l);
		
		return this;
	}
});

/**
 * Libera Ready
 */
setTimeout(function(){

	Linha.isReady = true;
	for(fn in Linha.fila) Linha.fila[fn].call();
		
}, 200);