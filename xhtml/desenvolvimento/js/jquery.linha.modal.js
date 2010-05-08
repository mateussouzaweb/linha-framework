/**
* @name				Linha Modal
* @version			1.1
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
* @ultima-revisao   08/05/10 as 11:37 | nº 6
*/
(function($){
	
	$.fn.modal = function(options){
		return new $.modal(options, this);
	};
	
	$.modal = function(options, elem){
			
		var padrao = {
			seletor: '.modal',								//Seletor padrão/geral, usado caso use o plugin sem o seletor $.plugin
			seletorImagem: 'imagem',						//Classe seletora para modals com imagem
			seletorAjax: 'ajax',							//Classe seletora para modals em ajax
			seletorIframe: 'iframe',						//Classe seletora para modals com iframe
			seletorVideo: 'video',							//Classe seletora para modals com video(youtube)
			seletorCancela: 'fecha',						//Classe seletora que cancelar a requisição || o resultado é mesmo que fechar o dialogo
			seletorConfirma: 'confirma',					//Classe seletora que confirma a ação
			
			classeModal: 'modal-area',						//Classe para o modal
			classeTitulo: 'modal-titulo',					//Classe para títulos na janela modal
			classeConteudo: 'modal-conteudo',				//Classe para conteudo da janela modal
			classeFecha: 'modal-fecha',						//Classe para fechar o modal
			classeLoad: 'modal-load',						//Classe para load em requisições ajax
			classeFundo: 'modal-fundo',						//Classe para fundo modal
			fundoOpacidade: 0.7,							//Nível de transparência/opaticidade do fundo modal
			zIndex: 1000,									//Z-index modal
			
			evento: 'click',								//Evento que iniciará o Modal
			
			tempo: 'fast',									//Tempo para fade Modal
			tempoFundo: 'fast',								//Tempo para exibir e fecha o Fundo
			tempoLoad: 'fast',								//Tempo para sumir/fecha o Loading
			tempoAjuste: 'fast',							//Tempo para animar ajuste de posição
			
			fundo: true,									//True para criar o fundo semitransparente para foco em modal
			fecha: true,									//Ao clicar no fundo fecha o modal?
			titulo: null,									//Criar um titulo comum para todos os modals
			conteudo: null,									//Criar um conteudo comum para todos os modals
			conteudoAntes: false,							//Inserir conteúdo antes | True ou False
			
			atributoLink: 'href',							//Atributo fonte modal externas (Ajax e Imagem)	
			atributoTitulo: 'titulo',						//Atributo para título modal
			atributoConteudo: 'conteudo',					//Atributo para conteudo modal
			atributoAltura: 'altura',						//Atributo para altura modal
			atributoLargura: 'largura',						//Atributo para largura modal
			atributoIframeLargura: 'iframelargura',			//Atributo para largura do iframe no modal
			atributoIframeAltura: 'iframealtura',			//Atributo para altura do iframe no modal
			atributoVideoLargura: 'videolargura',			//Atributo para largura do video no modal
			atributoVideoAltura: 'videoaltura',				//Atributo para altura do video no modal
		
			onShow: null,									//Callback
			onHide: null, 									//Callback
			onConfirma: null								//Callback	
		};
			
		var o = $.extend(padrao, options),
			$d = $(document),
			$w = $(window),
			m = [],	//modal
			e = [],	//elemento
			w = [],	//window
			t = '';
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		/**
		 * Delegando evento
		 */
		$d.delegate(elem.selector, o.evento, function(e){
			var $t = $(this);
			
			/**
			 * Registro de valores
			 */
			e.titulo = $t.attr(o.atributoTitulo);
			e.conteudo = $t.attr(o.atributoConteudo);
			e.altura = $t.attr(o.atributo_altura);
			e.largura = $t.attr(o.atributo_largura);
			e.link = $t.attr(o.atributoLink);
			
			e.iframeLargura = $t.attr(o.atributoIframeLargura);
			e.iframeAltura = $t.attr(o.atributoIframeAltura);
			e.videoLargura = $t.attr(o.atributoVideoLargura);
			e.videoAltura = $t.attr(o.atributoVideoAltura);
			
			w.w = $w.width();
			w.h = $w.height();
			w.sl = $w.scrollLeft();
			w.st = $w.scrollTop();
			
			/**
			 * Cria a modal
			 */
			criaModal(e);
			
			/**
			 * Insere conteúdo na modal e exibe
			 */
			dataModal($t, e, m);

			e.preventDefault();
			return false;
		});
		
		/**
		 * Cria a modal que vai ser exibida
		 * @param {Object} e
		 */
		function criaModal(e){
			
			/**
			 * Fundo
			 */
			m.fundo = $('<div></div>')
				.addClass(o.classeFundo)
				.css({
					width: '100%',
					height: '100%',
					opacity: o.fundoOpacidade,
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: o.zIndex - 1,
					backgroundColor: '#000',
					display: 'none'
				})
				.appendTo('body')
				.fadeIn(o.tempoFundo);
			
			/**
			 * Loading
			 */
			m.load = $('<div></div>')
				.addClass(o.classeLoad)
				.css({
					position: 'fixed',
					top: '50%',
					left: '50%',
					zIndex: o.zIndex
				});
			
			/**
			 * Modal
			 */
			m.modal = $('<div></div>')
				.addClass(o.classeModal)
				.css({
					width: e.largura,
					height: e.altura,
					position: 'absolute',
					zIndex: o.zIndex,
					display: 'none'
				});
			
			m.fecha = $('<span>x</span>').addClass(o.classeFecha);
			
			m.titulo = $('<div></div>').addClass(o.classeTitulo);
			
			m.conteudo = $('<div></div>').addClass(o.classeConteudo);
			
			/**
			 * Ajuste de posição Loading
			 */
			m.load.css({
				marginTop: -(m.load.outerHeight()/2),
				marginLeft: -(m.load.outerWidth()/2)
			});

		}
		
		/**
		 * 
		 */
		/**
		 * Insere conteúdo na modal
		 * @param {Object} $t
		 * @param {Object} e
		 * @param {Object} m
		 */
		function dataModal($t, e, m){
			
			/**
			 * Adiciona o título
			 */
			m.titulo.html(o.titulo).append(e.titulo);
			
			/**
			 * Processa se for Video/Youtube
			 */
			if ($t.hasClass(o.seletorVideo)) {
				
				/**
				 * Trata a url do youtube
				 */
				e.link = e.link.replace(new RegExp("watch\\?v=", "i"), 'v/');
				
				/**
				 * Cria objeto de video
				 * tem que ser assim pra num da erro no ie < 8
				 */
				var data = '<object width="'+ e.videoLargura +'" height="'+ e.videoAltura +'" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" style="display: block">';
				data    += '<param name="movie" value="'+ e.link +'"></param>';
				data    += '<embed type="application/x-shockwave-flash" src="'+ e.link +'" width="'+ e.videoLargura +'" height="'+ e.videoAltura +'"></embed>';
				data    += '</object>';
				
				m.conteudo.append(data);
			}
			
			/**
			 * Iframe
			 */
			else if($t.hasClass(o.seletorIframe)){
				var data = '<iframe src="'+ e.link +'" height="'+ e.iframeAltura +'" width="'+ e.iframeLargura +'" style="border:0; display: block" frameBorder="0"></iframe>';
				m.conteudo.append(data);
			}	
			
			/**
			 * Ajax
			 */
			else if($t.hasClass(o.seletorAjax)){
				
				m.load.appendTo('body');
				
				$.ajax({
					type: "POST",
					url: e.link,
					success: function(data){
						
						m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
						m.conteudo.append(data);
						return mostraModal();
						
					},
					error: function() {
						
						m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
						m.conteudo.append("Ocorreu algum erro ou esta url não existe...");
						return mostraModal();
						
		   			}
				});
				
			return;
			}
			
			/**
			 * Imagem
			 */
			else if($t.hasClass(o.seletorImagem)) {
				
				m.load.appendTo('body');
				
				var img = new Image();
				$(img).load(function(){
					
					$(this).css({
						display: 'none',
						height: this.height,
						width: this.width
					});
					
					m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
					m.conteudo.append(img);
					$(this).fadeIn();
					
					return redimensionaModal(this.width,this.height);
					
				}).attr('src', e.link);
				
			return;	
			}
			
			/**
			 * Conteúdo Normal
			 */
			else{
				m.conteudo.append(e.conteudo);
			}	
			
			return mostraModal();
		}
		
		/**
		 * Redimensinar Modal
		 * @param {Object} w
		 * @param {Object} h
		 */
		function redimensionaModal(w, h){
			m.conteudo.css({height: h,width: w});
			mostraModal();
		}
		
		/**
		 * Mostrar Modal na página
		 */
		function mostraModal(){
			
			/**
			 * Concluindo adição de conteúdo
			 */
			if(!o.conteudoAntes){
				m.conteudo.append(o.conteudo);
			}else{
				m.conteudo.prepend(o.conteudo);
			}
			
			/**
			 * Aqui se sabe se terá titulo ou não a modal...
			 */
			if(m.titulo.html() !== undefined){
				m.modal.append(m.titulo);
			}
			
			m.modal.append(m.conteudo).append(m.fecha).appendTo('body').hide();
			
			var mTop = w.h/2 + (w.st) - (m.modal.outerHeight()/2);
			var mLeft = (w.w/2) + w.sl - (m.modal.outerWidth()/2);
			
			m.modal.css({
				top: mTop,
				left: mLeft
			}).fadeIn(o.tempo);
			
			/**
			 * Eventos fecha(fundo e botão fecha)
			 * @param {Object} e
			 */
			if (o.fecha){
				m.fundo.click(function(e){e.preventDefault(); return deletaModal();});
			}
				m.fecha.click(function(e){e.preventDefault(); return deletaModal();});
			
			/**
			 * Botões de confirmação
			 * @param {Object} e
			 */
			$('.'+o.classe_cancela).click(function(e){e.preventDefault();return deletaModal();});	
			$('.'+o.classe_confirma).click(function(e){e.preventDefault();deletaModal();if ($.isFunction(o.onConfirma)) {o.onConfirma.apply(t);}});
			
			/**
			 * Callback
			 */	
			if ($.isFunction(o.onShow)) {o.onShow.apply(t);}
			
		}
		
		/**
		 * Deleta Modal
		 */
		function deletaModal(){
			
			if(m.fundo.length){
				m.fundo.fadeOut(o.tempo, function(){$(this).remove();});
			}
			
			if (m.load.length){m.load.remove();}
			m.modal.remove();
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onHide)) {o.onHide.apply(t);}
		}
		
	};
		
})(jQuery);

/**
 * Callback
 * 
 * Window Resize de scroll
 * 
 * Bind demais botões
 */
