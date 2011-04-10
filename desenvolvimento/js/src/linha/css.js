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