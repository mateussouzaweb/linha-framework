/*!
 * jQuery Acord 1.3
 */
(function($){
		
	$.acord = {
		
		/**
		 * Opções
		 */
		padrao: {
			
			fx: 'default',										//Efeito padrão do acord
			extend: {},											//Métodos extensíveis
			
			pai: 'h2',											//Seletor pai, ou cabeçalho, header...
			filho: 'div',										//Seletor filho, este é o que ficará escondido
			
			classeAjax: 'ajax',									//Classe para accordions em ajax (classe presente no elemento pai)
			atributoUrl: 'url',									//Atributo para url do accordion em ajax (atributo presente no elemento pai)
			
			evento: 'click',									//Evento para disparar o efeito accordion
			
			hash: false,										//Habilitar navegação via hash?
			inicial: 1,											//Define o acordion que será exibido inicialmente ou default
			
			sempreUm: true,										//Deixar sempre exibindo um seletor filho no accordion?
			autoHeight: false,									//Ajustar automaticamente a altura dos elementos filho?
			
			tempoIn: 'fast',									//Tempo para esconder o seletor filho (Entrada)
			tempoOut: 'fast',									//Tempo para mostrar o seletor filho (Saída)
			easingIn: 'swing',									//Animação com easing na entrada (IN)...
			easingOut: 'swing',									//Animação com easing na saída (OUT)...
			
			onAnima: null,										//Callback
			
			live: false,										//Abilitar o monitoramento live
			liveTempo: 150										//Tempo entra cada checagem, em milisegundos
		},
		
		/**
		 * INIT
		 */
		init: function(){
			
			var o = $(this).data('acord'),
				f = $(this).find(o.filho).addClass('acord-filho'),
				p = $(this).find(o.pai).addClass('acord-pai'),
				hash = window.location.hash;
				
			/**
			 * Fix para erros de animação
			 */
			f.each(function(){
				$(this).css('height', $(this).height() + 'px');
			});
			
			/**
			 * Hash navigation
			 * Usa o parâmetro o.inicial
			 */
			if(o.hash && hash !== '' && $(hash).is('.acord-filho')){
				o.inicial = ($(hash).prevAll('.acord-filho').length) + 1;
			}
			
			/**
			 * Se for sempreUm
			 */
			if(o.sempreUm) f.eq(o.inicial - 1).addClass('acord-filho-atual').show().prev(o.pai).addClass('acord-pai-atual');
			
			/**
			 * Altura automática
			 */
			if(o.autoHeight){
				
				var h = 0;
				
				f.each(function(){
					h = Math.max(h, $(this).outerHeight());
				}).height(h);
				
				
				$(this).height( $(this).height() ).css({overflow: 'hidden'});
			}
			
			/**
			 * Extend FX para init
			 */
			if(o.extend[o.fx + '-init']) o.extend[o.fx + '-init'].apply(this);
			
			/**
			 * Aplica a classe relativa ao FX
			 */
			$(this).addClass('acord-' + o.fx);
			
			$.acord.bind.apply(this);
		},
		
		/**
		 * BIND
		 */
		bind: function(){
			
			var o = $(this).data('acord'),
				self = $(this);
				
			/**
			 * Bind no evento e setagem de valores
			 */
			$('.acord-pai', this).bind(o.evento, function(){
				
				/**
				 * Previne a repetição do mesmo evento
				 */
				if($(this).hasClass('acord-pai-atual')) return false;
						
				/**
				 * Altera o hash, se tiver
				 */
				if(this.hash) window.location.hash = this.hash;
				
				/**
				 * Anima o acord
				 */
				if( $(this).hasClass(o.classeAjax) ){
					return $.acord.ajax.apply( self, [$(this), $(this).next('.acord-filho')] );
				}
				
				return $.acord.anima.apply( self, [$(this), $(this).next('.acord-filho')] );
			});
					
			/**
			 * Checa se o inicial é em ajax e já manda a requisição
			 */
			if(o.sempreUm && $('.acord-pai-atual', this).hasClass(o.classeAjax)){
				$('.acord-pai-atual', this).trigger(o.evento);
			}
		},
		
		/**
		 * DESTROY
		 */
		destroy: function(){
			
			var o = $(this).data('acord');
			
			$('.acord-pai', this).unbind(o.evento);
			$(this).removeData('acord');
		
		},
		
		/**
		 * FX
		 */
		fx: {
		
			/**
			 * Efeito padrão
			 */
			'default': function(p, f){
				
				var o = $(this).data('acord');
				
				/**
				 * Anima Slide
				 */
				$(o.filho, this).not(f).slideUp(o.tempoIn, o.easingIn);
			
				if(o.sempreUm){ 
					f.slideDown(o.tempoOut, o.easingOut);
				}else{
					f.slideToggle(o.tempoIn, o.easingIn);
				}
			}
		},
		
		/**
		 * Requisição Ajax
		 */
		ajax: function(p, f){
		
			var o = $(this).data('acord'),
				self = this;
				
			$.ajax({
				url: p.attr(o.atributoUrl),
				success: function(data){
					f.html(data);
				},
				complete: function(){
				
					/**
					 * Ajuste de altura - height
					 */
					f.height('auto');
					$(self).height('auto');
						
					return $.acord.anima.apply(self, [p, f] );
				}
			});
							
		},
		
		/**
		 * Animação
		 */
		anima: function(p, f){
			
			var o = $(this).data('acord');
			
			/**
			 * Meche nas classes
			 */	
			$('.acord-filho-atual', this).removeClass('acord-filho-atual');
			$('.acord-pai-atual', this).removeClass('acord-pai-atual');
			
			p.addClass('acord-pai-atual');
			f.addClass('acord-filho-atual');
				
			/**
			* Callback
			*/
			if ($.isFunction(o.onAnima)) o.onAnima.apply(this, [p, f]);
			
			/**
			 * Faz a animação
			 */		
			$.acord.fx[o.fx].apply(this, [p, f]);
				
		return false;
		}
	};

	$.fn.acord = function(method){
		
		/**
		 * Chama o evento se existir
		 */
		if($.acord[method]){
			$.acord[method].apply(this, Array.prototype.slice.call(arguments, 1));
		
		/**
		 * Chama o evento inicial
		 */	
		}else if(typeof method === 'object' || !method){
			
			var options = $.extend(true, {}, $.acord.padrao, method);
				
			/*
			 * Live
			 */
			if(options.live){
				
				var elems = [],
					s = this.selector;
				
				setInterval(function(){
					
					var	n = $(s).not(elems);
					elems = $(s);
					
					n.each(function(){
				
						$(this).data('acord', options);
						$.acord.init.apply(this, arguments);
					
					});
			
				
				}, options.liveTempo);
			
			/**
			 * Normal
			 */
			}else{
									
				this.each(function(){
				
					$(this).data('acord', options);
					$.acord.init.apply(this, arguments);
					
				});
			}
		}
		
	return this;
	};

})(jQuery);