/**
* @name				Linha slideTabs
* @version			1.0
* @descripton		Plugin Jquery para desenvolvimento de slides, sliders(ou carousels), slideshow, e tabs
* 					com troca automática e animada(opicional).
* 					Plugin extensível e customizável
*					MODO DE USAR $.slideTabs({opcoes}); || $('.classeTal').slideTabs({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 9:47 | nº 4
*/
(function($){

	$.fn.slideTabs = function(options){
		return new $.slideTabs(options, this);
	};
	
	$.slideTabs = function(options, elem){
			
		var padrao = {
			seletor: '.slide',									//Seletor padrão/geral
			seletor_area_painel: '.slide-conteudo',				//Seletor para área do painel..necessário para wrapInner()
			seletor_painel:	'.painel',							//Seletor para o painel ou os slides
			seletor_miniatura: '.miniatura',					//Seletor de miniaturas
			seletor_anterior: '.anterior',						//Seletor botão anterior
			seletor_proximo: '.proximo',						//Seletor botão proximo
			
			classe_miniatura_atual: 'slide-miniatura-atual', 	//Classe para a miniatura atual | Classe adicionada pelo plugin
			classe_painel_atual: 'slide-painel-atual',			//Classe para o painel atual | Classe adicionada pelo plugin
			classe_painel_primeiro: 'slide-painel-primeiro',	//Classe para o primeiro painel | Classe adicionada pelo plugin
			classe_painel_ultimo: 'slide-painel-ultimo',		//Classe para o ultimo painel | Classe adicionada pelo plugin
			classe_painel_conteudo: 'slide-painel-conteudo',	//Classe para "cercar" os painel do plugin | Classe adicionada pelo plugin
			
			evento_miniatura: 'click',							//Evento para disparar o plugin nas miniaturas
			evento_setas: 'click',								//Evento para disparar o plugin não botões próximo e anterior
			
			inicial: 1,											//Slide inicial
			auto: true, 										//Troca de slide automaticamente?
			pausa: 2000, 										//Tempo entre cada pausa para o slide automático
			continuo: true, 									//Quando chega no ultimo o proximo será o 1º?
			tempo: 'slow',										//Tempo para cada transicão / 0(Zero) para sem animação

			altura_automatica: false,							//Ajustar automaticamente a altura do slide, caso false ficará com o tamanho especificado no css ou no painel maior
			margin: true,										//Considerar a margin juntamente com o tamanho do elemento
			scroll: 1,											//Nº de elementos que serão arastados
			visiveis: 1,										//Nº de elementos visiveis
			fade: false,										//true - efeito fade | false - efeito slide
				
			onSlide: null										//Callback
		};
		var o = $.extend(padrao, options);
			
		if(elem === undefined){ elem = $(o.seletor);}
		
		return elem.each(function(){
				
			var t = $(this),
				sp = $(o.seletor_painel, t),
				sm = $(o.seletor_miniatura, t), 
				sma = o.classe_miniatura_atual,
				spa = o.classe_painel_atual,
				spp = o.classe_painel_primeiro,
				spu = o.classe_painel_ultimo,
				spcw = 0,
				pos = new Array();
				
			t.children(o.seletor_area_painel).wrapInner('<div class="'+o.classe_painel_conteudo+'"></div>');
			
			sp.each(function(i){
				pos[i] = spcw;
				spcw += $(this).outerWidth(o.margin);
			});	

			var spc = $('.'+o.classe_painel_conteudo, t);
			spc.css({ 'width': spcw,'overflow': 'hidden'});
			
			//Posicao inicial
			spc.css({'marginLeft': -pos[o.inicial - 1] + 'px'});
			if (o.altura_automatica) {
				spc.css({'height': (sp.eq(o.inicial - 1).outerHeight()) + 'px' }); //altura inicial
			}
			sp.eq(o.inicial - 1).addClass(spa);
			sm.eq(o.inicial - 1).addClass(sma);
			if(o.inicial == 1){ sp.eq(0).addClass(spp);}
			if(o.inicial == sp.length){sp.eq(sp.length - 1).addClass(spu);}

			//EVENTOS
			sm.bind(o.evento_miniatura, function(){
				
				var l = $(this).prevAll().length;
					
				sm.removeClass(sma);
				$(this).addClass(sma);
				sp.removeClass(spa).removeClass(spp).removeClass(spu).eq(l).addClass(spa);
					
				if(l == 0){ sp.eq(0).addClass(spp);}
				if(l == sp.length - 1){sp.eq(sp.length - 1).addClass(spu);}
					
				return animaSlide(l);
					
			});

			$(o.seletor_anterior, t).bind(o.evento_setas, function(){
					
				var l = $('.'+ spa, t).prevAll().length - (Math.abs(o.scroll));
				sp.removeClass(spu);
					
				if(l <= 0){
						
					if(sp.eq(0).hasClass(spp)){
						sp.removeClass(spp);
						if (o.continuo) {l = sp.length - o.visiveis; sp.eq(sp.length - 1).addClass(spu);}
						else {return false;	}
					}else{
						l = 0;
						sp.eq(0).addClass(spp);
					} 
				}
					
				sp.removeClass(spa).eq(l).addClass(spa);
				sm.removeClass(sma).eq(l).addClass(sma);
					
				return animaSlide(l);

			});
				
			$(o.seletor_proximo, t).bind(o.evento_setas, function(){
				return proximoSlide();
			});
			
			
			//FUNÇÔES	
			function proximoSlide(){
					
				var l = $('.'+ spa, t).prevAll().length + o.scroll;
				sp.removeClass(spp);
				
				if ((sp.length - l) <= o.visiveis) {						

					if(sp.eq(sp.length - 1).hasClass(spu)){
						sp.removeClass(spu);
						if (o.continuo) {l = 0; sp.eq(0).addClass(spp);}
						else {return false;	}
					} 
					else {
						l = sp.length - o.visiveis;
						sp.eq(sp.length - 1).addClass(spu);
					}

				}
				sp.removeClass(spa).eq(l).addClass(spa);
				sm.removeClass(sma).eq(l).addClass(sma);
					
				return animaSlide(l);
					
			};	
				
			function animaSlide(l){
				
				if ($.isFunction(o.onSlide)) {o.onSlide.apply(t);}
					
				var h = spc.height();
				if(o.altura_automatica){
					h = sp.eq(l).outerHeight();
				}
				
				if(o.fade){
					spc.fadeOut(o.tempo, function(){$(this).css({'marginLeft': -pos[l] + 'px','height': h });}).fadeIn(o.tempo);
				}else{
					spc.animate({
						marginLeft: -pos[l] + 'px',
						height: h
					}, o.tempo);
				};
					
				//Automático
				clearInterval(timeout);
				if(o.auto){
					timeout = setInterval(function(){
						proximoSlide();
					},o.pausa);
				}
					
				
				return false;
			};
				
			//Automático
			var timeout;
			if(o.auto){
				timeout = setInterval(function(){
					proximoSlide();
				},o.pausa);
			};
				
		});
	};
	
})(jQuery);
