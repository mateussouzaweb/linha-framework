/**
 * Acord 1.2
 */
(function($){

	$.fn.acord = function(options){
		
		var padrao = {
			pai: 'h2',											//Seletor pai, ou cabeçalho, header...
			filho: 'div',										//Seletor filho, este é o que ficará escondido
				
			classePai: 'acord-pai-atual', 						//Classe para pai que está em foque | Adicionado pelo plugin
			classeFilho: 'acord-filho-atual',					//Classe para o filho que esta visível | Adicionado pelo plugin
				
			classeAjax: 'ajax',									//Classe para accordions em ajax
			atributoUrl: 'url',									//Atributo para url do accordion em ajax
				
			evento: 'click',									//Evento para disparar o efeito accordion
				
			inicial: 1, 										//Define o acordion que será exibido inicialmente ou default
			sempreUm: true,										//Deixar sempre exibindo um seletor filho no accordion?
			autoHeight: false,									//Ajustar automaticamente a altura dos elementos filho?
			tempoIn: 'normal',									//Tempo para esconder o seletor filho (Entrada)
			tempoOut: 'normal',									//Tempo para mostrar o seletor filho (Saída)
			easingIn: 'swing',									//Animação com easing na entrada (IN)...
			easingOut: 'swing',									//Animação com easing na saída (OUT)...
				
			onAcord: null, 										//Callback
				
			live: false,										//Abilitar o monitoramento live
			liveTempo: 150										//Tempo entra cada checagem, em milisegundos
		};	
		
		var o = $.extend(padrao, options),
			s = this.selector,
			p = o.classePai,
			f = o.classeFilho,
			elems = [];

		/**
		 * Delegando eventos....o resultado seria o mesmo que each
		 * Usado para registro em accordions futuros
		 */
		$(document).delegate(s, 'iniciaAcord', function(){
			
			var	nEls = $(s).not(elems);
				elems = $(s);
				
			/**
			 * Retorna o processamento dos elementos q passaram
			 */
			nEls.each(function() {
				var $t = $(this),
					$f = $(this).find(o.filho);
				
				/**
				 * Fix para erros de animação
				 */
				$f.each(function(){
					$(this).css('height', $(this).height() + 'px').hide();
				});
				
				if(o.sempreUm){
					$f.eq(o.inicial - 1).addClass(f).show().prev(o.pai).addClass(p);
				}
				
				/**
				 * Altura automática
				 */
				if(o.autoHeight){
					var h = 0; 
					$f.each(function(){
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
				if(o.sempreUm && $('.'+p, this).hasClass(o.classeAjax)){
					$('.'+p, this).trigger(o.evento);
				}
			});
			
		});
		
		/**
		 * Trigger inicial e monitoramento DOM
		 */
		if(o.live){
			setInterval(function(){
				$(s).trigger('iniciaAcord');
			}, o.liveTempo);
		}else{
			if(this.length){this.trigger('iniciaAcord');}
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
			 * Ajuste de altura - height
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
			
			$('.'+f, $acord).removeClass(f);
			$('.'+p, $acord).removeClass(p);
			$pai.addClass(p);
			$filho.addClass(f);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onAcord)) {
				o.onAcord.apply($acord, new Array($acord, $pai, $filho, o));
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
