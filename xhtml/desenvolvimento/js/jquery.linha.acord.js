/**
* @name				Linha Acord
* @version			1.0
* @descripton		Plugin Jquery para criação de accordions extensível e customizável
*					MODO DE USAR $.acord({opcoes}); || $('.classeTal').acord({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 09:53 | nº 6
*/
(function($){
	$.fn.acord = function(options){
		return new $.acord(options, this);	
	};
	
	$.acord = function(options, acordion){
		var padrao = {
				seletor: '.acordion',	//Seletor padrão
				pai: 'h2',				//Seletor pai, ou cabeçalho, header...
				filho: 'div',			//Seletor filho, este é o que ficará escondido
				
				evento: 'click',		//Evento para disparar o efeito accordion
				
				sempreUm: true,			//Deixar sempre exibindo um seletor filho no accordion
				autoheight: true,		//Ajustar automaticamente a altura dos elementos filho
				tempoUp: 'normal',		//Tempo para esconder o seletor filho
				tempoDown: 'normal',	//Tempo para mostrar o seletor filho

				onAcord: null 			//Callback
		};
		
		var o = $.extend(padrao, options);
		
		if(acordion === undefined){ acordion = $(o.seletor);}
			
		return acordion.each(function(){
			var a = acordion;
			
			//Fix para erros de animação
			a.find(o.filho).each(function(){$(this).css('height', $(this).height() + 'px').hide();});
			if (o.sempreUm) {$(o.filho + ':first', a).show();}
			
			//Altura automatica
			if(o.autoheight){
				var h = 0; 
				$(o.filho, this).each(function(){
					h = Math.max(h, $(this).outerHeight());
				}).height(h);
				
				a.height($(this).height()).css({overflow: 'hidden'});
			} 

			//Eventos customizados
			if(o.evento){
				$(o.pai, a).bind(o.evento, function(){return showAcord($(this), a);});
			}
			
			function showAcord(t, a){

				var n = t.next();
				
				if ($.isFunction(o.onAcord)) {o.onAcord.apply(t);}
				
				$(o.filho, a).not(n).slideUp(o.tempoUp);
				if (o.sempreUm) {
					n.slideDown(o.tempoDown);
				}else{
					n.slideToggle(o.tempoDown);
				}
				
				return false;
			}
		});

	};

})(jQuery);
