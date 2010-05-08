/**
* @name				Linha Acord
* @version			1.1
* @descripton		Plugin Jquery para criação de accordions extensível e customizável
*					MODO DE USAR $.acord({opcoes}); || $('.classeTal').acord({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   07/05/10 as 14:35 | nº 10
*/
(function($){
	$.fn.acord = function(options){
		return new $.acord(options, this);	
	};
	
	$.acord = function(options, elem){
		var padrao = {
				seletor: '.accordion',								//Seletor padrão, usado caso use o plugin sem o seletor $.plugin
				pai: 'h2',											//Seletor pai, ou cabeçalho, header...
				filho: 'div',										//Seletor filho, este é o que ficará escondido
				
				classePaiAtual: 'accordion-pai-atual', 				//Classe para pai que está em foque | Adicionado pelo plugin
				classeFilhoAtual: 'accordion-filho-atual',			//Classe para o filho que esta visível | Adicionado pelo plugin
				
				classeAjax: 'ajax',									//Classe para accordions em ajax
				atributoUrl: 'url',									//Atributo para url do accordion em ajax
				
				evento: 'click',									//Evento para disparar o efeito accordion
				
				inicial: 1, 										//Define o acordion que será exibido inicialmente ou default
				sempreUm: true,										//Deixar sempre exibindo um seletor filho no accordion?
				autoHeight: false,									//Ajustar automaticamente a altura dos elementos filho?
				tempoIn: 'normal',									//Tempo para esconder o seletor filho (Entrada)
				tempoOut: 'normal',									//Tempo para mostrar o seletor filho (Saída)
				easingIn: 'swing',									//Animação com easyng na entrada (IN)...
				easingOut: 'swing',									//Animação com easyng na saída (OUT)...
				
				onAcord: null, 										//Callback
				
				live: false,										//Abilitar o monitoramento live
				liveTempo: 100										//Tempo entra cada checagem, em milisegundos
		};	
		
		var o = $.extend(padrao, options),
			$d = $(document),
			ap = o.classePaiAtual,
			af = o.classeFilhoAtual;
		
		if(elem === undefined){elem = $(o.seletor);}
		elem.elements = [];
		
		/**
		 * Delegando eventos....o resultado seria o mesmo que each
		 * Usado para registro em accordions futuros
		 */
		$d.delegate(elem.selector, 'iniciaAcord', function(){
			
			var elems = elem.elements,
			els  =  $(elem.selector, elem.context),
			nEls = els.not(elems);
			elem.elements = els;

			/**
			 * Retorna o processamento dos elementos q passaram
			 */
			nEls.each(function() {
				var $t = $(this);
				/**
				 * Fix para erros de animação
				 */
				$(o.filho, this).each(function(){$(this).css('height', $(this).height() + 'px').hide();});
				if (o.sempreUm) {
					$(o.filho, this).eq(o.inicial - 1).addClass(af).show().prev(o.pai).addClass(ap);
				}
				
				/**
				 * Altura automática
				 */
				if(o.autoHeight){
					var h = 0; 
					$(o.filho, this).each(function(){
						h = Math.max(h, $(this).outerHeight());
					}).height(h);
					
					$t.height($t.height()).css({overflow: 'hidden'});
				}
				
				/**
				 * Bind no evento e setagem de valores
				 */
				$(o.pai, this).bind(o.evento, function(){
					if ($(this).hasClass(o.classeAjax)) {
						return ajaxAcord($t, $(this), $(this).next());
					}
					return animaAcord($t, $(this), $(this).next());
				});
				
				/**
				 * Checa se o inicial é em ajax e já manda a requisição
				 */
				if(o.sempreUm && $('.'+ap, this).hasClass(o.classeAjax)){
					$('.'+ap, this).trigger(o.evento);
				}
			});
			
		});
		
		/**
		 * Trigger inicial e monitoramento DOM
		 */
		if(o.live){
			setInterval(function(){
				$(elem.selector).trigger('iniciaAcord');
			}, o.liveTempo);
		}else{
			if(elem.length){elem.trigger('iniciaAcord');}
		}
		
		/**
		 * Processamento de accordions em ajax
		 * Carrega o conteúdo e ajusta a largura se for preciso
		 * Todos os parâmetros devem vir em formato jQuery
		 * @param {Object} $acord
		 * @param {Object} $pai
		 * @param {Object} $filho
		 */
		function ajaxAcord($acord, $pai, $filho){
			$.ajax({
				type: "POST",
				url: $pai.attr(o.atributoUrl),
				success: function(data){
					$filho.html(data);
				}
			});
			
			/**
			 * Ajuste de altura - heigth
			 */
			$filho.height('auto');
			$acord.height('auto');
			
			return animaAcord($acord, $pai, $filho);
		}	
		
		/**
		 * Anima o accordion
		 * Todos os parâmetros devem vir em formato jQuery
		 * @param {Object} $acord
		 * @param {Object} $pai
		 * @param {Object} $filho
		 */
		function animaAcord($acord, $pai, $filho){
			
			$(o.filho, $acord).removeClass(af);
			$(o.pai, $acord).removeClass(ap);
			$pai.addClass(ap);
			$filho.addClass(af);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onAcord)) {
				o.onAcord.apply(this, new Array($acord, $pai, $filho, $o));
			}
				
			$(o.filho, $acord).not($filho).slideUp(o.tempoIn, o.easingIn);
			if (o.sempreUm) {
				$filho.slideDown(o.tempoOut, o.easingOut);
			}else{
				$filho.slideToggle(o.tempoIn, o.easingIn);
			}

			return false;
		};
			
	};

})(jQuery);
