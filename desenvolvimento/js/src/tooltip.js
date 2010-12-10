/**
 * Tooltip 1.3
 */
(function($){
	
	$.fn.tooltip = function(options){
		
		var padrao = {
			seletorImagem: 'imagem',					//Seletor para modo imagem
			seletorAjax: 'ajax',						//Seletor para modo Ajax
			
			classeArea: 'tooltip-area',					//Classe área para o tooltip
			classeConteudo: 'tooltip-conteudo',			//Classe base para o tooltip
			classeLoad: 'tooltip-load',					//Classe para animação de carregamento em Ajax
			classeSeta: 'tooltip-seta',					//Classe para a seta do tooltip
			classePrefixoPosicao: 'tooltip-posicao',	//Prefixo para a Classe da Posição  
			
			paddingTop: 0,								//Valor de padding(Top) para melhor manipulação (Afeta na posição do tooltip)
			paddingLeft: 0,								//Valor de padding(Left) para melhor manipulação (Afeta na posição do tooltip)
			posicao: 'top2',							//Posição para o tooltip || caso não tenha o padrão é top2
			fixado: true,								//Tooltip fixa(ou relativa) ao elemento?
			autoFix: true,								//Auto-fixação de posição
			tempo: 'fast',								//Tempo para exibir o tooltip, "slow", "normal", "fast" ou em milesegundos
			
			evento: 'mouseover', 						//Evento para disparar a exibição do tooltip
			eventoFim: 'mouseout', 						//Evento para terminar a exibição do tooltip
			
			atributo: 'rel',							//Atributo como base de conteúdo
			atributoAltura: 'altura',					//Atributo para definir altura personalizada ao tooltip
			atributoLargura: 'largura',					//Atributo para definir largura personalizada ao tooltip
			
			wrapperTooltip: null,						//Estrutura HTML para ser inserida ao redor(dentro) do tooltip 
				
			mensagemErro: 'Erro no tooltip',			//Mensagem alternativa para erro de carregamento (em ajax e imagens)
			
			onInicia: null,								//Callback
			onCria: null,	 							//Callback
			onPosiciona: null, 							//Callback
			onTermina: null								//Callback
		};
		var o = $.extend(padrao, options),
			tip = {},
			atual,
			$d = $(document),
			$w = $(window);
			
		/**
		 * Delegando eventos
		 * EVENTO INICIAL
		 */
		$d.delegate(this.selector, o.evento , function(e){
			return iniciaTooltip($(this), e);
		});
		
		/**
		 * EVENTO FINAL
		 */
		$d.delegate(this.selector, o.eventoFim , function(){
			removeTooltip($(this));
			
			/**
			 * Força remoção do tooltip
			 */
			var i = setInterval(function(){
				if($('.' + o.classeArea).length) $('.' + o.classeArea).remove();
				else clearInterval(i);
			}, 200);
			
		});
		
		/**
		 * Evento para fixado
		 * No caso MOUSEMOVE
		 */
		if (!o.fixado) {
			$d.delegate(this.selector, 'mousemove', function(e){
				return posicionaTooltip($(this), e);
			});
		}
		
		/**
		 * Fix de posição para window resize e scroll
		 */
		$w.resize(function(e){
			if(atual) return posicionaTooltip(atual, e);
		}).scroll(function(e){
			if(atual) return posicionaTooltip(atual, e);
		});
		
		/**
		 * Cria o tooltip de acordo com os dados passado no elemento que dispara o evento
		 * @param {Object} $t - elemento
		 * @param {Object} e - evento
		 */
		function iniciaTooltip($t, e){
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onInicia)){
				o.onInicia.apply($t, new Array($t, e, o));
			}
			
			atual = $t;
			tip.conteudo = tip.data = $t.attr(o.atributo), 
			tip.largura = $t.attr(o.atributoLargura),
			tip.altura = $t.attr(o.atributoAltura); 
			
			/**
			 * Checa se há conteúdo para a tooltip
			 */
			if(tip.conteudo == undefined) return;
			
			/**
			 * Se for title, exibe somente o tootip
			 */
			if(o.atributo == 'title'){
				$t.attr('title', '');
			}
			
			/**
			 * Cria o tooltip
			 */
			tip.area = $('<div/>')
				.addClass(o.classeArea)
				.css({
					display: 'none',
					position: 'absolute',
					width: tip.largura,
					height: tip.altura
				});
			
			tip.tip = $('<div/>')
				.addClass(o.classeConteudo)
				.appendTo(tip.area);
			
			/**
			 * Cria o loading
			 */
			tip.load = $('<div/>')
				.addClass(o.classeLoad)
				.css({
					display: 'none',
					position: 'fixed', 
					left: 0
				});
			
			/**
			 * Checa o loading
			 */
			if($t.hasClass(o.seletorImagem) || $t.hasClass(o.seletorAjax)){
				tip.load.appendTo('body').fadeIn(o.tempo);
				tip.load.css('top', $w.height() - tip.load.outerHeight());
			}
			
			/**
			 * Imagem
			 */
			if ($t.hasClass(o.seletorImagem)) {
				
				var img = new Image();
				$(img).load(function(){
					
					$(this).css({
						display: 'none',
						height: this.height,
						width: this.width
					});
					
					tip.data = this;
					$(this).fadeIn(o.tempo);

					return criaTooltip($t, e);
						
				}).attr('src', tip.conteudo);
					
				return;
			}
			
			/**
			 * Ajax
			 */
			else if ($t.hasClass(o.seletorAjax)) {
			
				$.ajax({
					type: "POST",
					url: tip.conteudo,
					success: function(data){
						tip.data = data;
						return criaTooltip($t, e);	
					},
					error: function() {
						tip.data = o.mensagemErro;
						return criaTooltip($t, e);
		   			}
		
				});

				return;
			}
			
			/**
			 * Normal
			 */
			else {
				return criaTooltip($t, e);
			}
		}
		
		/**
		 * "Cria" o tooltip, data o mesmo e exibe na tela
		 * @param {Object} $t - elemento
		 * @param {Object} e - evento
		 */
		function criaTooltip($t, e){
			
			tip.tip.html(tip.data).wrapInner(o.wrapperTooltip);
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onCria)){
				o.onCria.apply($t, new Array($t, tip, e, o));
			}
		
			if(tip.load.length){
				tip.load.fadeOut('fast', function(){
					$(this).remove();
				});
			}
			
			if(!tip.area) return false;
			tip.area.appendTo('body').fadeIn(o.tempo);
			
			return posicionaTooltip($t, e);
		}
		
		/**
		 * Remove o tooltip que está sendo exibido
		 * @param {Object} $t - elemento a ser removido
		 */
		function removeTooltip($t){

			/**
			 * Callback
			 */
			if ($.isFunction(o.onTermina)){
				o.onTermina.apply($t, new Array($t, o));
			}
			
			if(o.atributo == 'title'){
				$t.attr('title', tip.conteudo);
			}
			atual = null;
		
			if(tip.area.length)	tip.area.remove();
			tip.load.remove();
		}
		
		/**
		 * Posiciona o tooltip de acordo com o mouse ou com o elemento
		 * @param {Object} $t - elemento
		 * @param {Object} e - evento
		 */
		function posicionaTooltip($t ,e){

			/**
			 * Window
			 */
			var	ww = $w.width(),
			wh = $w.height(),
			wsl = $w.scrollLeft(),
			wst = $w.scrollTop(),
			
			/**
			 * Elemento
			 */
			w = $t.outerWidth(),
			h = $t.outerHeight(), 
			tpos = $t.offset(),
			left = tpos.left + o.paddingLeft,
			topo = tpos.top + o.paddingTop,
			
			/**
			 * Tooltip
			 */
			tipw = tip.area.outerWidth(),
			tiph = tip.area.outerHeight(), 
			
			/**
			 * Posições
			 */
			pos = o.posicao,
			y = topo,
			x = left,
			a = o.autoFix,
			c = o.classePrefixoPosicao;

			/**
			 * Forma a posição
			 * Define as posições e classe
			 * 1º define topo e depois left
			 * se tiver abilitado o autofix já faz na hora
			 */
			if(o.fixado){
				/**
				 * TOP
				 */
				switch(pos){
					case 'esquerda': case 'direita':
						if(a && (wst + wh) <= (topo + tiph/2 + 15)){
							y += -tiph - 10;
							c +='-rodape'; 
						}else if(a && (topo - wst) < (tiph/2 + 15)){
							y += h + 10;
							c +='-topo'; 
						}else{
							y += -(tiph/2) + (h/2);
							c +='-centro'; 
						}
					break;
					case 'top1': case 'top2': case 'top3': case 'top4': case 'top5':
						if(a && (topo - wst) < (tiph + 15)){
							y += h + 10;
							c +='-topo'; 
						}else{
							y += -tiph - 10;
							c +='-rodape'; 
						}
					break;
					case 'rod1': case 'rod2': case 'rod3': case 'rod4': case 'rod5':
						if(a && (wst + wh) <= (topo + tiph + 15)){
							y += -tiph - 10;
							c +='-rodape';
						}else{
							y += h + 10;
							c +='-topo'; 
						}
					break;	
				}
				
				/**
				 * LEFT
				 */
				switch(pos){
					case 'esquerda':
						if(a && left <= (tipw + 35)){
							x += w + 10;
							c +='-direita'; 
						}else{
							x += -tipw - 10;
							c +='-esquerda';
						}
					break;
					case 'direita':
						if(a && ww <= ( left + tipw + 35)){
							x += -tipw - 10;
							c +='-esquerda';
						}else{
							x += w + 10;
							c +='-direita';
						}
					break;
					case 'top1': case 'rod1':
						if(a && left <= (tipw + 30)){
							c +='-lateral-esquerda';
						}else{
							x += -tipw;
							c +='-esquerda';
						}
					break;
					case 'top2': case 'rod2':
						if(a && left <= (tipw / 2 + 30)){
							c +='-lateral-esquerda';
						}else if(a && ww <= ( left + tipw/2 + 30)){
							x += -tipw + w;
							c +='-lateral-direita';
						}else{
							x += (w/2) - (tipw/2);
							c +='-centro';
						}
					break;
					case 'top3': case 'rod3':
						if(a && ww <= ( left + tipw + 30)){
							x += -tipw + w;
							c +='-lateral-direita';
						}else{
							x += w;
							c +='-direita';
						}
					break;
					case 'top4': case 'rod4':
						if(a && ww <= ( left + tipw + 30)){
							x += -tipw + w;
							c +='-lateral-direita';
						}else{
							c +='-lateral-esquerda';
						}
					break;
					case 'top5': case 'rod5':
						if(a && left <= (tipw + 30)){
							c +='-lateral-esquerda';
						}else{
							x += -tipw + w;
							c +='-lateral-direita';
						}
					break;
					default:
						y += - tiph - 5 ,
						x += (w/2) - (tipw/2);
					break;
				}
	
			}
			else{
				/**
				 * TOP
				 */
				if((e.pageY - tiph - wst - 15) <=0){
					y = e.pageY + 15;
					c +='-rodape';
				}else{
					y = e.pageY - tiph - 15;
					c +='-topo';
				}
				/**
				 * LEFT
				 */
				if ((ww + wsl - e.pageX) <= tipw) {
					x = e.pageX - tipw - 15;
					c +='-lateral-esquerda';
				}else{
					x = e.pageX + 15;
					c +='-lateral-direita';
				}
			}
			
			/**
			 * Ajusta a posição
			 */
			tip.area.css({
				'top': y,
				'left': x
			});	
			
			/**
			 * Add a div da posição(seta)
			 * Preste atenção pois a classe é referente a seta, se a seta ta no rodape é classe é rodape...
			 */
			$('.'+o.classeSeta, tip.area).remove();
			tip.area.append('<div class="'+ o.classeSeta +'"><div class="'+c+'"></div></div>');
		
			/**
			 * Callback
			 */
			if ($.isFunction(o.onPosiciona)){
				o.onPosiciona.apply(tip.area, new Array($t, e, o));
			}
			
			e.preventDefault();
		}
	
	};
	
})(jQuery);
