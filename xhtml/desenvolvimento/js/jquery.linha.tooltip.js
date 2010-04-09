/**
* @name				Linha Tooltip
* @version			1.1
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
* @ultima-revisao   09/04/10 as 18:35 | nº 7
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
			
			evento: 'mouseover', 					//Evento para disparar a exibição do tooltip
			eventoFim: 'mouseout', 					//Evento para terminar a exbição do tooltip
			
			atributo: 'rel',						//Atributo como base de conteudo
			atributo_altura: 'altura',				//Atributo para definir altura personalizada ao tooltip
			atributo_largura: 'largura',			//Atributo para definir largura personalizada ao tooltip
			
			wrapper_tooltip: null,					//Estrutura HTML para ser inserida ao redor(dentro) do tooltip 
			
			onInicia: null,							//Callback
			onTermina: null							//Callback
		};
		var o = $.extend(padrao, options);
		
		//CACHE DOS ELEMENTOS
		var tip = new Array();	//tooltip
			
		if(elem === undefined){ elem = $(o.seletor);}
		
		return elem.each(function(){
			
			var t = $(this);
			
			if(o.evento){
				t.bind(o.evento, function(e){return criaTooltip(t, e);});
			}
			
			if (!o.fixado) {
				t.mousemove(function(e){return posicionaTooltip(t, e);});
			}
			
			if(o.eventoFim){
				t.bind(o.eventoFim, function(){return removeTooltip(t);});
			}
			
		}); //fim element each
		
		function criaTooltip(t, e){
			
			if ($.isFunction(o.onInicia)) {o.onInicia.apply(t);}
			
			tip['conteudo'] = t.attr(o.atributo), 
			tip['largura'] = t.attr(o.atributo_largura),
			tip['altura'] = t.attr(o.atributo_altura), 
			tip['continua'] = true;
		
			//Se for title, exibe somente o tootip
			if(o.atributo == 'title'){
				t.attr('title', '');
			}
			
			tip['tip'] = $('<div></div>')
				.addClass(o.classe_conteudo)
				.css({
					display: 'none',
					position: 'absolute',
					width: tip['largura'],
					height: tip['altura']
				});
			
			tip['load'] = $('<div></div>')
				.addClass(o.classe_load)
				.css({
					display: 'none',
					position: 'fixed', 
					left: 0
				});
				//.wrapInner(o.wrapper_tooltip)
			//Formação de conteúdo
			if (tip['conteudo'] !== undefined) {
				
				//Imagem
				if (t.hasClass(o.seletor_imagem)) {
					
					tip['load'].appendTo('body').fadeIn();
					tip['load'].css({ top: $(window).height() - tip['load'].outerHeight()});
					
					var img = new Image();
					$(img).load(function(){
						
						$(this).css({
							display: 'none',
							height: this.height,
							width: this.width
						});
						
						if (tip['continua']) { //Checa se pe pra continuar
						
							tip['tip'].html(this).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn('slow');
							tip['load'].remove();

							$(this).fadeIn();
						}

						return posicionaTooltip(t, e);
						
					}).attr('src', tip['conteudo']);
					
					return false;
				}
				
				//Ajax
				if (t.hasClass(o.seletor_ajax)) {
				
					tip['load'].appendTo('body').fadeIn();
					tip['load'].css({ top: $(window).height() - tip['load'].outerHeight()});
					
					$.ajax({
						type: "POST",
						url: tip['conteudo'],
						success: function(data){
							if (tip['continua']) { //Checa se pe pra continuar
								tip['tip'].html(data).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn('slow');
								tip['load'].fadeOut('fast', function(){
									$(this).remove();
								});
							};
							return posicionaTooltip(t, e);	
						},
						error: function() {
							if (tip['continua']) { //Checa se pe pra continuar
								tip['tip'].html("Ocorreu algum erro ou esta url não existe...").wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn('slow');
								tip['load'].fadeOut('fast', function(){
									$(this).remove();
								});
							}
							return posicionaTooltip(t, e);
			   			}
			
					});

					return false;
					
				}
				
				//Normal
				else {
					tip['tip'].html(tip['conteudo']).wrapInner(o.wrapper_tooltip).appendTo('body').fadeIn('slow');
					return posicionaTooltip(t, e);
				}
				
			}
		}
		
		function removeTooltip(t){
			
			if ($.isFunction(o.onTermina)) {o.onTermina.apply(t);}
			
			if(o.atributo == 'title'){
				t.attr('title', tip['conteudo']);
			}
			
			tip['continua'] = false;
			tip['tip'].remove();
			$('.' + o.classe_conteudo).remove();
			tip['load'].remove();
			
		}
		
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
			tipw = tip['tip'].outerWidth(),
			tiph = tip['tip'].outerHeight(); 
			
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
						var posY = topo - tiph - 15 ,
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
			
			tip['tip'].css({
				'top': posY,
				'left': posX
			});	
			
			//AUTO_FIXAÇÂO
			if(o.fixado && o.autoFix){
				if(o.posicao == 'top1' || o.posicao == 'top5' || o.posicao == 'rod1' || o.posicao == 'rod5'){
					if(left <= (tipw + 30)){
						tip['tip'].css({'left': left});
					}
				}
				if(o.posicao == 'top3' || o.posicao == 'top4' || o.posicao == 'rod3' || o.posicao == 'rod4'){
					if(ww <= ( left + tipw + 30)){
						tip['tip'].css({'left': left - tipw + w});
					}
				}
				if(o.posicao == 'top2' || o.posicao == 'rod2'){
					if(left <= (tipw / 2 + 30)){
						tip['tip'].css({'left': left});
					}
					if(ww <= ( left + tipw/2 + 30)){
						tip['tip'].css({'left': left - tipw + w});
					}
				}
				if(o.posicao == 'esquerda'){
					if(left <= (tipw + 30)){
						tip['tip'].css({'left': left + w + 5});
					}
					
				}
				if(o.posicao == 'direita'){
					if(ww <= ( left + tipw + 30)){
						tip['tip'].css({'left': left - tipw});
					}
					
				}
				
				if(o.posicao == 'direita' || o.posicao == 'esquerda'){
					if((wst + wh) <= (topo + tiph/2 + 10)){
						tip['tip'].css({'top': topo - tiph - 5});
					}
					if((topo - wst) < (tiph/2 + 10)){
						tip['tip'].css({'top': topo + h + 5});
					}
				}else{
					if((wst + wh) <= (topo + tiph + 10)){
						tip['tip'].css({'top': topo - tiph - 5});
					}
					if((topo - wst) < (tiph + 10)){
						tip['tip'].css({'top': topo + h + 5});
					}
				}
			}
			
			e.preventDefault();
		
		}
	
	};
	
})(jQuery);
