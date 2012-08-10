/*!
 * Extra Selectors - Script fork do jQuery Browser Selector
 * Não depende do jQuery e é mais rápido!
 */
(function(){

	var userAgent = navigator.userAgent.toLowerCase(),
		html = document.getElementsByTagName('html')[0],
		os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent),
		ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

	var addClass = function(name){
		html.className += ' ' + name;
	};

	addClass(os[1] + ' ' + ua[1]);

	// Fix for Safari
	if(ua[1] == 'safari')
		addClass(ua[1] + '-' + ua[2].substring(0, 1));
	else
		addClass(ua[1] + '-' + parseInt(ua[2]));

	// IE conditional
	if(ua[1] == 'ie'){

		for(var ver = 3; ver < 10; ver++) {
			if(parseInt(ua[2]) < ver)
				addClass('lt-ie-' + ver);
		}

	}

})();

/*!
 * jQuery Acord 1.3
 */
(function($){

	$.acord = {

		/**
		 * Opções
		 */
		padrao: {

			fx: 'default',										//Efeito padrão do acord
			extend: {},											//Métodos extensíveis

			pai: 'h2',											//Seletor pai, ou cabeçalho, header...
			filho: 'div',										//Seletor filho, este é o que ficará escondido

			classeAjax: 'ajax',									//Classe para accordions em ajax (classe presente no elemento pai)
			atributoUrl: 'url',									//Atributo para url do accordion em ajax (atributo presente no elemento pai)

			evento: 'click',									//Evento para disparar o efeito accordion

			hash: false,										//Habilitar navegação via hash?
			inicial: 1,											//Define o acordion que será exibido inicialmente ou default

			sempreUm: true,										//Deixar sempre exibindo um seletor filho no accordion?
			autoHeight: false,									//Ajustar automaticamente a altura dos elementos filho?

			tempoIn: 'fast',									//Tempo para esconder o seletor filho (Entrada)
			tempoOut: 'fast',									//Tempo para mostrar o seletor filho (Saída)
			easingIn: 'swing',									//Animação com easing na entrada (IN)...
			easingOut: 'swing',									//Animação com easing na saída (OUT)...

			onAnima: null,										//Callback

			live: false,										//Abilitar o monitoramento live
			liveTempo: 150										//Tempo entra cada checagem, em milisegundos
		},

		/**
		 * INIT
		 */
		init: function(){

			var o = $(this).data('acord'),
				f = $(this).find(o.filho).addClass('acord-filho'),
				p = $(this).find(o.pai).addClass('acord-pai'),
				hash = window.location.hash;

			/**
			 * Fix para erros de animação
			 */
			f.each(function(){
				$(this).css('height', $(this).height() + 'px');
			});

			/**
			 * Hash navigation
			 * Usa o parâmetro o.inicial
			 */
			if(o.hash && hash !== '' && $(hash).is('.acord-filho')){
				o.inicial = ($(hash).prevAll('.acord-filho').length) + 1;
			}

			/**
			 * Se for sempreUm
			 */
			if(o.sempreUm) f.eq(o.inicial - 1).addClass('acord-filho-atual').show().prev(o.pai).addClass('acord-pai-atual');

			/**
			 * Altura automática
			 */
			if(o.autoHeight){

				var h = 0;

				f.each(function(){
					h = Math.max(h, $(this).outerHeight());
				}).height(h);


				$(this).height( $(this).height() ).css({overflow: 'hidden'});
			}

			/**
			 * Extend FX para init
			 */
			if(o.extend[o.fx + '-init']) o.extend[o.fx + '-init'].apply(this);

			/**
			 * Aplica a classe relativa ao FX
			 */
			$(this).addClass('acord-' + o.fx);

			$.acord.bind.apply(this);
		},

		/**
		 * BIND
		 */
		bind: function(){

			var o = $(this).data('acord'),
				self = $(this);

			/**
			 * Bind no evento e setagem de valores
			 */
			$('.acord-pai', this).bind(o.evento, function(){

				/**
				 * Previne a repetição do mesmo evento
				 */
				if($(this).hasClass('acord-pai-atual')) return false;

				/**
				 * Altera o hash, se tiver
				 */
				if(this.hash) window.location.hash = this.hash;

				/**
				 * Anima o acord
				 */
				if( $(this).hasClass(o.classeAjax) ){
					return $.acord.ajax.apply( self, [$(this), $(this).next('.acord-filho')] );
				}

				return $.acord.anima.apply( self, [$(this), $(this).next('.acord-filho')] );
			});

			/**
			 * Checa se o inicial é em ajax e já manda a requisição
			 */
			if(o.sempreUm && $('.acord-pai-atual', this).hasClass(o.classeAjax)){
				$('.acord-pai-atual', this).trigger(o.evento);
			}
		},

		/**
		 * DESTROY
		 */
		destroy: function(){

			var o = $(this).data('acord');

			$('.acord-pai', this).unbind(o.evento);
			$(this).removeData('acord');

		},

		/**
		 * FX
		 */
		fx: {

			/**
			 * Efeito padrão
			 */
			'default': function(p, f){

				var o = $(this).data('acord');

				/**
				 * Anima Slide
				 */
				$(o.filho, this).not(f).slideUp(o.tempoIn, o.easingIn);

				if(o.sempreUm){
					f.slideDown(o.tempoOut, o.easingOut);
				}else{
					f.slideToggle(o.tempoIn, o.easingIn);
				}
			}
		},

		/**
		 * Requisição Ajax
		 */
		ajax: function(p, f){

			var o = $(this).data('acord'),
				self = this;

			$.ajax({
				url: p.attr(o.atributoUrl),
				success: function(data){
					f.html(data);
				},
				complete: function(){

					/**
					 * Ajuste de altura - height
					 */
					f.height('auto');
					$(self).height('auto');

					return $.acord.anima.apply(self, [p, f] );
				}
			});

		},

		/**
		 * Animação
		 */
		anima: function(p, f){

			var o = $(this).data('acord');

			/**
			 * Meche nas classes
			 */
			$('.acord-filho-atual', this).removeClass('acord-filho-atual');
			$('.acord-pai-atual', this).removeClass('acord-pai-atual');

			p.addClass('acord-pai-atual');
			f.addClass('acord-filho-atual');

			/**
			* Callback
			*/
			if ($.isFunction(o.onAnima)) o.onAnima.apply(this, [p, f]);

			/**
			 * Faz a animação
			 */
			$.acord.fx[o.fx].apply(this, [p, f]);

		return false;
		}
	};

	$.fn.acord = function(method){

		/**
		 * Chama o evento se existir
		 */
		if($.acord[method]){
			$.acord[method].apply(this, Array.prototype.slice.call(arguments, 1));

		/**
		 * Chama o evento inicial
		 */
		}else if(typeof method === 'object' || !method){

			var options = $.extend(true, {}, $.acord.padrao, method);

			/*
			 * Live
			 */
			if(options.live){

				var elems = [],
					s = this.selector;

				setInterval(function(){

					var	n = $(s).not(elems);
					elems = $(s);

					n.each(function(){

						$(this).data('acord', options);
						$.acord.init.apply(this, arguments);

					});


				}, options.liveTempo);

			/**
			 * Normal
			 */
			}else{

				this.each(function(){

					$(this).data('acord', options);
					$.acord.init.apply(this, arguments);

				});
			}
		}

	return this;
	};

})(jQuery);

/*!
 * jQuery Modal 1.2
 */
(function($){

	$.fn.modal = function(options){

		var padrao = {
			seletorImagem: 'imagem',						//Classe seletora para modals com imagem
			seletorAjax: 'ajax',							//Classe seletora para modals em ajax ou load
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

			onInicia: null,									//Callback
			onCria: null,									//Callback
			onExibe: null,									//Callback
			onFecha: null, 									//Callback
			onConfirma: null,								//Callback
			onCancela: null									//Callback
		};

		var o = $.extend(padrao, options),
			$w = $(window),
			m = [], //modal
			el = [],//elemento
			w = [], //window
			$t;

		/**
		 * Delegando evento
		 */
		$(document).delegate(this.selector, o.evento, function(){

			/**
			 * Checa se ja exite uma modal por ai...
			 */
			if($('.'+ o.classeModal).length) return false;

			$t = $(this);

			/**
			 * Registro de valores
			 */
			el.titulo = $t.attr(o.atributoTitulo);
			el.conteudo = $t.attr(o.atributoConteudo);
			el.altura = $t.attr(o.atributoAltura);
			el.largura = $t.attr(o.atributoLargura);
			el.link = $t.attr(o.atributoLink);

			el.iframeLargura = $t.attr(o.atributoIframeLargura);
			el.iframeAltura = $t.attr(o.atributoIframeAltura);
			el.videoLargura = $t.attr(o.atributoVideoLargura);
			el.videoAltura = $t.attr(o.atributoVideoAltura);

			/**
			 * Callback
			 */
			if ($.isFunction(o.onInicia)) {
				o.onInicia.apply($t, new Array(el, $t, o));
			}

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
				m.fundo = $('<div/>')
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
			m.load = $('<div/>')
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
			m.modal = $('<div/>')
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

			if(o.classeTitulo != null && o.classeTitulo){
				m.titulo = $('<div/>').addClass(o.classeTitulo);
			}

			m.conteudo = $('<div/>').addClass(o.classeConteudo);

			/**
			 * Eventos Fecha (Fundo), adicionado agora pq é melhor
			 */
			if (o.fecha && m.fundo){
				m.fundo[o.eventoFundo](function(){
					return deletaModal();
				});
			}

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
			if(m.titulo) m.titulo.html(o.titulo).append(el.titulo);

			/**
			 * Checa o loading
			 */
			if($t.hasClass(o.seletorAjax) || $t.hasClass(o.seletorImagem)){
				m.load.appendTo('body').css({
					marginTop: -(m.load.outerHeight()/2),
					marginLeft: -(m.load.outerWidth()/2)
				});
			 }

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
			 * Load/Ajax
			 */
			else if($t.hasClass(o.seletorAjax)){

				m.conteudo.load(el.link, function(rt, ts, xhr){
					if(xhr){
						if(ts == 'error'){
							m.conteudo.append("Ocorreu algum erro ou esta url não existe...");
						}

						m.load.fadeOut(o.tempoFundo, function(){$(this).remove();});
						return mostraModal();
					}
				});
			return;
			}

			/**
			 * Imagem
			 */
			else if($t.hasClass(o.seletorImagem)) {

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
			m.conteudo.css({height: h, width: w});
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
			if(m.titulo && m.titulo.html() !== undefined){
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

				m.modal.css({
					top: (w.h/2 + (w.st) - (m.modal.outerHeight()/2)),
					left: ((w.w/2) + w.sl - (m.modal.outerWidth()/2))
				});
			}

			m.modal.fadeIn(o.tempo);

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

			if(m.load && m.load.length) m.load.remove();
			if(m.modal) m.modal.remove();

			/**
			 * Callback
			 */
			if ($.isFunction(o.onFecha)) {
				o.onFecha.apply(m.modal, new Array(m, el, $t, o));
			}

			m = [];

			return false;
		}

	};

})(jQuery);

/*!
 * jQuery Nav 1.2
 */
(function($){

	$.fn.nav = function(options){

		var padrao = {
			seletorFilho: 'ul:first', 				//Seletor filho, o que será exibido

			classePaiAtual: 'nav-pai-atual', 		//Classe para pai que está em foque | Adicionado pelo plugin
			classeFilhoAtual: 'nav-filho-atual',	//Classe para o filho que esta visível | Adicionado pelo plugin

			evento : 'mouseenter', 					//Evento para disparar o plugin
			eventoFim : 'mouseleave', 				//Evento para terminar o plugin

			efeitoIn: 'slideDown',					//Efeito inicial
			efeitoOut: 'slideUp',					//Efeito Final
			tempoIn: 'fast',						//Tempo para mostrar o seletor filho (Entrada)
			tempoOut: 'fast',						//Tempo para esconder o seletor filho (Saída)
			tempoDelay: 100, 						//Tempo de espera para esconder o seletor filho(Saida)
			easingIn: 'swing',						//Animação com easing na entrada (IN)...
			easingOut: 'swing',						//Animação com easing na saída (OUT)...
			stopClearQueue: true, 					//(Veja API Stop - clearQueue) e não mexa sem conhecimento
			stopJumpToEnd: true,					//(Veja API Stop - jumpToEnd) e não mexa sem conhecimento

			onExibe : null,							//Callback
			onEsconde: null							//Callback
		};
		var o = $.extend(padrao, options),
			np = o.classePaiAtual,
			nf = o.classeFilhoAtual;

		/**
		 * Delegando evento
		 */
		$(document).delegate(this.selector, o.evento, function(){

			var $f = $(this).children(o.seletorFilho);

			/**
			 * Checa o seletor filho
			 */
			if(!$f.length) return false;

			exibeNav($(this), $f);

			/**
			 * Da o bind no evento final
			 * Não pode ser delegate porque ele tem bug no evento mouseleave...aff
			 */
			$(this).unbind(o.eventoFim).bind(o.eventoFim, function(){
				return escondeNav($(this), $f);
			});
		});

		/**
		 * Exibir o seletor filho
		 * @param {Object} $t - elemento this
		 * @param {Object} $f - elemento filho
		 */
		function exibeNav($t, $f){

			if($f.is(':animated')) return false;

			/**
			 * Adiciona a classe
			 */
			$t.addClass(np);

			/**
			 * Callback
			 */
			if ($.isFunction(o.onExibe)) o.onExibe.apply($t, new Array($t, $f, o));

			/**
			 * Animação
			 */
			$f.stop(o.stopClearQueue, o.stopJumpToEnd).addClass(nf)[o.efeitoIn](o.tempoIn, o.easingIn);

		};

		/**
		 * Esconder o seletor filho
		 * @param {Object} $t - elemento this
		 * @param {Object} $f - elemento filho
		 */
		function escondeNav($t, $f){

			/**
			 * Remove a classe
			 */
			$t.removeClass(np);

			/**
			 * Animação
			 */
			$f.stop(o.stopClearQueue, o.stopJumpToEnd).delay(o.tempoDelay).removeClass(nf)[o.efeitoOut](o.tempoOut, o.easingOut);

			/**
			 * Callback
			 */
			if ($.isFunction(o.onEsconde)) o.onEsconde.apply($t, new Array($t, $f, o));

		};
	};
})(jQuery);

/*!
 * jQuery Slidetabs 1.3
 */
(function($){

	$.slideTabs = {

		/**
		 * Opções do plugin
		 * @var {object}
		 */
		options: {

			seletorPainel: '.painel',							// Seletor para o painel ou os slides
			seletorMiniatura: '.miniatura',						// Seletor de miniaturas
			seletorAnterior: '.anterior',						// Seletor seta anterior
			seletorProximo: '.proximo',							// Seletor seta próximo

			eventoMiniatura: 'click',							// Evento para disparar o plugin nas miniaturas
			eventoSeta: 'click',								// Evento para disparar o plugin nos botões/setas próximo e anterior

			inicial: 1,											// Slide inicial | Se hash = true haverá alteração automática
			continuo: true, 									// Deixar o slide rolar de forma contínua?

			auto: false, 										// Executar a troca de slide automaticamente?
			pausarAuto: true,									// Pausa a troca de slides automática quando o slide está no estado hover
			pausa: 4000, 										// Tempo entre cada pausa para o slide automático

			tempo: 'fast',										// Tempo para cada transição / 0 (zero) para sem animação
			easing: 'swing',									// Animação com easing na entrada (IN)...

			scroll: 1,											// Nº de elementos que serão arrastados
			direcao: 'x',										// Direção para o slide, X (horizontal) ou Y (vertical)

			onSlide: null,										// Callback

			live: false,										// Habilitar o monitoramento live
			liveTempo: 100										// Tempo entra cada checagem, em milisegundos

		},

		/**
		 * Inicia o plugin
		 * @return this.bind();
		 */
		init: function(){

			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');

			/**
			 * Ajusta o slide
			 */
			var $s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel),
				$m = $t.find(o.seletorMiniatura),

				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true);
				position = (o.direcao == 'x') ? 'left' : 'top',
				i = o.inicial - 1;

			$p.filter(':first').addClass('slidetabs-painel-primeiro')
			$p.eq(i).addClass('slidetabs-painel-atual');

			increase = i * increase;

			/**
			 * Força remover CSS Float quando é para animar na direção y
			 */
			if(position == 'top')
				$p.css('float', 'none');

			$s.css(position, -increase + 'px');

			/**
			 * Ajusta as miniaturas
			 */
			$m.eq(i).addClass('slidetabs-miniatura-atual');

			return $.slideTabs.bind.apply(this);
		},

		/**
		 * Bind para os elementos
		 */
		bind: function(){

			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');

			/**
			 * Seta anterior
			 */
			$(o.seletorAnterior, t).bind(o.eventoSeta, function(){
				return $.slideTabs.animate.apply(t, [-1]);
			});

			/**
			 * Miniaturas
			 */
			$(o.seletorMiniatura, t).bind(o.eventoMiniatura, function(){

				if( $(this).hasClass('slidetabs-miniatura-atual') )
					return false;

				var m = $t.find('.slidetabs-miniatura-atual').prevAll().length,
					l = $(this).prevAll().length - m;

				return $.slideTabs.animate.apply(t, [l]);
			});

			/**
			 * Seta próximo
			 */
			$(o.seletorProximo, t).bind(o.eventoSeta, function(){
				return $.slideTabs.animate.apply(t, [1]);
			});

			/**
			 * Automático
			 */
			if(o.auto){

				/**
				 * Faz a checagem para pausar a troca automática de slides
				 */
				if(o.pausarAuto){
					$t.hover(function(){

						$.slideTabs.stop.apply(t);
						$(this).data('slideHover', '1');

					}, function(){

						$(this).removeData('slideHover');
						$.slideTabs.start.apply(t);

					});
				}

				$.slideTabs.start.apply(t);
			}
		},

		/**
		 * Unbind para os eventos
		 */
		unbind: function(){

			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');

			/**
			 * Setas
			 */
			$(o.seletorAnterior, t).unbind(o.eventoSeta);
			$(o.seletorProximo, t).unbind(o.eventoSeta);

			/**
			 * Miniaturas
			 */
			$(o.seletorMiniatura, t).unbind(o.eventoMiniatura);

			/**
			 * Automático
			 */
			$.slideTabs.stop.apply(t);

			if(o.pausarAuto){
				$t.unbind('hover');
				$t.removeData('slideHover');
			}

		},

		/**
		 * Para o slide automático
		 * @return clearInterval();
		 */
		stop: function(){

			var t = this;

			return clearInterval(t.timeout);
		},

		/**
		 * Inicia o slide automático
		 */
		start: function(){

			var t = this,
				$t = $(t),
				o = $t.data('slidetabs');

			$.slideTabs.stop.apply(t);

			t.timeout = setTimeout(function(){

				if(o.pausarAuto && $t.data('slideHover'))
					return false;

				return $.slideTabs.animate.apply(t, [1]);
			}, o.pausa);

		},

		/**
		 * Ajusta a posição do slide, para a animação
		 * @param {int} next
		 * @return {int}
		 */
		adjustPosition: function(next){

			var t = this,
				$t = $(t),
				o = $t.data('slidetabs'),
				$s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel),
				$pa = $t.find('.slidetabs-painel-atual'),

				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true),
				position = (o.direcao == 'x') ? 'left' : 'top',

				now = $pa.prevAll().length + 1,
				next = now + next;

			if(!o.continuo)
				return now;

			// Próximo
			if(next > $p.length){

				/**
				 * Ajusta a ordem dos elementos
				 */
				var remain = next - $p.length;
				if(o.scroll > 1) remain += o.scroll - 1;

				var $lt = $p.slice(0, remain);
					$lt.insertAfter( $p.filter(':last') );

				now -= remain;

				/**
				 * Ajusta a posição do scroll
				 */
				$s.css(position, '-' + ( (now - 1) * increase ) + 'px');

			// Anterior
			}else if(now > next){

				/**
				 * Ajusta a ordem dos elementos
				 */
				var remain = now - next;

				if( remain > 0 && !$pa.prevAll().eq(remain - 1).length ){

					$gt = $p.slice( $p.length - remain);
					$gt.insertBefore( $p.filter(':first') );

					now += remain;

					/**
					 * Ajusta a posição do scroll
					 */
					$s.css(position, '-' + ((now - 1) * increase) + 'px');

				}

			}

			return now;
		},

		/**
		 * Anima o slide
		 * @param {int} next
		 * @return false
		 */
		animate: function(next){

			/**
			 * Ajusta os parâmetros
			 */
			if(next == undefined)
				return false;

			/**
			 * Opções
			 */
			var t = this,
				$t = $(t),
				o = $t.data('slidetabs'),

				$s = $t.find('.slidetabs-scroll'),
				$p = $t.find(o.seletorPainel),
				$pa = $t.find('.slidetabs-painel-atual'),
				$m = $t.find(o.seletorMiniatura),

				now = $pa.prevAll().length + 1,
				increase = (o.direcao == 'x') ? $p.outerWidth(true) : $p.outerHeight(true),
				position = (o.direcao == 'x') ? 'left' : 'top',
				ani = {};

			if(o.scroll > 1){
				next = (next > 0) ? next + o.scroll - 1 : next - o.scroll + 1;
			}

			/**
			 * Checa se é contínuo
			 */
			if(!o.continuo){

				if( (next < 0 && now + next <= 0) || (next > 0 && now + next > $p.length) )
					return false;

			}

			/**
			 * Ajusta o slide e recalcula o valor de now
			 */
			now = $.slideTabs.adjustPosition.apply(this, [next]);

			/**
			 * Ajusta a posição da animação, para permitir ir a ambas as direções
			 */
			ani[position] = '-=' + (next * increase);

			/**
			 * Anima o slide
			 */
			if(!$s.is(':animated')){

				$s.animate( ani, {
					queue: false,
					duration: o.tempo,
					easing: o.easing,
					complete: function(){

						/**
						 * Ajusta o painel atual
						 */
						$pa.removeClass('slidetabs-painel-atual');

						$pa = $t.find(o.seletorPainel).eq( (now - 1) + next );
						$pa.addClass('slidetabs-painel-atual');

						/**
						 * Ajusta a miniatura atual
						 */
						var $ma = $t.find('.slidetabs-miniatura-atual').removeClass('slidetabs-miniatura-atual');
						var l = $ma.prevAll().length + next;

						if( l >= $m.length) l = 0;

						$m.eq( l ).addClass('slidetabs-miniatura-atual');

						/**
						 * Callback
						 */
						if( $.isFunction(o.onSlide) ){
							o.onSlide.apply(t, [$t]);
						}

						/**
						 * Automático
						 */
						if(o.auto) $.slideTabs.start.apply(t);

					}
				});

			}

			return false;
		}
	}

	/**
	 * Slidetabs
	 * @param {mixed} method
	 * @param {mixed} argument, ...
	 * @return {object}
	 */
	$.fn.slideTabs = function(method){

		/**
		 * Chama o evento se existir
		 */
		if($.slideTabs[method]){
			$.slideTabs[method].apply(this, Array.prototype.slice.call(arguments, 1));

		/**
		 * Chama o evento inicial
		 */
		}else if(typeof method === 'object' || !method){

			var options = $.extend(true, {}, $.slideTabs.options, method);

			/*
			 * Live
			 */
			if(options.live){

				var elems = [],
					s = this.selector;

				setInterval(function(){

					var n = $(s).not(elems);
					elems = $(s);

					n.each(function(){

						$(this).data('slidetabs', options);
						$.slideTabs.init.apply(this, arguments);

					});

				}, options.liveTempo);

			/**
			 * Normal
			 */
			}else{

				this.each(function(){

					$(this).data('slidetabs', options);
					$.slideTabs.init.apply(this, arguments);

				});

			}

		}

		return this;
	};

})(jQuery);


/*!
 * jQuery Tooltip 1.3
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
			return removeTooltip($(this));
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

			$('.' + o.classeArea).remove();

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

			if(o.atributo == 'title' && $t){
				$t.attr('title', tip.conteudo);
			}

			tip.area.remove();
			tip.load.remove();

			atual = null;
			tip = {};
		}

		/**
		 * Posiciona o tooltip de acordo com o mouse ou com o elemento
		 * @param {Object} $t - elemento
		 * @param {Object} e - evento
		 */
		function posicionaTooltip($t ,e){

			if(!tip.area) return false;

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

/*!
 * jQuery Validate 1.2
 */
(function($){

	$.validate = [];

	/**
	 * Opções Padrões
	 * @type {Object}
	 */
	$.validate.defaults = {

		classError: 'error',
		selectDefaultValue: 0,

		redirect: true,

		inline: false,
		inlineEvent: 'focusout',

		onItemValidate: null,
		onItemError: null,

		onValidate: null,
		onError: null
	};

	/**
	 * Valida o formulário por completo
	 * @param {Object} $form
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.form = function($form, options){

		var result = true;

		if(!options)
			options = $form.data('validate');

		$form.find('[required]').each(function(){

			var itemResult = $.validate.item( $(this), options );
			result = result && itemResult;

		});

		return result;
	};

	/**
	 * Valida um item do formulário
	 * @param {Object} $item
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.item = function($item, options){

		var result = true;

		$item.removeClass(options.classError);

		/**
		 * Caso o item esteja desabilitado
		 * A validação retorn true, ou melhor dizendo, não valida
		 */
		if($item.is(':disabled'))
			return true;

		/**
		 * Callback Valida
		 */
		if( $.isFunction( options.onItemValidate ) ) {
			options.onItemValidate.apply( $item, new Array($item, options) );
		}

		/**
		 * Select
		 */
		if( $item.is('select') ){
			result = ( $item.val() && $item.val() != options.selectDefaultValue ) ? true : false;

		/**
		 * CheckBox/Radio
		 */
		}else if( $item.is(':checkbox') || $item.is(':radio') ){

			var inputName = $item.attr('name'),
				checked = $('input[name="' + inputName + '"]:checked').length;

			result = (checked == 0) ? false : true;

		/**
		 * Input
		 */
		}else{

			var regex,
				type = $item.data('type') || $item.attr('type');

			if(type){

				// E-mail
				if( type == 'email' ){
					regex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);

				// Url
				}else if( type == 'url' ){
					regex = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);

				// Números
				}else if( type == 'number' ){
					regex = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);

				// Regex Personalizado
				}else if( $item.attr('pattern') ){
					regex = new RegExp( $item.attr('pattern') );
				}

			}

			/**
			 * Valida o campo
			 */
			if(regex)
				result = regex.test( $item.val() );
			else
				result = $.trim( $item.val() ) != '';

		}

		/**
		 * Se NÃO passar
		 */
		if( result == false ){

			$item.addClass( options.classError );

			/**
			 * Callback Erro
			 */
			if($.isFunction( options.onItemError )){
				options.onItemError.apply($item, new Array($item, options));
			}

		}

		return result;
	};

	/**
	 * Valida um formulário e retorna o resultado da validação
	 * @param {Object} options
	 */
	$.fn.validate = function(options){

		if( ! $(this).is('form') )
			return false;

		var options = $.extend( {}, $.validate.defaults, options );

		/**
		 * Força novalidate e acrescenta as opções ao formulário
		 */
		$(this).attr('novalidate', 'novalidate');
		$(this).data('validate', options);

		/**
		 * Submit
		 * > callbacks
		 */
		$(this).on('submit', function(){

			/**
			 * Validou
			 */
			if( $.validate.form( $(this), options ) ){

				if($.isFunction( options.onValidate )){
					options.onValidate.apply( this, new Array(this, options) );
				}

				return (options.redirect) ? true : false;

			/**
			 * Erro!
			 */
			}else{

				if($.isFunction( options.onError )){
					options.onError.apply( this, new Array(this, options) );
				}

				return false;
			}

		});

		/**
		 * Inline
		 */
		if(options.inline){

			$(this).find('[required]')
			.on( options.inlineEvent, function(){
 				$.validate.item( $(this), options );
			});

		}

	};

})(jQuery);
