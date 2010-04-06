/**
* @name				Linha Form
* @version			1.0
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
* @ultima-revisao   24/02/10 as 11:43 | nº 2
*/
(function($){
	
	$.fn.form = function(options){
		return new $.form(options, this);	
	};
	
	$.form = function(options, elem){
		
		var padrao = {
			seletor: '.formulario',					//Seletor padrão
			classe_validacao: 'valida', 			//Classe padrão para os inputs para validação
			classe_email: 'email',					//Classe para validar e-mails
			classe_url: 'url',						//Classe para validar urls
			classe_numero: 'numero',				//Classe pra validar numeros
			classe_regex: 'regex',					//Classe para validação personalizada
			atributo_regex: 'regex',				//Atributo para regex | validação personalizada
				
			ajax: false,							//Caso true o formulário é enviado via ajax, false redireciona
			onValida: null,							//Callback para quando inicia a validação de cada input
			onErro: null,							//Callback para quando retorna erro de cada input
			onPassa: null,							//Callback passa geral / Funcional para AJAX
			onNaoPassa: null						//Callback erro geral
		};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		elem.each(function(){
			
			var t = $(this);
			
			//Checa se é form
			if(!$(this).is('form')){ alert('linha form indica: seletor não é um formulário');}
			
			$(this).find('input, button').filter(':submit').click(function(){
				
				//Aqui começa a validação
				var resultado = $.form.valida(o, elem);
				
				if(resultado){
					
					if(o.ajax){
						//Callback
						if ($.isFunction(o.onPassa)) {o.onPassa.apply(t);}
						return false;
					}else{
						return resultado;
					}
					
				}else{
					//Callback
					if ($.isFunction(o.onNaoPassa)) {o.onNaoPassa.apply(t);}
					return false;
				}				

			});
			
		});
		
	};
	
	$.form.valida = function(o, elem){
	
		var passa = true;

		elem.each(function(){
			$(this).find('input, textarea, select, checkbox, radio').not(':submit').each(function(){
				
				var t = $(this);
				if(t.hasClass(o.classe_validacao)){
					
					//Callback inicio validaçao
					if ($.isFunction(o.onValida)) {o.onValida.apply(t);}
					
					var tValido = valida_input(t,o);
					passa = passa && tValido;
					
					//Exibindo mensagem de erro se não passar
					if(!tValido){
						//Callback não passou validação
						if ($.isFunction(o.onErro)) {o.onErro.apply(t);}
					}
				}
				
			});
		});
		
		return passa;
		
	};
	
	function valida_input(t,o){
			
		var val = t.val();
		ret = true;
		
		//E-MAIL
		if(t.hasClass(o.classe_email)){
				
			var tmp = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
				
		}
		//URLs
		if(t.hasClass(o.classe_url)){
			var tmp = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		//NUMEROS
		if(t.hasClass(o.classe_numero)){
				
			var tmp = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
			
		}
		//REGEX PERSONALIZADO
		if(t.hasClass(o.classe_regex)){
			
			var regex = t.attr(o.atributo_regex);	
			var tmp = new RegExp(regex);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		//NORMAL
		else{
			if(val==''){
				ret = false;
			};
		}
		
		return ret;
			
	}
	
})(jQuery);
