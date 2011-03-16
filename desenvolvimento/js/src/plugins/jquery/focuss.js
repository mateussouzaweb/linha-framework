/*!
 * jQuery Focus 1.2
 */
(function($){
	
	$.fn.focuss = function(options){
		
		var padrao = {
			evento: 'focus',				//Evento para disparar o focuss
			eventoFim: 'blur',				//Evento para terminar o focuss
				
			classe: 'focus', 				//Classe a ser adicionada, no evento inicial
			removeTexto: false,				//Remover texto pré-escrito, se o valor não for direferente ou nulo retorna o padrão
				
			onInicia: null,					//Callback
			onTermina: null,				//Callback
				
			live: false,					//Abilitar o monitoramento live
			liveTempo: 100					//Tempo entra cada checagem, em milisegundos
		};
		var o = $.extend(padrao, options),
			s = this.selector,
			elems = [];
		
		/**
		 * Delegando evento inicial
		 */	
		$(document).delegate(s, 'iniciaFocuss', function(){
			
			var	nEls = $(s).not(elems);
			elems = $(s);

			/**
			 * Retorna o processamento dos elementos que passaram
			 */
			nEls.each(function() {
				var $t = $(this),
					texto = $(this).val();
			
				/**
				 * Bind nos eventos
				 */
				$t.bind(o.evento, function(){
					return animaFocuss($t, texto);
				});
				
				$t.bind(o.eventoFim, function(){
					return terminaFocuss($t, texto);
				});
				
			});

		});
		
		/**
		 * Trigger inicial e monitoramento DOM
		 */
		if(o.live){
			setInterval(function(){
				$(s).trigger('iniciaFocuss');
			}, o.liveTempo);
		}else{
			if(this.length) this.trigger('iniciaFocuss');
		}

		/**
		 * Anima o efeito foccus
		 * @param {Object} $t
		 * @param {Object} texto
		 */
		function animaFocuss($t, texto){
		
			if(o.removeTexto && $t.val() == texto) $t.val('');
			
			$t.addClass(o.classe);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onInicia)) {
				o.onInicia.apply($t, new Array($t, texto, o));
			}
		}
		
		/**
		 * Termina o efeito foccus
		 * @param {Object} $t
		 * @param {Object} texto
		 */
		function terminaFocuss($t, texto){

			if(o.removeTexto && $t.val() == '') $t.val(texto);	
	
			$t.removeClass(o.classe);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onTermina)) {
				o.onTermina.apply($t, new Array($t, texto, o));
			}
		}
				
	};
})(jQuery);
