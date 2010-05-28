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
* @ultima-revisao   28/05/10 as 09:35 | nº 9
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
			eventoFecha: 'click',							//Evento para fechar o Modal (Botão Fechar)
			eventoFundo: 'click',							//Evento para fechar o Modal (Fundo Modal)
			eventoConfirma: 'click',						//Evento que confirma a ação do botão de confirmar(callback) do Modal
			eventoCancela: 'click',							//Evento que fechará o Modal caso a confirmação seja cancela ou não aceita
			
			tempo: 'fast',									//Tempo para fade Modal
			tempoFundo: 'fast',								//Tempo para exibir e fecha o Fundo
			tempoLoad: 'fast',								//Tempo para sumir/fecha o Loading
			
			fundo: true,									//True para criar o fundo semitransparente para foco em modal
			fecha: true,									//Ao clicar no fundo fecha o modal?
			titulo: null,									//Criar um titulo comum para todos os modals
			conteudo: null,									//Criar um conteudo comum para todos os modals
			conteudoAntes: false,							//Inserir conteúdo antes | True ou False
			autoPosiciona: false,							//Posicionar automaticamente o modal? é o mesmo q setar position fixed
			
			atributoLink: 'href',							//Atributo fonte modal externas (Ajax e Imagem)	
			atributoTitulo: 'titulo',						//Atributo para título modal
			atributoConteudo: 'conteudo',					//Atributo para conteudo modal
			atributoAltura: 'altura',						//Atributo para altura modal
			atributoLargura: 'largura',						//Atributo para largura modal
			atributoIframeLargura: 'iframelargura',			//Atributo para largura do iframe no modal
			atributoIframeAltura: 'iframealtura',			//Atributo para altura do iframe no modal
			atributoVideoLargura: 'videolargura',			//Atributo para largura do video no modal
			atributoVideoAltura: 'videoaltura',				//Atributo para altura do video no modal
			
			onCria: null,									//Callback
			onExibe: null,									//Callback
			onFecha: null, 									//Callback
			onConfirma: null,								//Callback
			onCancela: null									//Callback
		};
			
		var o = $.extend(padrao, options),
			$d = $(document),
			$w = $(window),
			m = [],	//modal
			el = [],//elemento
			w = [],	//window
			$t = '';
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		/**
		 * Delegando evento
		 */
		$d.delegate(elem.selector, o.evento, function(){
			
			/**
			 * Checa se ja exite uma modal por ai...
			 */
			if($('.'+ o.classeModal).length){
				return false;
			}
			
			$t = $(this);
			
			/**
			 * Registro de valores
			 */
			el.titulo = $t.attr(o.atributoTitulo);
			el.conteudo = $t.attr(o.atributoConteudo);
			el.altura = $t.attr(o.atributo_altura);
			el.largura = $t.attr(o.atributo_largura);
			el.link = $t.attr(o.atributoLink);
			
			el.iframeLargura = $t.attr(o.atributoIframeLargura);
			el.iframeAltura = $t.attr(o.atributoIframeAltura);
			el.videoLargura = $t.attr(o.atributoVideoLargura);
			el.videoAltura = $t.attr(o.atributoVideoAltura);
			
			/**
			 * Cria a modal
			 */
			criaModal();
			
			/**
			 * Insere conteúdo na modal e exibe
			 */
			dataModal();

			return false;
		});
				
		/**
		 * Cria a modal que vai ser exibida
		 */
		function criaModal(){
			
			/**
			 * Fundo
			 */
			if (o.fundo) {
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
					}).appendTo('body')
					.fadeIn(o.tempoFundo);
			}
			
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
					width: el.largura,
					height: el.altura,
					position: 'absolute',
					zIndex: o.zIndex,
					display: 'none'
				});
			
			/**
			 * Define se vai ser fixed ou absolute a posição
			 * por padrão é absolute (veja acima)
			 */
			if(o.autoPosiciona){
				m.modal.css({
					position: 'fixed',
					top: "50%",
					left: "50%"
				});
			}
			
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
			
			/**
			 * Callback
			 */
			if ($.isFunction(o.onCria)) {
				o.onCria.apply(m.modal, new Array(m, el, $t, o));
			}

		}

		/**
		 * Insere conteúdo na modal
		 */
		function dataModal(){
			
			/**
			 * Adiciona o título
			 */
			m.titulo.html(o.titulo).append(el.titulo);
			
			/**
			 * Processa se for Video/Youtube
			 */
			if ($t.hasClass(o.seletorVideo)) {
				
				/**
				 * Trata a url do youtube
				 */
				el.link = el.link.replace(new RegExp("watch\\?v=", "i"), 'v/');
				
				/**
				 * Cria objeto de video
				 * tem que ser assim pra num da erro no ie < 8
				 */
				var data = '<object width="'+ el.videoLargura +'" height="'+ el.videoAltura +'" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" style="display: block">';
				data    += '<param name="movie" value="'+ el.link +'"></param>';
				data    += '<embed type="application/x-shockwave-flash" src="'+ el.link +'" width="'+ el.videoLargura +'" height="'+ el.videoAltura +'"></embed>';
				data    += '</object>';
				
				m.conteudo.append(data);
			}
			
			/**
			 * Iframe
			 */
			else if($t.hasClass(o.seletorIframe)){
				var data = '<iframe src="'+ el.link +'" height="'+ el.iframeAltura +'" width="'+ el.iframeLargura +'" style="border:0; display: block" frameBorder="0"></iframe>';
				m.conteudo.append(data);
			}	
			
			/**
			 * Ajax
			 */
			else if($t.hasClass(o.seletorAjax)){
				
				m.load.appendTo('body');
				
				$.ajax({
					type: "POST",
					url: el.link,
					success: function(data){
						
						m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
						m.conteudo.append(data);
						return mostraModal();
						
					},
					error: function() {
						
						m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
						m.conteudo.append("Ocorreu algum erro ou esta url não existel...");
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
					
				}).attr('src', el.link);
				
			return;	
			}
			
			/**
			 * Conteúdo Normal
			 */
			else{
				m.conteudo.append(el.conteudo);
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
			
			/**
			 * Mais um ajuste de posição
			 * Se for fixed define margin, se não define top e left
			 */
			if(o.autoPosiciona){
				m.modal.css({
					marginTop: -(m.modal.outerHeight()/2),
					marginLeft: -(m.modal.outerWidth()/2)
				});
			}else{
				
				/**
				 * Registra os valores de $(window)
				 */
				w.w = $w.width();
				w.h = $w.height();
				w.sl = $w.scrollLeft();
				w.st = $w.scrollTop();
				var mTop = w.h/2 + (w.st) - (m.modal.outerHeight()/2);
				var mLeft = (w.w/2) + w.sl - (m.modal.outerWidth()/2);
				m.modal.css({
					top: mTop,
					left: mLeft
				});
			}
			
			m.modal.fadeIn(o.tempo);
			
			/**
			 * Eventos Fecha (Fundo)
			 * @param {Object} e
			 */
			if (o.fecha && m.fundo){
				m.fundo[o.eventoFundo](function(){
					return deletaModal();
				});
			}
			
			/**
			 * Evento Fecha (X)
			 */
			m.fecha[o.eventoFecha](function(){
				return deletaModal();
			});
			
			/**
			 * Botões de confirmação
			 */
			$('.'+o.seletorCancela)[o.eventoCancela](function(){
				/**
				 * Callback
				 */
				if ($.isFunction(o.onCancela)) {
					o.onCancela.apply(this, new Array(m, el, $t, o));
				}
				return deletaModal();
			});	
			$('.'+o.seletorConfirma)[o.eventoConfirma](function(){
				/**
				 * Callback
				 */
				if ($.isFunction(o.onConfirma)) {
					o.onConfirma.apply(this, new Array(m, el, $t, o));
				}
				return deletaModal();
			});
			
			/**
			 * Callback
			 */	
			if ($.isFunction(o.onExibe)) {
				o.onExibe.apply(m.modal, new Array(m, el, $t, o));
			}
		}
		
		/**
		 * Deleta Modal
		 */
		function deletaModal(){
			
			if(m.fundo){
				m.fundo.fadeOut(o.tempo, function(){$(this).remove();});
			}
			
			if (m.load.length){m.load.remove();}
			m.modal.remove();
			
			/**
			 * Callback
			 */	
			if ($.isFunction(o.onFecha)) {
				o.onFecha.apply(m.modal, new Array(m, el, $t, o));
			}
			
			return false;
		}
		
	};
		
})(jQuery);
