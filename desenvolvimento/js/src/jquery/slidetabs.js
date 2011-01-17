/**
 * Slidetabs 1.2
 */
(function($){
	
	$.fn.slideTabs = function(options){
			
		var padrao = {
			seletorAreaPainel: '.slide-conteudo',				//Seletor para área do painel..necessário para wrapInner()
			seletorPainel:	'.painel',							//Seletor para o painel ou os slides
			seletorMiniatura: '.miniatura',						//Seletor de miniaturas
			seletorAnterior: '.anterior',						//Seletor botão anterior
			seletorProximo: '.proximo',							//Seletor botão proximo
			
			classeMiniatura: 'slide-miniatura-atual', 			//Classe para a miniatura atual | Classe adicionada pelo plugin
			classePainel: 'slide-painel-atual',					//Classe para o painel atual | Classe adicionada pelo plugin
			classePainelPrimeiro: 'slide-painel-primeiro',		//Classe para o primeiro painel | Classe adicionada pelo plugin
			classePainelUltimo: 'slide-painel-ultimo',			//Classe para o ultimo painel | Classe adicionada pelo plugin
			classePainelConteudo: 'slide-painel-conteudo',		//Classe para "cercar" os painel do plugin | Classe adicionada pelo plugin
			
			eventoMiniatura: 'click',							//Evento para disparar o plugin nas miniaturas
			eventoSeta: 'click',								//Evento para disparar o plugin não botões/setas próximo e anterior

			hash: false,										//Habilitar navegação via hash? 
			hashPrefixo: 'slide-',								//Hash slide apresenta algums problemas, com hashPrefixo você ajusta esses problemas facilmente (Veja documentação)
			
			inicial: 1,											//Slide inicial | Se hash = true haverá alteração automática
			continuo: true, 									//Quando chega no ultimo o proximo será o 1º?
			
			auto: false, 										//Troca de slide automaticamente?
			pausarAuto: true,									//Pausa a troca de slides automática quando o slide está no estado hover
			pausa: 2000, 										//Tempo entre cada pausa para o slide automático
			
			tempo: 'normal',									//Tempo para cada transicão / 0(Zero) para sem animação
			easing: 'swing',									//Animação com easyng na entrada (IN)...
			
			alturaAutomatica: false,							//Ajustar automaticamente a altura do slide, caso false ficará com o tamanho especificado no css ou no painel maior
			margin: true,										//Considerar a margin juntamente com o tamanho do elemento
			
			scroll: 1,											//Nº de elementos que serão arastados
			visiveis: 1,										//Nº de elementos visiveis
			direcao: 'x',										//Direção para o slide, X(horizontal) ou Y(vertical)
				
			onSlide: null,										//Callback
			
			live: false,										//Abilitar o monitoramento live
			liveTempo: 100										//Tempo entra cada checagem, em milisegundos
			
		};
		var o = $.extend(padrao, options),
			s = this.selector,
			hash = window.location.hash,
			elems = [];
		
		if(hash != '') hash = '#'+ o.hashPrefixo+ hash.substr(1);

		/**
		 * Delegando evento inicial para SlideTabs
		 */
		$(document).delegate(s, 'iniciaSlideTabs', function(){
			
			var	nEls = $(s).not(elems);
			elems = $(s);
			
			/**
			 * Processamento dos elementos q passaram
			 */
			nEls.each(function(){

				var $t = $(this),
					$sp = $(o.seletorPainel, $t),
					$sm = $(o.seletorMiniatura, $t), 
					sma = o.classeMiniatura,
					spa = o.classePainel,
					spp = o.classePainelPrimeiro,
					spu = o.classePainelUltimo,
					spcw = 0,
					ini = o.inicial - 1,
					timeout,
					dir = o.direcao == 'x',
					pos = {};
				
				/**
				 * Faz o Wrapper
				 */
				$t.children(o.seletorAreaPainel).wrapInner('<div class="'+ o.classePainelConteudo +'"></div>');
				
				/**
				 * Seta esta variável agora porque senão vai retornar nada...
				 */
				var $spc = $('.'+o.classePainelConteudo, $t);
				
				/**
				 * Faz o width ou height da area do painel
				 */
				$sp.each(function(i){
					pos[i] = spcw;
					spcw += $(this)[dir ? 'outerWidth' : 'outerHeight'](o.margin);
				});	
				$spc.css(dir ? 'width' : 'height', spcw).css('overflow','hidden');
				
				/**
				 * Posição Inicial
				 * + Classes
				 * e Classes Inicial e Último 
				 */
				$spc.css(dir ? 'marginLeft' : 'marginTop', -pos[ini]);
				if (o.alturaAutomatica && dir) {
					$spc.css('height', ($sp.eq(ini).outerHeight(o.margin))); //altura inicial
				}
				$sp.eq(ini).addClass(spa);
				$sm.eq(ini).addClass(sma);
				
				if(ini == 0){ $sp.eq(0).addClass(spp);}
				if(ini == $sp.length - 1){$sp.eq(-1).addClass(spu);}
				
				/**
				 * EVENTO Miniatura
				 */
				$sm.bind(o.eventoMiniatura, function(){
					
					var l = $(this).prevAll(o.seletorMiniatura).length;
					
					/**
					 * Remove as classes
					 */
					$sm.removeClass(sma);
					$sp.removeClass(spa).removeClass(spp).removeClass(spu);
					
					/**
					 * Adiciona as classes
					 */
					$(this).addClass(sma);
					$sp.eq(l).addClass(spa);
					
					if(l == 0) $sp.eq(0).addClass(spp);
					if(l == $sp.length - 1) $sp.eq(-1).addClass(spu);
					
					/**
					 * Altera o hash, se tiver
					 */
					if(this.hash) window.location.hash = this.hash;
					
					return animaSlide($(this), l);
				});
				
				/**
				 * EVENTO Seta Anterior
				 */
				$(o.seletorAnterior, $t).bind(o.eventoSeta, function(){
					
					var l = $('.'+ spa, $t).prevAll().length - o.scroll;
					$sp.removeClass(spu);

					if(l <= 0){

						if($sp.eq(0).hasClass(spp)){
							$sp.removeClass(spp);
							if (o.continuo) {l = $sp.length - o.visiveis; $sp.eq(-1).addClass(spu);}
							else {return false;	}
						}else{
							l = 0;
							$sp.eq(0).addClass(spp);
						} 
					}

					/**
					 * Remove e Add as Classes
					 */	
					$sp.removeClass(spa).eq(l).addClass(spa);
					$sm.removeClass(sma).eq(l).addClass(sma);
					
					/**
					 * Altera o hash, se tiver
					 */
					if(this.hash) window.location.hash = this.hash;
					
					return animaSlide($(this), l);
				});
				
				/**
				 * EVENTO Seta Proximo
				 * Retorna a função proximo slide, é necessário pois o mesmo processo usado aqui
				 * é usado na transição automática
				 */
				$(o.seletorProximo, $t).bind(o.eventoSeta, function(){
					
					/**
					 * Altera o hash, se tiver
					 */
					if(this.hash) window.location.hash = this.hash;
					
					return proximoSlide($(this)); 
				});
				
				/**
				 * Faz a checagem para pausar a troca automática de slides
				 */
				if(o.auto && o.pausarAuto){
					$t.hover(function(){
						$(this).data('slideHover', '1');
					}, function(){
						$(this).removeData('slideHover');
					});
				}
				
				/**
				 * Vai para o próximo slide
				 * @param $this -  se tiver um seletor para passar é bom ^^
				 */
				function proximoSlide($this){
					
					var l = $('.'+ spa, $t).prevAll().length + o.scroll;
					$sp.removeClass(spp);
					
					if(($sp.length - l) <= o.visiveis) {						

						if($sp.eq(-1).hasClass(spu)){
							$sp.removeClass(spu);
							if (o.continuo) {l = 0; $sp.eq(0).addClass(spp);}
							else {return false;	}
						} 
						else {
							l = $sp.length - o.visiveis;
							$sp.eq(-1).addClass(spu);
						}

					}
					
					/**
					 * Remove e Add as Classes
					 */
					$sp.removeClass(spa).eq(l).addClass(spa);
					$sm.removeClass(sma).eq(l).addClass(sma);
						
					return animaSlide($this, l);
				}
				
				/**
				 * Animar o slide atual
				 * @param {Object} $this - Elemento que disparou o animaSlide
				 * @param int l - Numero do slide alvo...rsrs
				 * @return boolean false
				 */
				function animaSlide($this, l){

					/**
					 * Callback
					 */
					if ($.isFunction(o.onSlide)) {
						o.onSlide.apply($t, new Array($t, $this, pos, l, o));
					}
					
					/**
					 * Ajusta a Altura automática, se abilitada
					 */
					var	h = $spc.height();
					if(o.alturaAutomatica && dir){
						h = $sp.eq(l).outerHeight();
					}
					
					/**
					 * Finalmente Anima
					 */
					var ani = {};
					ani[dir ? 'marginLeft' : 'marginTop'] = -pos[l] + 'px';
					ani['height'] = h;
					
					$spc.animate(ani, o.tempo, o.easing);
										
					/**
					 * AUTOMÁTICO
					 */
					clearInterval(timeout);
					if(o.auto){
						timeout = setInterval(function(){
							if(o.pausarAuto && $t.data('slideHover')) return false;
		
							return proximoSlide(null);
						},o.pausa);
					}

				return false;
				}
				
				/**
				 * AUTOMÁTICO
				 */
				if(o.auto){
					timeout = setInterval(function(){
						return proximoSlide(null);
					},o.pausa);
				};
				
			});
		
		});
		
		/**
		 * Hash navigation
		 * Usa o parâmetro o.inicial
		 */
		if(o.hash && hash != '' && $(hash).is(o.seletorPainel)){
			o.inicial = ($(hash).prevAll(o.seletorPainel).length) + 1;
		}
			
		/**
		 * Trigger inicial e monitoramento DOM
		 */
		if(o.live){
			setInterval(function(){
				$(s).trigger('iniciaSlideTabs');
			}, o.liveTempo);
		}else{
			if(this.length) this.trigger('iniciaSlideTabs');
		}
		
	};
	
})(jQuery);
