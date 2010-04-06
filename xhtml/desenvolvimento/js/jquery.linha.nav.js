/**
* @name				Linha Nav
* @version			1.0
* @descripton		Plugin Jquery para criação de menus dropdown de multi-level(s),
* 					Plugin extensível e customizável
*					MODO DE USAR $.nav({opcoes}); || $('.classeTal').nav({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 10:01 | nº 5
*/
(function($){
	$.fn.nav = function(options){
		return new $.nav(options, this);	
	};
	
	$.nav = function(options, elem){
		
		var padrao = {
			seletor: '.menu li',		//Seletor padrão
			filho: 'ul:first', 			//Seletor filho, o que será exibido
			
			evento : 'mouseenter', 		//Evento para disparar o plugin
			eventoFim : 'mouseleave', 	//Evento para terminar o plugin
			
			anima: false,				//Anima a exibição?
			slide : false,				//Animação no formato de slide?
			tempoMostra: 200,			//Tempo para mostrar o submenu
			tempoEsconde: 200,			//Tempo para esconder o submenu

			onInicio : null,			//Callback
			onFim: null					//Callback
		};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		return elem.each(function(){
				
			var t = $(this);
			
			//Eventos customizados
			if(o.evento){
				t.bind(o.evento, function(){return showNav(t);});
			}
			
			if(o.eventoFim){
				t.bind(o.eventoFim, function(){ return hideNav(t);});
			}
		});
	
		/**
		 * @param {Object} t - elemento this
		 */
		function showNav(t){
			if ($.isFunction(o.onInicio)) {o.onInicio.apply(t);}
			if (o.anima) {
				if (o.slide) {
					$(o.filho, t).slideDown(o.tempoMostra);
				}
				else {
					$(o.filho, t).fadeIn(o.tempoMostra);
				}
			}else{
				$(o.filho, t).show();
			}
		};
		/**
		 * @param {Object} t - elemento this
		 */
		function hideNav(t){
			if(o.anima){
				if (o.slide) {
						$(o.filho, t).slideUp(o.tempoEsconde);
				}else {
					$(o.filho, t).fadeOut(o.tempoEsconde);
				}
			}else{
				$(o.filho, t).hide();
			}
			if ($.isFunction(o.onFim)) {o.onFim.apply(t);}
		};
	};
})(jQuery);
