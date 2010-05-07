/**
* @name				Linha Focuss
* @version			1.1
* @descripton		Plugin Jquery para interações com o evento focus,
* 					como troca de borda automática e alteração de texto(value).
* 					Plugin extensível e customizável
*					MODO DE USAR $.focuss({opcoes}); || $('.classeTal').focuss({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   07/04/10 as 14:35 | nº 9
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
				
				tempoIn: 'normal',				//Tempo para animar o efeito no inicio
				tempoOut: 'normal',				//Tempo para animar o efeito no final do evento
				
				cor: 'red', 					//Cor dar borda para dar destaque ao elemento
				removeTexto: false,				//Remover texto pré-escrito, se o valor não for direferente ou nulo retorna o padrão
				
				onInicia: null,					//Callback
				onTermina: null,				//Callback
				
				live: true,						//Abilitar o monitoramento live
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
				var $t = $(this);
				/**
				 * Registro de valores
				 */
				var bl = $t.css('border-left-color'),
					br = $t.css('border-right-color'),
					bt = $t.css('border-top-color'),
					bb = $t.css('border-bottom-color'),
					bcor = bt + ' ' + br + ' ' + bb + ' ' + bl,
					texto = $t.val();
			
				/**
				 * Bind nos eventos
				 */
				$t.bind(o.evento, function(){
					return animaFocuss($t, texto);
				});
				
				$t.bind(o.eventoFim, function(){
					return terminaFocuss($t, bcor, texto);
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
			/**
			 * Usuável para inputs
			 */
			if(o.removeTexto) {if ($t.val() == texto) {$t.val('');}}
			
			$t.css({borderColor: o.cor});
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onInicia)) {
				o.onInicia.apply(this, new Array($t, texto, $o));
			}
		}
		
		/**
		 * Termina o efeito foccus
		 * @param {Object} $t
		 * @param {Object} bcor
		 * @param {Object} texto
		 */
		function terminaFocuss($t, bcor, texto){
			/**
			 * Usuável para inputs
			 */
			if(o.removeTexto){if($t.val() == ''){$t.val(texto);}}	
	
			$t.css({borderColor:bcor});
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onTermina)) {
				o.onTermina.apply(this, new Array($t, bcor, texto, $o));
			}
		}
				
	};
})(jQuery);
