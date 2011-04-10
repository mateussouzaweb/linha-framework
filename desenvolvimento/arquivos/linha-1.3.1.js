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
	 * Clona a array atual 
	 */
	clone: function(){
		return this.slice(0);
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

/**
 * Implementa protótipo para IE8-
 * Thanks http://forums.devshed.com/javascript-development-115/javascript-get-all-elements-of-class-abc-24349.html
 */
function getElementsByClassName(name, context){
	
	/**
	 * Nativo
	 */
	if(context.getElementsByClassName)
		return context.getElementsByClassName(name);
	
	/**
	 * IE8-
	 */	
	return( function getElementsByClass(name, context){
	
		context = context || document;
	
		var hasClass = new RegExp('(^|\\s)' + name + '(\\s|$)'),
			all = context.getElementsByTagName('*'),
			results = [],
			elem,
			i = 0;
	
		for(; (elem = all[i]) != null; i++){
	
			var elementClass = elem.className;
	
			if(elementClass && elementClass.indexOf(name) != -1 && hasClass.test(elementClass))
				results.push(elem);
		}
	
		return results;
	
	})(name, context);
}

L.extend({
	
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
	},
	
	/**
	 * Checa se um elemento é filho do parent
	 * @param [object] elem
	 * @param [object] parent
	 */
	isChildren: function(elem, parent){
		
		if(!elem || !parent) return false;
		
		return( 
			(elem.parentNode == parent) || (elem.parentNode != document) &&
			L.isChildren(elem.parentNode, parent)
		);
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
		if(selector.nodeType || selector == window){
			dom[0] = selector;
			
		/**
		 * IDs
		 */
		}else if(selector.indexOf('#') === 0){
			
			dom[0] = document.getElementById( selector.replace('#', '') );
			if( !L.isChildren(dom[0], context) ) dom[0] = null;
			
		/**
		 * Classes
		 */
		}else if(selector.indexOf('.') === 0){
			dom = getElementsByClassName(selector.replace('.', ''), context);
			
		/**
		 * TAGs
		 */	
		}else{
			dom = context.getElementsByTagName(selector);
		}
		
		if(!dom || dom[0] == null) return this;
		
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
	 * Filtra elementos de seletor, se o filtro retornar false, o index é removido
	 * @param [function] fn
	 */
	filter: function(fn){
		
		var remove = [];
		
		/**
		 * Define quem será removido
		 */
		this.each(function(index, elem){
			if( fn.call(elem, index, elem) === false ) remove.push( index );	
		});
		
		/**
		 * Remove os itens
		 */
		Array.each(remove, function(index){
			this.splice(index, 1);
		}, this);
		
		return this;
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
			
			value = value.replace(L.r_xhtmlTag, '<$1></$2>');
			
			return this.each(function(){
				
				if(this.nodeType === 1){
					this.innerHTML = value;
				}
				
			});
				
		}
		
		return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.trim() : null;
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
		
		if(value !== undefined){
			
			this.each(function(){
				this.setAttribute(name, value);
			});
			
		}
		
		var attr = this[0].getAttribute(name);
		return attr ? attr : null;
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
		if(value === undefined){
			
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
						
						options[index].value ? 
							options[index].value : 
							options[index].text : 
						
						null;
				}
				
				/**
				 * Junta os valores
				 */
				Array.each(options, function(option){
					
					if(option.selected)
						values.push( option.value ? option.value : option.text );
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
});

L.extend({
	
	/**
	 * Faz o regex pque procura uma classe
	 * @param [string] name
	 */
	regexClass: function(name){
		return new RegExp('(^|\\s)' + name + '(\\s|$)');
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
		
		if(!this[0]) return false;
		
		if( !L.is('regex', name) ) name = L.regexClass(name);
		
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
		
		var regex = L.is('string', name)? L.regexClass(name) : name;
		
		return this.each(function(){
			this.className = this.className.replace(regex, ' ').trim();
		});
	},
	
	/**
	 * Adicion/Remove classes do elemento
	 * @param string name
	 */
	toggleClass: function(name){

		return this.each(function(){
		
			var elem = L(this);
			
			if(elem.hasClass(name))
				elem.removeClass(name); 
			else
				elem.addClass(name);
		});
	},
	
	/**
	 * Recupera o CSS do Elemento
	 * @param [mixed] name
	 */
	getStyle: function(name){
		
		if(!this[0]) return undefined;
		
		var one = L.is('string', name)? true : false,
			styles = [],
			itens = one? [name] : name,
			value;
			
		/**
		 * Processa cada item
		 */
		itens.forEach(function(item){
			
			//Não IE >)
			if(document.defaultView && document.defaultView.getComputedStyle){
			
				item = item.replace(/([A-Z])/g, '-$1').toLowerCase();
				
				value = document.defaultView
					.getComputedStyle(this, '')
					.getPropertyValue(item);
				
			//IE8-
			}else{
				
				item = item.replace(/\-(\w)/g, function(all, letter){
					return letter.toUpperCase();
				});
				
				value = this.currentStyle[item];
				value = (value === '')? 'auto' : value;
					
			}
			
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
		
		if(!this[0] || !value && L.is('string', name)) return this;
		
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
		
			var name = key.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
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
	
	/**
	 * Recupera a posição do elemento na página, tomando como base o documento
	 */
	offset: function(){
		
		var elem = this[0],
			t = 0,
			l = 0,
			box;

		/**
		 * Checagem besta, para previnir erros :)
		 */
		if(!elem || !elem.ownerDocument) return null;
		
		/**
		 * Método 1 - Novos navegadores
		 */
		if(elem.getBoundingClientRect){
			
			try {
				box = elem.getBoundingClientRect();
			} catch(e) {}
			
			/**
			* Se tiver box, faz alguns cálculos
			*/	
			if(box){
			
				var docElem = elem.ownerDocument.documentElement,
					body = document.body,
			
					clientTop = docElem.clientTop || body.clientTop || 0,
					clientLeft = docElem.clientLeft || body.clientLeft || 0,
			
					scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop || 0,
					scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft || 0;
			
				t = box.top + scrollTop - clientTop;
				l = box.left + scrollLeft - clientLeft;
			
			}
		
		/**
		 * Método 2 - Navegadores Antigos
		 * Camino 1.0, Camino 1.5, Camino 1.6, Firefox 2, IE6, IE7, Safari 3
		 * Thanks http://www.quirksmode.org/js/findpos.html
		 */
		}else{
			
			if(elem.offsetParent){
				
				do{
					l += elem.offsetLeft;
					t += elem.offsetTop;
				} while ( (elem = elem.offsetParent) );
			}
		}
		
		return {top: t, left: l};
	},
	
	/**
	 * Recupera a posição do elemento em relação ao elemento pai
	 */
	position: function(){
	
		var elem = this[0];
		
		if(!elem) return null;
		
		/**
		 * Recupera as posições
		 */
		var offset = this.offset();

		/**
		 * Remove as margens
		 */
		offset.top -= parseFloat(this.css('marginTop')) || 0;
		offset.left -= parseFloat(this.css('marginLeft')) || 0;
		
		/**
		 * Se tiver parent
		 */
		if(elem.offsetParent){
		
			var parentOffset = /^(?:body|html)$/i.test(elem.offsetParent.nodeName)?
				{ top: 0, left: 0 } : 
				L(elem.offsetParent).offset();
		
			/**
			 * Adiciona as bordas
			 */
			parentOffset.top += parseFloat(this.css('borderTopWidth')) || 0;
			parentOffset.left += parseFloat(this.css('borderLeftWidth')) || 0;
			
			offset.left -= parentOffset.left;
			offset.top -= parentOffset.top;
		
		}
		
		return {top: offset.top, left: offset.left};
	}
	
});

L.extend({
	
	/**
	 * Inicia um evento QUASE nas especificações do DOM3 Events
	 */	
	Event: function(src){
		
		/**
		 * Se já tiver o evento
		 */
		if(src && src.type){
		
			this.originalEvent = src;
			this.type = src.type;
		
		}else{
			this.type = src;
		}
	},
	
	/**
	 * Dispara um evento no #elem
	 * @param [string] event
	 * @param [array] data
	 * @param [object] elem
	 */	
	eventTrigger: function(event, data, elem){
		
		if(!elem || elem.nodeType === 3 || elem.nodeType === 8){
            return undefined;
        }
		
		/**
		 * Cria o evento, se já não foi criado
		 */
		if(typeof event !== 'object'){
			
			/**
			 * Define namespace e type
			 */
			var ns = (event.indexOf('.') != -1) ? event.split('.')[0] : false,
				type = (ns) ? event.split('.')[1] : event;
			
			event = new L.Event(type);
			
			event.target = elem;
			event.namespace = ns;
			
			/**
			 * Incopora o evento a data e transforma data em array se for necessário
			 */
			if(!L.is('array', data)){
				
				var	array = [];
				array.push(data);
				
				data = array;
			}
			
			data.unshift(event);
		}
		
		event.currentTarget = elem;
		
		/**
		 * Se tiver algum evento registrado no parent
		 */
		if(elem.events){

			/**
			 * Recupera o evento
			 */
			var fn = event.namespace ? 
				elem.events[event.namespace][event.type] : 
				elem.events[event.type];
								
			/**
			 * Se tive o evento
			 */
			if(fn) fn.apply(elem, data);
			
		}
		
		/**
		 * Checa no elemento parente
		 */
		var parent = elem.parentNode || elem.ownerDocument;
				
		if(!event.isPropagationStopped() && parent)
			L.eventTrigger(event, data, parent);
	}
	
});

/**
 * Implementa os itens para o Event, nas especificações do DOM3 Events
 * http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
 */
var returnFalse = function(){ return false; },
	returnTrue = function(){ return true; };

L.Event.implement({
	
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	
	/**
	 * Previne ação padrão
	 */
	preventDefault: function() {
	
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e ) return;
		
		e.returnValue = false;
	},
	
	/**
	 * Paraliza a propagação
	 */
	stopPropagation: function() {
		
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e ) return;

		e.cancelBubble = true;
	},
	
	/**
	 * Paraliza propagação imediata
	 */
	stopImmediatePropagation: function() {
	
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	
	}

});

L.implement({
	
	/**
	 * Adiciona uma função a um determinado evento
	 * @param [string] type
	 * @param [function] fn
	 */
	bind: function(type, fn){

		/**
		 * Define namespace
		 */
		var ns = (type.indexOf('.') != -1) ? type.split('.')[0] : false;
		if(ns) type = type.split('.')[1];
		
		/**
		 * Registra o evento
		 */
		return this.each(function(){
			
			/**
			 * Checa se já existe os eventos e o namespace
			 */
			if(!this.events) this.events = {};
			
			if(ns && !this.events[ns]) this.events[ns] = {};
			
			/**
			 * Adiciona no índice de eventos
			 * registra apenas um vez, sobreescrevendo o anterior
			 */
			if(ns)
				this.events[ns][type] = fn;
			else
				this.events[type] = fn;
		
			/**
			 * Adiciona Nativo
			 */
			if(this.addEventListener)			
				this.addEventListener(type, fn, false);
				
			else if(this.attachEvent)
				this.attachEvent('on' + type, fn);

		});
	},
	
	/**
	 * Remove um evento previamente anexado ao elemento
	 * @param [string] type
	 * @param [function] fn
	 */
	unbind: function(type, fn){
		
		/**
		 * Checa por namespace no #type
		 */
		var ns = (type.indexOf('.') != -1) ? type.split('.')[0] : false;
		if(ns) type = type.split('.')[1];
		
		/**
		 * Remove o evento
		 */
		return this.each(function(){	
			
			if(this.events){
				
				/**
				 * Recupera o último evento registrado para ser removido
				 */
				if(!fn){
					fn = ns ? this.events[ns][type] : this.events[type];
				}
				
				if(ns) 
					delete this.events[ns][type];
				else 
					delete this.events[type];
				
				/**
				 * Remove Nativo
				 */			
				if(this.removeEventListener)
					this.removeEventListener(type, fn, false);
				
				else if(this.detachEvent)
					this.detachEvent('on' + type, fn);

			}	
		});
	},
	
	/**
	 * Delega um evento para o #seletor agora e no futuro
	 * @param [string] selector 
	 * @param [string] type
	 * @param [function] fn
	 */
	delegate: function(selector, type, fn){
	
		return this.bind('delegate.' + type, function(e){
						
			var target = e ? e.target : window.event.srcElement,
				nodes = L(selector, this);
			
			/**
			 * Força encontrar o #seletor
			 */
			while(target && Array.prototype.indexOf.call(nodes, target) < 0)
				target = target.parentNode;
			
			/**
			 * Chama a função
			 */
			if( target && (target !== this) && (target !== document) )
				fn.apply(target, arguments);

		});
	},
	
	/**
	 * Remove a Delegação de um evento para o #seletor agora e no futuro
	 * @param [string] selector 
	 * @param [string] type
	 * @param [function] fn
	 */
	undelegate: function(selector, type, fn){
		return this.unbind('delegate.' + type, fn);
	},
	
	/**
	 * Dispara um determinado evento do elemento
	 * @param [string] type
	 * @param [array] data
	 */
	trigger: function(type, data){
		
		return this.each(function(){
			L.eventTrigger(type, data, this);
		});
	}
	
});