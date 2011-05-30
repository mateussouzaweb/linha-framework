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