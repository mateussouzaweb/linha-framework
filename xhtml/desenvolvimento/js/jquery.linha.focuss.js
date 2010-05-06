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
* @ultima-revisao   06/04/10 as 9:55 | nº 6
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
				onTermina: null					//Callback
			};
		var o = $.extend(padrao, options),
			$d = $(document);

		
		if(elem === undefined){ elem = $(o.seletor);}
		
		/**
		 * Delegando evento inicial
		 */	
		$d.delegate(elem.selector, 'iniciaFocuss', function(){
			/**
			 * Checa se é submit
			 */
			if($(this).is(':submit')){return;}
			
			/**
			 * Registro de valores
			 */
			var $t = $(this),
			bl = $t.css('border-left-color'),
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
		
		/**
		 * Trigger inicial e monitoramento ajax
		 */
		if(elem.length){elem.trigger('iniciaFocuss');}
		else {
			$d.bind('ajaxComplete', function(o, xhr, url){
				if (xhr.readyState == 4 && xhr.status == 200 && $(elem.selector).length) {
					$(elem.selector).trigger('iniciaFocuss');
				}
			});
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
			//callback
			//ta executando a mesma função várias vezes, talvez o one resolva essa pendência
			console.log("teste");
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
	
			$t.css({borderColor:bcor}, 'normal');
			//callback
		}		
	};
})(jQuery);
