/**
* @name				Linha Nav
* @version			1.1
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
* @ultima-revisao   28/05/10 as 09:40 | nº 10
*/
(function($){
	$.fn.nav = function(options){
		return new $.nav(options, this);	
	};
	
	$.nav = function(options, elem){
		
		var padrao = {
			seletor: '.menu li',					//Seletor padrão
			seletorFilho: 'ul:first', 				//Seletor filho, o que será exibido
			
			classePaiAtual: 'nav-pai-atual', 		//Classe para pai que está em foque | Adicionado pelo plugin
			classeFilhoAtual: 'nav-filho-atual',	//Classe para o filho que esta visível | Adicionado pelo plugin
			
			evento : 'mouseenter', 					//Evento para disparar o plugin
			eventoFim : 'mouseleave', 				//Evento para terminar o plugin
			
			efeitoIn: 'slideDown',					//Efeito inicial
			efeitoOut: 'slideUp',					//Efeito Final
			tempoIn: 'normal',						//Tempo para esconder o seletor filho (Entrada)
			tempoOut: 'normal',						//Tempo para mostrar o seletor filho (Saída)
			easingIn: 'swing',						//Animação com easyng na entrada (IN)...
			easingOut: 'swing',						//Animação com easyng na saída (OUT)...
			stopClearQueue: true, 					//(Veja API Stop - clearQueue) e não mexa sem conhecimento
			stopJumpToEnd: true,					//(Veja API Stop - jumpToEnd) e não mexa sem conhecimento

			onExibe : null,							//Callback
			onEsconde: null							//Callback
		};
		var o = $.extend(padrao, options),
			$d = $(document),
			np = o.classePaiAtual,
			nf = o.classeFilhoAtual;
			
		if(elem === undefined){ elem = $(o.seletor);}
		
		/**
		 * Delegando evento
		 */
		$d.delegate(elem.selector, o.evento, function(e){
			
			/**
			 * Checa o seletor filho
			 */
			var $f = $(this).children(o.seletorFilho);
			if(!$f.length){return false;}
			
			exibeNav($(this), $f);
			
			/**
			 * Da o bind no evento final
			 * Não pode ser delegate porque ele tem bug no evento mouseleave...aff
			 */
			$(this).unbind(o.eventoFim).bind(o.eventoFim, function(){
				return escondeNav($(this), $f);
			});
		});
	
		/**
		 * Exibir o seletor filho
		 * @param {Object} $t - elemento this
		 * @param {Object} $f - elemento filho
		 */
		function exibeNav($t, $f){
			
			/**
			 * Adiciona a classe
			 */
			$t.addClass(np);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onExibe)) {
				o.onExibe.apply($t, new Array($t, $f, o));
			}
			
			/**
			 * Animação
			 */
			$f.stop(o.stopClearQueue, o.stopJumpToEnd).addClass(nf)[o.efeitoIn](o.tempoIn, o.easingIn);
			
		};
		
		/**
		 * Esconder o seletor filho
		 * @param {Object} $t - elemento this
		 * @param {Object} $f - elemento filho
		 */
		function escondeNav($t, $f){
			
			/**
			 * Remove a classe
			 */
			$t.removeClass(np);
			
			/**
			 * Animação
			 */
			$f.stop(o.stopClearQueue, o.stopJumpToEnd).removeClass(nf)[o.efeitoOut](o.tempoOut, o.easingOut);
	
			/**
			 * Callback
			 */
			if ($.isFunction(o.onEsconde)) {
				o.onEsconde.apply($t, new Array($t, $f, o));
			}
		};
	};
})(jQuery);
