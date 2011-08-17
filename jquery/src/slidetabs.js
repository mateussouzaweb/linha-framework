/*!
 * jQuery Slidetabs 1.3
 */
(function($){
	
	$.slideTabs = {
		
		/**
		 * Opções do plugin
		 * @var {object}
		 */
		options: {
			
			seletorPainel: '.painel',							// Seletor para o painel ou os slides
			seletorMiniatura: '.miniatura',						// Seletor de miniaturas
			seletorAnterior: '.anterior',						// Seletor seta anterior
			seletorProximo: '.proximo',							// Seletor seta próximo
			
			eventoMiniatura: 'click',							// Evento para disparar o plugin nas miniaturas
			eventoSeta: 'click',								// Evento para disparar o plugin nos botões/setas próximo e anterior
			
			inicial: 1,											// Slide inicial | Se hash = true haverá alteração automática
			continuo: true, 									// Deixar o slide rolar de forma contínua?
			
			auto: false, 										// Executar a troca de slide automaticamente?
			pausarAuto: true,									// Pausa a troca de slides automática quando o slide está no estado hover
			pausa: 4000, 										// Tempo entre cada pausa para o slide automático
			
			tempo: 'fast',										// Tempo para cada transição / 0 (zero) para sem animação
			easing: 'swing',									// Animação com easing na entrada (IN)...
			
			scroll: 1,											// Nº de elementos que serão arrastados
			direcao: 'x',										// Direção para o slide, X (horizontal) ou Y (vertical)
			
			onSlide: null,										// Callback
			
			live: false,										// Habilitar o monitoramento live
			liveTempo: 100										// Tempo entra cada checagem, em milisegundos
			
		},
		
		/**
		 * Inicia o plugin
		 * @return this.bind();
		 */
		init: function(){
			
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');
			
			/**
			 * Ajusta o slide
			 */
			var $s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel), 
				$m = $t.find(o.seletorMiniatura),
				
				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true);
				position = (o.direcao == 'x') ? 'left' : 'top',
				i = o.inicial - 1;
			
			$p.filter(':first').addClass('slidetabs-painel-primeiro')
			$p.eq(i).addClass('slidetabs-painel-atual');
			
			increase = i * increase;
			
			/**
			 * Força remover CSS Float quando é para animar na direção y
			 */
			if(position == 'top')
				$p.css('float', 'none');
			
			$s.css(position, -increase + 'px');
			
			/**
			 * Ajusta as miniaturas
			 */
			$m.eq(i).addClass('slidetabs-miniatura-atual');
			
			return $.slideTabs.bind.apply(this);
		},
		
		/**
		 * Bind para os elementos
		 */
		bind: function(){
			
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');
			
			/**
			 * Seta anterior
			 */
			$(o.seletorAnterior, t).bind(o.eventoSeta, function(){
				return $.slideTabs.animate.apply(t, [-1]);
			});
			
			/**
			 * Miniaturas
			 */
			$(o.seletorMiniatura, t).bind(o.eventoMiniatura, function(){
				
				if( $(this).hasClass('slidetabs-miniatura-atual') )
					return false;
				
				var m = $t.find('.slidetabs-miniatura-atual').prevAll().length,
					l = $(this).prevAll().length - m;
				
				return $.slideTabs.animate.apply(t, [l]);
			});
			
			/**
			 * Seta próximo
			 */
			$(o.seletorProximo, t).bind(o.eventoSeta, function(){
				return $.slideTabs.animate.apply(t, [1]);
			});
			
			/**
			 * Automático
			 */
			if(o.auto){
				
				/**
				 * Faz a checagem para pausar a troca automática de slides
				 */
				if(o.pausarAuto){
					$t.hover(function(){
						
						$.slideTabs.stop.apply(t);
						$(this).data('slideHover', '1');
						
					}, function(){
						
						$(this).removeData('slideHover');
						$.slideTabs.start.apply(t);
						
					});
				}
				
				$.slideTabs.start.apply(t);
			}
		},
		
		/**
		 * Unbind para os eventos
		 */
		unbind: function(){
			
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');
			
			/**
			 * Setas
			 */
			$(o.seletorAnterior, t).unbind(o.eventoSeta);
			$(o.seletorProximo, t).unbind(o.eventoSeta);
			
			/**
			 * Miniaturas
			 */
			$(o.seletorMiniatura, t).unbind(o.eventoMiniatura);
			
			/**
			 * Automático
			 */
			$.slideTabs.stop.apply(t);
			
			if(o.pausarAuto){
				$t.unbind('hover');
				$t.removeData('slideHover');
			}
			
		},
		
		/**
		 * Para o slide automático
		 * @return clearInterval();
		 */
		stop: function(){
			
			var t = this;
			
			return clearInterval(t.timeout);
		},
		
		/**
		 * Inicia o slide automático
		 */
		start: function(){
			
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');
			
			$.slideTabs.stop.apply(t);
			
			t.timeout = setTimeout(function(){
				
				if(o.pausarAuto && $t.data('slideHover'))
					return false;
				
				return $.slideTabs.animate.apply(t, [1]);
			}, o.pausa);
			
		},
		
		/**
		 * Ajusta a posição do slide, para a animação
		 * @param {int} next
		 * @return {int}
		 */
		adjustPosition: function(next){
			
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs'),
				$s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel),
				$pa = $t.find('.slidetabs-painel-atual'),
				
				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true),
				position = (o.direcao == 'x') ? 'left' : 'top',
				
				now = $pa.prevAll().length + 1,
				next = now + next;
			
			if(!o.continuo)
				return now;
				
			// Próximo
			if(next > $p.length){
				
				/**
				 * Ajusta a ordem dos elementos
				 */
				var remain = next - $p.length;
				if(o.scroll > 1) remain += o.scroll - 1;
				
				var $lt = $p.slice(0, remain);
					$lt.insertAfter( $p.filter(':last') );
				
				now -= remain;
				
				/**
				 * Ajusta a posição do scroll
				 */
				$s.css(position, '-' + ( (now - 1) * increase ) + 'px');
				
			// Anterior
			}else if(now > next){
				
				/**
				 * Ajusta a ordem dos elementos
				 */
				var remain = now - next;
				
				if( remain > 0 && !$pa.prevAll().eq(remain - 1).length ){
					
					$gt = $p.slice( $p.length - remain);
					$gt.insertBefore( $p.filter(':first') );
					
					now += remain;
					
					/**
					 * Ajusta a posição do scroll
					 */
					$s.css(position, '-' + ((now - 1) * increase) + 'px');
					
				}
				
			}
			
			return now;
		},
		
		/**
		 * Anima o slide
		 * @param {int} next
		 * @return false
		 */
		animate: function(next){
			
			/**
			 * Ajusta os parâmetros
			 */
			if(next == undefined)
				return false;
			
			/**
			 * Opções
			 */
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs'),
				
				$s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel),
				$pa = $t.find('.slidetabs-painel-atual'),
				$m = $t.find(o.seletorMiniatura),
				
				now = $pa.prevAll().length + 1,
				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true),
				position = (o.direcao == 'x') ? 'left' : 'top',
				ani = {};
			
			if(o.scroll > 1){
				next = (next > 0) ? next + o.scroll - 1 : next - o.scroll + 1;
			}
			
			/**
			 * Checa se é contínuo
			 */
			if(!o.continuo){
				
				if( (next < 0 && now + next <= 0) || (next > 0 && now + next > $p.length) )
					return false;
				
			}
			
			/**
			 * Ajusta o slide e recalcula o valor de now
			 */
			now = $.slideTabs.adjustPosition.apply(this, [next]);
			
			/**
			 * Ajusta a posição da animação, para permitir ir a ambas as direções
			 */
			ani[position] = '-=' + (next * increase);
			
			/**
			 * Anima o slide
			 */
			if(!$s.is(':animated')){
				
				$s.animate( ani, {
					queue: false,
					duration: o.tempo,
					easing: o.easing,
					complete: function(){
						
						/**
						 * Ajusta o painel atual
						 */
						$pa.removeClass('slidetabs-painel-atual');
						
						$pa = $t.find(o.seletorPainel).eq( (now - 1) + next );
						$pa.addClass('slidetabs-painel-atual');
						
						/**
						 * Ajusta a miniatura atual
						 */
						var $ma = $t.find('.slidetabs-miniatura-atual').removeClass('slidetabs-miniatura-atual');
						var l = $ma.prevAll().length + next;
						
						if( l >= $m.length) l = 0;
						
						$m.eq( l ).addClass('slidetabs-miniatura-atual');
						
						/**
						 * Callback
						 */
						if( $.isFunction(o.onSlide) ){
							o.onSlide.apply(t, [$t]);
						}
						
						/**
						 * Automático
						 */
						if(o.auto) $.slideTabs.start.apply(t);
						
					}
				});
				
			}
			
			return false;
		}
	}
	
	/**
	 * Slidetabs
	 * @param {mixed} method
	 * @param {mixed} argument, ...
	 * @return {object}
	 */
	$.fn.slideTabs = function(method){
		
		/**
		 * Chama o evento se existir
		 */
		if($.slideTabs[method]){
			$.slideTabs[method].apply(this, Array.prototype.slice.call(arguments, 1));
		
		/**
		 * Chama o evento inicial
		 */
		}else if(typeof method === 'object' || !method){
			
			var options = $.extend(true, {}, $.slideTabs.options, method);
			
			/*
			 * Live
			 */
			if(options.live){
				
				var elems = [],
					s = this.selector;
				
				setInterval(function(){
					
					var n = $(s).not(elems);
					elems = $(s);
					
					n.each(function(){
						
						$(this).data('slidetabs', options);
						$.slideTabs.init.apply(this, arguments);
						
					});
					
				}, options.liveTempo);
				
			/**
			 * Normal
			 */
			}else{
				
				this.each(function(){
					
					$(this).data('slidetabs', options);
					$.slideTabs.init.apply(this, arguments);
					
				});
				
			}
			
		}
		
		return this;
	};
	
})(jQuery);
