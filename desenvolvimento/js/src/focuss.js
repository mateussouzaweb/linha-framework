/**
 * Focus 1.1
 */
(function($){
	
	$.fn.focuss = function(options){
		return new $.focuss(options, this);	
	};
	
	$.focuss = function(options, elem){
		
		var padrao = {
				seletor: 'input, textarea',		//Seletor padrão, usado caso use o plugin sem o seletor $.plugin
				
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
			$d = $(document);
		
		if(elem === undefined){ elem = $(o.seletor);}
		elem.elements = [];
		
		/**
		 * Delegando evento inicial
		 */	
		$d.delegate(elem.selector, 'iniciaFocuss', function(){
			
			var elems = elem.elements,
			els  =  $(elem.selector, elem.context),
			nEls = els.not(elems).not(':submit');
			elem.elements = els;

			/**
			 * Retorna o processamento dos elementos q passaram
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
				$(elem.selector).trigger('iniciaFocuss');
			}, o.liveTempo);
		}else{
			if(elem.length){elem.trigger('iniciaFocuss');}
		}

		/**
		 * Anima o efeito foccus
		 * @param {Object} $t
		 * @param {Object} texto
		 */
		function animaFocuss($t, texto){
		
			if(o.removeTexto) {if ($t.val() == texto) {$t.val('');}}
			
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

			if(o.removeTexto){if($t.val() == ''){$t.val(texto);}}	
	
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
