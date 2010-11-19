/**
 * Valida 1.1
 */
(function($){

	$.fn.valida = function(options){
		
		var padrao = {
			classeValidacao: 'valida', 				//Classe padrão para os inputs para validação
			classeEmail: 'email',					//Classe para validar e-mails
			classeUrl: 'url',						//Classe para validar urls
			classeNumero: 'numero',					//Classe pra validar números
			
			classeRegex: 'regex',					//Classe para validação personalizada
			atributoRegex: 'regex',					//Atributo para regex | validação personalizada
			
			ValorSelectPadrao: 0,					//Valor padrão para validação do campo select
				
			redireciona: true,						//Caso true o formulário é enviado via ajax, false redireciona para outra página
			
			onValida: null,							//Callback para quando inicia a validação de cada input
			onErro: null,							//Callback para quando retorna erro de cada input
			onPassa: null,							//Callback passa geral / Funcional para AJAX
			onNaoPassa: null,						//Callback erro geral
			
			live: false,							//Abilitar o monitoramento live
			liveTempo: 100							//Tempo entra cada checagem, em milisegundos
		};
		var o = $.extend(padrao, options),
			s = this.selector,
			elems = [];
		
		/**
		 * Delega o Evento
		 */
		$(document).delegate(s, 'iniciaValida', function(){
			
			var	nEls = $(s).not(elems);
			elems = $(s);
			
			/**
			 * Processamento dos elementos q passaram
			 */
			nEls.each(function(){
							
				/**
				 * Checa se é um formulário
				 */
				if(!$(this).is('form')) return false;
				
				var $form = $(this);

				/**
				 * Inicia o processo de validação no click do submit
				 */
				$(this).find('input, button').filter(':submit').click(function(){
					
					/**
					 * Começa a validação
					 */
					var resultado = $.valida(o, $form);
					
					if(resultado){
						if(!o.redireciona){
							/**
							 * Callback
							 */
							if ($.isFunction(o.onPassa)) {
								o.onPassa.apply($form, new Array($form, o));
							}
							return false;
						}else{
							return resultado;
						}

					}else{
						/**
						 * Callback
						 */
						if ($.isFunction(o.onNaoPassa)) {
							o.onNaoPassa.apply($form, new Array($form, o));
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
				$(s).trigger('iniciaValida');
			}, o.liveTempo);
		}else{
			if(this.length) this.trigger('iniciaValida');
		}
		
	};
	
	/**
	 * Função para validar o formulário
	 * @param o - options
	 * @param $form - elemento
	 */
	$.valida = function(o, $form){
	
		var passa = true;
		
		/**
		 * Faz o processo em cada entrada
		 */
		$form.find('input, textarea, select, checkbox, radio').not(':submit').each(function(){
				
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
					
				/**
				 * Separa pelo tipo para validação
				 */
				if($t.is('select')) var tValido = validaSelect($t,o);
				else if($t.is(':checkbox')) var tValido = validaCheckboxRadio($t,o);
				else if($t.is(':radio')) var tValido = validaCheckboxRadio($t,o);
				else var tValido = validaInput($t,o);
					
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
		
		return passa;
	};
	
	/**
	 * Função para validar os campos Text, Password e Textarea
	 * @param $t - $(this)
	 * @param o - options
	 */
	function validaInput($t, o){

		var val = $.trim($t.val());

		/**
		 * E-mail
		 */
		if($t.hasClass(o.classeEmail)){
			var tmp = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);
			if(!tmp.test(val) || val=='') return false;	
		}
		/**
		 * URL
		 */
		if($t.hasClass(o.classeUrl)){
			var tmp = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
			if(!tmp.test(val) || val=='') return false;
		}
		/**
		 * Numeros
		 */
		if($t.hasClass(o.classeNumero)){	
			var tmp = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);
			if(!tmp.test(val) || val=='') return false;
		}
		/**
		 * REGEX Personalizado
		 */
		if($t.hasClass(o.classeRegex)){
			var regex = $t.attr(o.atributoRegex);	
			var tmp = new RegExp(regex);
			if(!tmp.test(val) || val=='') return false;
		}
		/**
		 * Normal
		 */
		else{
			if(val=='') return false;
		}
		
		return true;
	}
	
	/**
	 * Função para validar os campos select
	 * @param $t - $(this)
	 * @param o - options
	 */
	function validaSelect($t, o){

		if(!$t.val() || $t.val() == o.ValorSelectPadrao){
			return false;
		}
		return true;
	}
	
	/**
	 * Função para validar os campos do tipo Checkbox e Radio
	 * Com suporte para multiplos checkbox/radios
	 * @param $t - $(this)
	 * @param o - options
	 */
	function validaCheckboxRadio($t, o){
		
		var inputName = $t.attr('name');
		var checked = $("input[name="+inputName+"]:checked").length;

        if(checked == 0){ 
            return false; 
        } 
		return true;
	}
	
})(jQuery);
