/**
* @name				Linha Tooltip
* @version			1.2
* @descripton		Plugin Jquery para exibição de tooltips,
* 					Interações no modo texto(html) imagem(img) e ajax.
* 					Plugin extensível e customizável
*					MODO DE USAR $.tooltip({opcoes}); || $('.classeTal').tooltip({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   23/04/10 as 14:46 | nº 8
*/
(function($){
	
	$.fn.tooltip = function(options){
		return new $.tooltip(options, this);
	};
	
	$.tooltip = function(options, elem){
			
		var padrao = {
			
			seletor: '.tooltip',					//Seletor padrão caso não haja nenhum
			seletor_imagem: 'imagem',				//Seletor para modo imagem
			seletor_ajax: 'ajax',					//Seletor para modo Ajax
			
			classe_conteudo: 'tooltip-conteudo',	//Classe base para o tooltip
			classe_load: 'tooltip-load',			//Classe para animação de carregamento em Ajax
			
			padding_top: 0,							//Valor de padding(Top) para melhor manipulação (Afeta na posição do tooltip)
			padding_left: 0,						//Valor de padding(Left) para melhor manipulação (Afeta na posição do tooltip)
			posicao: '',							//Posição para o tooltip || caso não tenha o padrão é top2
			fixado: true,							//Tooltip fixa(ou relativa) ao elemento?
			autoFix: true,							//Auto-fixação de posição
			tempo: 'fast',							//Tempo para exibir o tooltip, "slow", "normal", "fast" ou em milesegundos
			
			evento: 'mouseover', 					//Evento para disparar a exibição do tooltip
			eventoFim: 'mouseout', 					//Evento para terminar a exbição do tooltip
			
			atributo: 'rel',						//Atributo como base de conteudo
			atributo_altura: 'altura',				//Atributo para definir altura personalizada ao tooltip
			atributo_largura: 'largura',			//Atributo para definir largura personalizada ao tooltip
			
			wrapper_tooltip: null,					//Estrutura HTML para ser inserida ao redor(dentro) do tooltip 
			
			mensagem_erro: 'Erro no tooltip',		//Mensagem alternativa para erro de carregamento (em ajax e imagens)
			
			onInicia: null,							//Callback
			onTermina: null							//Callback
		};
		var o = $.extend(padrao, options),
		//CACHE DOS ELEMENTOS
		tip = {},
		atual,
		d = $(document);
			
		if(elem === undefined){ elem = $(o.seletor);}
		
		//Adicionando Live Events com delegate
		d.delegate(elem.selector, o.evento , function(e){return criaTooltip($(this), e);});
		d.delegate(elem.selector, o.eventoFim , function(){return removeTooltip($(this));});
		if (!o.fixado) {
			d.delegate(elem.selector, 'mousemove', function(e){return posicionaTooltip($(this), e);});
		}
		
		//Fix de posição para window resize e scroll
		$(window).resize(function(e){
			if(atual){return posicionaTooltip(atual, e);}
		}).scroll(function(e){
			if(atual){return posicionaTooltip(atual, e);}
		});
		
		/**
		 * Cria o tooltip de acordo com os dados passado no elemento que dispara o evento
		 * @param {Object} t - elemento
		 * @param {Object} e - evento
		 */
		function criaTooltip(t, e){
			
			if ($.isFunction(o.onInicia)) {o.onInicia.apply(t);}
			
			atual = t;
			tip.conteudo = t.attr(o.atributo), 
			tip.largura = t.attr(o.atributo_largura),
			tip.altura = t.attr(o.atributo_altura); 

			//Se for title, exibe somente o tootip
			if(o.atributo == 'title'){
				t.attr('title', '');
			}
			
			tip.tip = $('<div></div>')
				.addClass(o.classe_conteudo)
				.css({
					display: 'none',
					position: 'absolute',
					width: tip.largura,
					height: tip.altura
				});
			
			tip.load = $('<div></div>')
				.addClass(o.classe_load)
				.css({
					display: 'none',
					position: 'fixed', 
					left: 0
				});

			//Checa se há conteúdo para a tooltip
			if(tip.conteudo === undefined){ return;}
			
			//Imagem
			if (t.hasClass(o.seletor_imagem)) {
				
				tip.load.appendTo('body').fadeIn(o.tempo);
				tip.load.css({ top: $(window).height() - tip.load.outerHeight()});
				
				var img = new Image();
				$(img).load(function(){
					
					$(this).css({
						display: 'none',
						height: this.height,
						width: this.width
					});
					
					tip.tip.html(this).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn(o.tempo);
					tip.load.remove();

					$(this).fadeIn(o.tempo);

					return posicionaTooltip(t, e);
						
				}).attr('src', tip.conteudo);
					
				return;
			}
				
			//Ajax
			if (t.hasClass(o.seletor_ajax)) {
			
				tip.load.appendTo('body').fadeIn(o.tempo);
				tip.load.css({ top: $(window).height() - tip.load.outerHeight()});
				
				$.ajax({
					type: "POST",
					url: tip.conteudo,
					success: function(data){
						tip.tip.html(data).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn(o.tempo);
						tip.load.fadeOut('fast', function(){
							$(this).remove();
						});
						return posicionaTooltip(t, e);	
					},
					error: function() {
						tip.tip.html(o.mensagem_erro).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn(o.tempo);
						tip.load.fadeOut('fast', function(){
							$(this).remove();
						});
						return posicionaTooltip(t, e);
		   			}
		
				});

				return;
			}
				
			//Normal
			else {
				tip.tip.html(tip.conteudo).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn(o.tempo);
				return posicionaTooltip(t, e);
			}
		}
		
		/**
		 * Remove o tooltip que está sendo exibido
		 * @param {Object} t - elemento a ser removido
		 */
		function removeTooltip(t){

			if ($.isFunction(o.onTermina)) {o.onTermina.apply(t);}
			
			if(o.atributo == 'title'){
				t.attr('title', tip.conteudo);
			}
			atual = null;
			
			tip.tip.remove();
			$('.' + o.classe_conteudo).remove(); //remove o elemento novamente...estranho não? :)
			tip.load.remove();
			
		}
		
		/**
		 * Posiciona o tooltip de acordo com o mouse ou com o elemento
		 * @param {Object} t - elemento
		 * @param {Object} e - evento
		 */
		function posicionaTooltip(t ,e){

			var	ww = $(window).width(),
			wh = $(window).height(),
			wsl = $(window).scrollLeft(),
			wst = $(window).scrollTop(),
			//Elemento
			w = t.outerWidth(),
			h = t.outerHeight(), 
			pos = t.offset(),
			left = pos.left + o.padding_left,
			topo = pos.top + o.padding_top,
			//Tooltip
			tipw = tip.tip.outerWidth(),
			tiph = tip.tip.outerHeight(); 
			
			if(o.fixado){
				switch(o.posicao){
					case 'top1':
						var posY = topo - tiph - 5,
							posX = left - tipw;
					break;
					case 'top2':
						var posY = topo - tiph - 5 ,
							posX = left + (w/2) - (tipw/2);
					break;
					case 'top3':
						var posY = topo - tiph - 5 ,
							posX = left + w;
					break;
					case 'top4':
						var posY = topo - tiph - 5 ,
							posX = left;
					break;
					case 'top5':
						var posY = topo - tiph - 5 ,
							posX = left - tipw + w;
					break;
					case 'esquerda':
						var posY = topo - (tiph/2) + (h/2),
							posX = left - tipw - 5;
					break;
					case 'direita':
						var posY = topo - (tiph/2) + (h/2),
							posX = left + w + 5;
					break;
					case 'rod1':
						var posY = topo + h + 5 ,
							posX = left - tipw;
					break;
					case 'rod2':
						var posY = topo + h + 5 ,
							posX = left + (w/2) - (tipw/2);
					break;
					case 'rod3':
						var posY = topo + h + 5 ,
							posX = left + w;
					break;
					case 'rod4':
						var posY = topo + h + 5 ,
							posX = left;
					break;
					case 'rod5':
						var posY = topo + h + 5 ,
							posX = left - tipw + w;
					break;
					default:
						var posY = topo - tiph - 5 ,
							posX = left + (w/2) - (tipw/2);
					break;
				}
	
			}
			else{
				//top
				if((e.pageY - tiph - wst - 15) <=0){
					var posY = e.pageY + 15;
				}else{
					var posY = e.pageY - tiph - 15;
				}
				//left
				if ((ww + wsl - e.pageX) <= tipw) {
					var posX = e.pageX - tipw - 15;
				}else{
					var posX = e.pageX + 15;
				}
			}
			
			tip.tip.css({
				'top': posY,
				'left': posX
			});	
			
			//AUTO_FIXAÇÂO
			if(o.fixado && o.autoFix){
				if(o.posicao == 'top1' || o.posicao == 'top5' || o.posicao == 'rod1' || o.posicao == 'rod5'){
					if(left <= (tipw + 30)){
						tip.tip.css({'left': left});
					}
				}
				if(o.posicao == 'top3' || o.posicao == 'top4' || o.posicao == 'rod3' || o.posicao == 'rod4'){
					if(ww <= ( left + tipw + 30)){
						tip.tip.css({'left': left - tipw + w});
					}
				}
				if(o.posicao == 'top2' || o.posicao == 'rod2'){
					if(left <= (tipw / 2 + 30)){
						tip.tip.css({'left': left});
					}
					if(ww <= ( left + tipw/2 + 30)){
						tip.tip.css({'left': left - tipw + w});
					}
				}
				if(o.posicao == 'esquerda'){
					if(left <= (tipw + 30)){
						tip.tip.css({'left': left + w + 5});
					}
					
				}
				if(o.posicao == 'direita'){
					if(ww <= ( left + tipw + 30)){
						tip.tip.css({'left': left - tipw});
					}
					
				}
				
				if(o.posicao == 'direita' || o.posicao == 'esquerda'){
					if((wst + wh) <= (topo + tiph/2 + 10)){
						tip.tip.css({'top': topo - tiph - 5});
					}
					if((topo - wst) < (tiph/2 + 10)){
						tip.tip.css({'top': topo + h + 5});
					}
				}else{
					if((wst + wh) <= (topo + tiph + 10)){
						tip.tip.css({'top': topo - tiph - 5});
					}
					if((topo - wst) < (tiph + 10)){
						tip.tip.css({'top': topo + h + 5});
					}
				}
			}
			
			e.preventDefault();
		}
	
	};
	
})(jQuery);
