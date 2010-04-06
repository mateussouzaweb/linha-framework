/**
* @name				Linha Focuss
* @version			1.0
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
* @ultima-revisao   11/03/10 as 9:55 | nº 6
*/
(function($){
	
	$.fn.focuss = function(options){
		return new $.focuss(options, this);	
	};
	
	$.focuss = function(options, elem){
		
		var padrao = {
				seletor: 'input, textarea',		//Seletor padrão
				evento: 'focus',				//Evento para disparar o focuss
				eventoFim: 'blur',				//Evento para terminar o focuss
				cor: 'red', 					//Cor para dar destaque ao elemento 
				remove: false, 					//Remover borda padrão de alguns navegadores (Safari e Chome)
				removeTexto: false,				//Remover texto pré-escrito, se o valor não for direferente ou nulo retorna o padrão
				onFocus: null,					//Callback
				onBlur: null					//Callback
			};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
			
		return elem.each(function(){
			
			var t = $(this),
			bl = t.css('border-left-color'),
			br = t.css('border-right-color'),
			bt = t.css('border-top-color'),
			bb = t.css('border-bottom-color'),
			bcor = bt + ' ' + br + ' ' + bb + ' ' + bl,
			texto = t.val();
				
			//Eventos customizados
			if(o.evento){
				t.bind(o.evento, function(){return iniciaFocuss(t);});
			}
			
			if(o.eventoFim){
				t.bind(o.eventoFim, function(){ return terminaFocuss(t, bcor);});
			}
			
			function iniciaFocuss(t){

				//Para inputs
				if(o.remove){t.css({outline: 'none'});}
				if (o.removeTexto) {if (t.val() == texto) {t.val('');}}
				
				//Uso geral
				t.css({borderColor: o.cor});
				
				if ($.isFunction(o.onFocus)) {o.onFocus.apply(t);}
			}
			
			function terminaFocuss(t, cor){
				
				//Para inputs
				if(o.remove){t.css({outline: ''});}
				if (o.removeTexto) {if (t.val() == '') {t.val(texto);}}
				
				//Uso geral
				t.css({borderColor:cor});
				
				if ($.isFunction(o.onBlur)) {o.onBlur.apply(t);}
			}		
		});
	};
})(jQuery);
