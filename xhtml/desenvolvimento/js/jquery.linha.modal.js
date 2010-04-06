/**
* @name				Linha Modal
* @version			1.0
* @descripton		Plugin Jquery para desenvolvimento de popups, modal em websites, sistemas
* 					Plugin extensível e customizável
*					MODO DE USAR $.modal({opcoes}); || $('.classeTal').modal({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 10:00 | nº 5
*/
(function($){
	
	$.fn.modal = function(options){
		return new $.modal(options, this);
	};
	
	$.modal = function(options, elem){
			
		var padrao = {
			seletor: '.modal',								//Seletor padrão/geral
			classe_modal: 'modal-area',						//Classe para o modal
			classe_titulo:	'modal-titulo',					//Classe para títulos na janela modal
			classe_conteudo: 'modal-conteudo',				//Classe para conteudo da janela modal
			classe_fecha: 'modal-fecha',					//Classe para fechar o modal
			classe_load: 'modal-load',						//Classe para load em requisições ajax
			
			classe_imagem: 'imagem',						//Classe para modals com imagem
			classe_ajax: 'ajax',							//Classe para modals em ajax
			classe_iframe: 'iframe',						//Classe para modals com iframe
			classe_video: 'video',							//Classe para modals com video(youtube e relacionados)
			classe_cancela: 'fecha',						//Classe que cancelar a requisição || o resultado é mesmo que fechar o dialogo
			classe_confirma: 'confirma',					//Classe que confirma a ação
	
			classe_fundo: 'modal-fundo',					//Classe para fundo modal
			fundo_opacidade: 0.7,							//Nível de transparência/opaticidade do fundo modal
			fundo: true,									//True para criar o fundo semitransparente para foco
			fecha: true,									//Ao clicar no fundo fecha o modal?

			zIndex: 1000,									//Z-index modal
			tempo: 'fast',									//Tempo para fade
			titulo: null,									//Criar um titulo comum para todos os modals
			conteudo: null,									//Criar um conteudo comum para todos os modals
			conteudo_antes: false,							//Inserir conteúdo antes
				
			atributo_titulo: 'titulo',						//Atributo para título modal
			atributo_conteudo: 'conteudo',					//Atributo para conteudo modal
			atributo_altura: 'altura',						//Atributo para altura modal
			atributo_largura: 'largura',					//Atributo para largura modal
			atributo_iframe_largura: 'iframelargura',		//Atributo para largura do iframe no modal
			atributo_iframe_altura: 'iframealtura',			//Atributo para altura do iframe no modal
			atributo_video_largura: 'videolargura',			//Atributo para largura do video no modal
			atributo_video_altura: 'videoaltura',			//Atributo para altura do video no modal
		
			onShow: null,									//Callback
			onHide: null, 									//Callback
			onConfirma: null								//Callback	
		};
			
		var o = $.extend(padrao, options);
		
		//CACHE DOS ELEMENTOS
		var m = new Array(),	//modal
			e = new Array(),	//elemento
			w = new Array(),	//window
			t = '';
		
		if(elem === undefined){ elem = $(o.seletor);}
	
		return elem.each(function(){
			
			if (this.length == 0)
            return this;
			
			$(this).click(function(e){
				e.preventDefault();
				t = $(this);
				return iniciaModal();
			});
				
		});
		
		
		function iniciaModal(){

			//Atribuindo valores
			e['titulo'] = t.attr(o.atributo_titulo);
			e['conteudo'] = t.attr(o.atributo_conteudo);
			e['altura'] = t.attr(o.atributo_altura);
			e['largura'] = t.attr(o.atributo_largura);
			e['href'] = t.attr('href');
			
			e['iframelargura'] = t.attr(o.atributo_iframe_largura);
			e['iframealtura'] = t.attr(o.atributo_iframe_altura);
			e['videolargura'] = t.attr(o.atributo_video_largura);
			e['videoaltura'] = t.attr(o.atributo_video_altura);
			
			w['w'] = $(window).width(),
			w['h'] = $(window).height(),
			w['sl'] = $(window).scrollLeft(),
			w['st'] = $(window).scrollTop();
			
			//Criando modal 
			criaModal();
			
			//Inserindo conteúdo a modal
			dataModal();
		
		}
		
		function criaModal(){
			
			m['fundo'] = $('<div></div')
				.addClass(o.classe_fundo)
				.css({
					width: '100%',
					height: '100%',
					opacity: o.fundo_opacidade,
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: o.zIndex - 1,
					backgroundColor: '#000',
					display: 'none'
				}).appendTo('body').fadeIn(o.tempo);
			
			m['load'] = $('<div></div>')
				.addClass(o.classe_load)
				.css({
					position: 'fixed',
					top: '50%',
					left: '50%',
					zIndex: o.zIndex
				});
			
			m['modal'] = $('<div></div>')
				.addClass(o.classe_modal)
				.css({
					width: e['largura'],
					height: e['altura'],
					position: 'absolute',
					zIndex: o.zIndex,
					display: 'none'
				});
			
			m['fecha'] = $('<span>x</span>').addClass(o.classe_fecha);
			
			m['titulo'] = $('<div></div>').addClass(o.classe_titulo);
			
			m['conteudo'] = $('<div></div>').addClass(o.classe_conteudo);
			
			//Ajustando posição
			m['load'].css({
				marginTop: -(m['load'].outerHeight()/2),
				marginLeft: -(m['load'].outerWidth()/2)
			});

		}
		
		/**
		 * Inserir conteúdo a modal
		 */
		function dataModal(){
			
			m['titulo'].html(o.titulo).append(e['titulo']);
			
			//requisição youtube/flash
			if (t.hasClass(o.classe_video)) {
				
				//tratando a url
				var link = e['href'].replace(new RegExp("watch\\?v=", "i"), 'v/');
				
				//tem que ser assim pra num da erro no ie < 8
				var data = '<object width="'+ e['videolargura'] +'" height="'+ e['videoaltura'] +'" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" style="display: block">';
				data    += '<param name="movie" value="'+ link +'"></param>';
				data    += '<embed type="application/x-shockwave-flash" src="'+ link +'" width="'+ e['videolargura'] +'" height="'+ e['videoaltura'] +'"></embed>';
				data    += '</object>';
				
				m['conteudo'].append(data);
			}
			
			//Iframe
			if(t.hasClass(o.classe_iframe)){
				var data = '<iframe src="'+ e['href'] +'" height="'+ e['iframealtura'] +'" width="'+ e['iframelargura'] +'" style="border:0; display: block" frameBorder="0"></iframe>';
				m['conteudo'].append(data);
			}	
			
			//Ajax
			if (t.hasClass(o.classe_ajax)) {
				
				m['load'].appendTo('body');
				
				$.ajax({
					type: "POST",
					url: e['href'],
					success: function(data){
						
						m['load'].fadeOut('normal', function(){$(this).remove();});
						m['conteudo'].append(data);
						return mostraModal();
						
					},
					error: function() {
						
						m['load'].fadeOut('normal', function(){$(this).remove();});
						m['conteudo'].append("Ocorreu algum erro ou esta url não existe...");
						return mostraModal();
						
		   			}
		
				});
				
				return false;
			
			}
			
			//Imagem
			if (t.hasClass(o.classe_imagem)) {
				
				m['load'].appendTo('body');
				
				var img = new Image();
				$(img).load(function(){
					
					$(this).css({
						display: 'none',
						height: this.height,
						width: this.width
					});
					
					m['load'].fadeOut('normal', function(){$(this).remove();});
					m['conteudo'].append(img);
					$(this).fadeIn();
					
					return redimensionaModal(this.width,this.height);
					
				}).attr('src', e['href']);
				
				return false;
				
			}
			else{
				m['conteudo'].append(e['conteudo']);
			}	
			
			return mostraModal();
		}
		
		/**
		 * Redimensinar Modal
		 * @param {Object} w
		 * @param {Object} h
		 */
		function redimensionaModal(w, h){
			m['conteudo'].css({height: h,width: w});
			mostraModal();
		}
		
		/**
		 * Mostrar Modal
		 */
		function mostraModal(){
			
			//Concluindo adição de conteudo
			if(!o.conteudo_antes){
				m['conteudo'].append(o.conteudo);
			}else{
				m['conteudo'].prepend(o.conteudo);
			}
			
			//Continuando...
			if(m['titulo'].html() !== undefined){
				m['modal'].append(m['titulo']);
			}
			
			m['modal'].append(m['conteudo']).append(m['fecha']).appendTo('body').hide();
			
			var mTop = w['h']/2 + (w['st']) - (m['modal'].outerHeight()/2);
			var mLeft = (w['w']/2) + w['sl'] - (m['modal'].outerWidth()/2);
			
			m['modal'].css({
				top: mTop,
				left: mLeft
			}).fadeIn(o.tempo);
			
			
			//Eventos para fechar e tal..
			if (o.fecha) {m['fundo'].click(function(e){e.preventDefault(); return deletaModal();});}
			m['fecha'].click(function(e){e.preventDefault(); return deletaModal();});
			
			//Caixa de confirmação
			$('.'+o.classe_cancela).click(function(e){e.preventDefault();return deletaModal();});	
			$('.'+o.classe_confirma).click(function(e){e.preventDefault();deletaModal();if ($.isFunction(o.onConfirma)) {o.onConfirma.apply(t);}});
				
			if ($.isFunction(o.onShow)) {o.onShow.apply(t);}
			
		}
		
		/**
		 * Deleta Modal
		 */
		function deletaModal(){
			
			if(m['fundo']){
				m['fundo'].fadeOut(o.tempo, function(){$(this).remove();});
			}
			
			if (m['load']){m['load'].remove();}
			m['modal'].remove();
			
			if ($.isFunction(o.onHide)) {o.onHide.apply(t);}
		}
		
	};
		
})(jQuery);
