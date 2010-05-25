/**
* @name				Linha Valida
* @version			1.1
* @descripton		Plugin Jquery para validação de formularios
* 					Plugin extensével e customizável
*					MODO DE USAR $.form({opcoes}); || $('.classeTal').form({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   24/05/10 as 15:47 | nº 4
*/
(function($){
	
	$.fn.valida = function(options){
		return new $.valida(options, this);	
	};
	
	$.valida = function(options, elem){
		
		var padrao = {
			seletor: '.formulario',					//Seletor padrão caso não haja nenhum, usado caso use o plugin sem o seletor $.plugin
			
			classeValidacao: 'valida', 				//Classe padrão para os inputs para validação
			classeEmail: 'email',					//Classe para validar e-mails
			classeUrl: 'url',						//Classe para validar urls
			classeNumero: 'numero',					//Classe pra validar numeros
			
			classeRegex: 'regex',					//Classe para validação personalizada
			atributoRegex: 'regex',					//Atributo para regex | validação personalizada
				
			redireciona: true,						//Caso true o formulário é enviado via ajax, false redireciona para outra página
			
			onValida: null,							//Callback para quando inicia a validação de cada input
			onErro: null,							//Callback para quando retorna erro de cada input
			onPassa: null,							//Callback passa geral / Funcional para AJAX
			onNaoPassa: null,						//Callback erro geral
			
			live: false,							//Abilitar o monitoramento live
			liveTempo: 100							//Tempo entra cada checagem, em milisegundos
		};
		var o = $.extend(padrao, options),
			$d = $(document);
		
		if(elem === undefined){ elem = $(o.seletor);}
		elem.elements = [];
		
		/**
		 * Delega o Evento
		 */
		$d.delegate(elem.selector, 'iniciaValida', function(){
			
			var elems = elem.elements,
			els  =  $(elem.selector, elem.context),
			nEls = els.not(elems);
			elem.elements = els;
			
			/**
			 * Processamento dos elementos q passaram
			 */
			nEls.each(function(){
				
				var $t = $(this);
			
				/**
				 * Checa se é um formulário
				 */
				if(!$(this).is('form')){ return false;}
				
				/**
				 * Inicia o processo de validação no click do submit
				 */
				$(this).find('input, button').filter(':submit').click(function(){
					
					/**
					 * Começa a validação
					 */
					var resultado = $.valida.form(o, elem);
					//Erro por aqui
					/**
					 * Se passar
					 */
					if(!resultado){
						if(o.redireciona){
							/**
							 * Callback
							 */
							if ($.isFunction(o.onPassa)) {
								o.onPassa.apply(this, new Array($t, o));
							}
							return false;
						}else{
							return resultado;
						}
					
					/**
					 * Se não
					 */	
					}else{
						/**
						 * Callback
						 */
						if ($.isFunction(o.onNaoPassa)) {
							o.onNaoPassa.apply(this, new Array($t, o));
						}
						return false;
					}			
				});
				
			});
		});
		
		/**
		 * Trigger inicial e monitoramento DOM
		 */
		if(o.live){
			setInterval(function(){
				$(elem.selector).trigger('iniciaValida');
			}, o.liveTempo);
		}else{
			if(elem.length){elem.trigger('iniciaValida');}
		}
		
	};
	
	/**
	 * Função para validar o formulário
	 * @param o - options
	 * @param elem - elemento
	 */
	$.valida.form = function(o, elem){
	
		var passa = true;
		
		/**
		 * Faz o processo em cada entrada
		 */
		elem.each(function(){
			
			$(this).find('input, textarea, select, checkbox, radio').not(':submit').each(function(){
				
				var $t = $(this);
				
				/**
				 * Se tiver a classe necessária para validação
				 */
				if($t.hasClass(o.classeValidacao)){
					
					/**
					 * Callback
					 */
					if ($.isFunction(o.onValida)) {
						o.onValida.apply(this, new Array($t, o));
					}
					
					var tValido = validaInput(t,o);
					passa = passa && tValido;
					
					/**
					 * Se NÃO passar
					 */
					if(!tValido){
						/**
						 * Callback
						 */
						if ($.isFunction(o.onErro)) {
							o.onErro.apply(this, new Array($t, o));
						}
					}
				}
				
			});
		});
		
		return passa;
		
	};
	
	/**
	 * Valida o input
	 * @param $t - $(this)
	 * @param o - options
	 */
	function validaInput($t, o){
			
		var val = $t.val();
		ret = true;
		
		/**
		 * E-mail
		 */
		if($t.hasClass(o.classeEmail)){
			var tmp = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}	
		}
		/**
		 * URL
		 */
		else if(t.hasClass(o.classeUrl)){
			var tmp = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		/**
		 * Numeros
		 */
		if(t.hasClass(o.classeNumero)){	
			var tmp = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		/**
		 * REGEX Personalizado
		 */
		if(t.hasClass(o.classeRegex)){
			var regex = t.attr(o.atributoRegex);	
			var tmp = new RegExp(regex);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		/**
		 * Normal
		 */
		else{
			if(val==''){ret = false;};
		}
		
		return ret;	
	}
	
})(jQuery);
