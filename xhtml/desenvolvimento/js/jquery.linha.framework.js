/**
* @name				Linha Acord
* @version			1.0
* @descripton		Plugin Jquery para criação de accordions extensível e customizável
*					MODO DE USAR $.acord({opcoes}); || $('.classeTal').acord({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 09:53 | nº 6
*/
(function($){
	$.fn.acord = function(options){
		return new $.acord(options, this);	
	};
	
	$.acord = function(options, acordion){
		var padrao = {
				seletor: '.acordion',	//Seletor padrão
				pai: 'h2',				//Seletor pai, ou cabeçalho, header...
				filho: 'div',			//Seletor filho, este é o que ficará escondido
				
				evento: 'click',		//Evento para disparar o efeito accordion
				
				sempreUm: true,			//Deixar sempre exibindo um seletor filho no accordion
				autoheight: true,		//Ajustar automaticamente a altura dos elementos filho
				tempoUp: 'normal',		//Tempo para esconder o seletor filho
				tempoDown: 'normal',	//Tempo para mostrar o seletor filho

				onAcord: null 			//Callback
		};
		
		var o = $.extend(padrao, options);
		
		if(acordion === undefined){ acordion = $(o.seletor);}
			
		return acordion.each(function(){
			var a = acordion;
			
			//Fix para erros de animação
			a.find(o.filho).each(function(){$(this).css("height", $(this).height() + "px").hide();});
			if (o.sempreUm) {$(o.filho + ':first', a).show();}
			
			//Altura automatica
			if(o.autoheight){
				var h = 0; 
				$(o.filho, this).each(function(){
					h = Math.max(h, $(this).outerHeight());
				}).height(h);
				
				a.height($(this).height()).css({overflow: 'hidden'});
			} 

			//Eventos customizados
			if(o.evento){
				$(o.pai, a).bind(o.evento, function(){return showAcord($(this), a);});
			}
			
			function showAcord(t, a){

				var n = t.next();
				
				if ($.isFunction(o.onAcord)) {o.onAcord.apply(t);}
				
				$(o.filho, a).not(n).slideUp(o.tempoUp);
				if (o.sempreUm) {
					n.slideDown(o.tempoDown);
				}else{
					n.slideToggle(o.tempoDown);
				}
				
				return false;
			}
		});

	};

})(jQuery);

/**
* @name				Linha Focuss
* @version			1.0
* @descripton		Plugin Jquery para interações com o evento focus,
* 					como troca de borda automática e alteração de texto(value).
* 					Plugin extensível e customizável
*					MODO DE USAR $.focuss({opcoes}); || $('.classeTal').focuss({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 9:55 | nº 6
*/
(function($){
	
	$.fn.focuss = function(options){
		return new $.focuss(options, this);	
	};
	
	$.focuss = function(options, elem){
		
		var padrao = {
				seletor: 'input, textarea',		//Seletor padrão
				evento: 'focus',				//Evento para disparar o focuss
				eventoFim: 'blur',				//Evento para terminar o focuss
				cor: 'red', 					//Cor para dar destaque ao elemento 
				remove: false, 					//Remover borda padrão de alguns navegadores (Safari e Chome)
				removeTexto: false,				//Remover texto pré-escrito, se o valor não for direferente ou nulo retorna o padrão
				onFocus: null,					//Callback
				onBlur: null					//Callback
			};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
			
		return elem.each(function(){
			
			var t = $(this),
			bl = t.css("border-left-color"),
			br = t.css("border-right-color"),
			bt = t.css("border-top-color"),
			bb = t.css("border-bottom-color"),
			bcor = bt + ' ' + br + ' ' + bb + ' ' + bl,
			texto = t.val();
				
			//Eventos customizados
			if(o.evento){
				t.bind(o.evento, function(){return iniciaFocuss(t);});
			}
			
			if(o.eventoFim){
				t.bind(o.eventoFim, function(){ return terminaFocuss(t, bcor);});
			}
			
			//
			function iniciaFocuss(t){

				//Para inputs
				if(o.remove){t.css({outline: 'none'});}
				if (o.removeTexto) {if (t.val() == texto) {t.val('');}}
				
				//Uso geral
				t.css({borderColor: o.cor});
				
				if ($.isFunction(o.onFocus)) {o.onFocus.apply(t);}
			}
			
			function terminaFocuss(t, cor){
				
				//Para inputs
				if(o.remove){t.css({outline: ''});}
				if (o.removeTexto) {if (t.val() == '') {t.val(texto);}}
				
				//Uso geral
				t.css({borderColor:cor});
				
				if ($.isFunction(o.onBlur)) {o.onBlur.apply(t);}
			}		
		});
	};
})(jQuery);

/**
* @name				Linha Form
* @version			1.0
* @descripton		Plugin Jquery para validação de formularios
* 					Plugin extensével e customizável
*					MODO DE USAR $.form({opcoes}); || $('.classeTal').form({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   24/02/10 as 11:43 | nº 2
*/
(function($){
	
	$.fn.form = function(options){
		return new $.form(options, this);	
	};
	
	$.form = function(options, elem){
		
		var padrao = {
			seletor: '.formulario',					//Seletor padrão
			classe_validacao: 'valida', 			//Classe padrão para os inputs para validação
			classe_email: 'email',					//Classe para validar e-mails
			classe_url: 'url',						//Classe para validar urls
			classe_numero: 'numero',				//Classe pra validar numeros
			classe_regex: 'regex',					//Classe para validação personalizada
			atributo_regex: 'regex',				//Atributo para regex | validação personalizada
				
			ajax: false,							//Caso true o formulário é enviado via ajax, false redireciona
			onValida: null,							//Callback para quando inicia a validação de cada input
			onErro: null,							//Callback para quando retorna erro de cada input
			onPassa: null,							//Callback passa geral / Funcional para AJAX
			onNaoPassa: null						//Callback erro geral
		};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		elem.each(function(){
			
			var t = $(this);
			
			//Checa se é form
			if(!$(this).is('form')){ alert("linha form indica: seletor não é um formulário");}
			
			$(this).find('input, button').filter(':submit').click(function(){
				
				//Aqui começa a validação
				var resultado = $.form.valida(o, elem);
				
				if(resultado){
					
					if(o.ajax){
						//Callback
						if ($.isFunction(o.onPassa)) {o.onPassa.apply(t);}
						return false;
					}else{
						return resultado;
					}
					
				}else{
					//Callback
					if ($.isFunction(o.onNaoPassa)) {o.onNaoPassa.apply(t);}
					return false;
				}				

			});
			
		});
		
	};
	
	$.form.valida = function(o, elem){
	
		var passa = true;

		elem.each(function(){
			$(this).find('input, textarea, select, checkbox, radio').not(':submit').each(function(){
				
				var t = $(this);
				if(t.hasClass(o.classe_validacao)){
					
					//Callback inicio validaçao
					if ($.isFunction(o.onValida)) {o.onValida.apply(t);}
					
					var tValido = valida_input(t,o);
					passa = passa && tValido;
					
					//Exibindo mensagem de erro se não passar
					if(!tValido){
						//Callback não passou validação
						if ($.isFunction(o.onErro)) {o.onErro.apply(t);}
					}
				}
				
			});
		});
		
		return passa;
		
	};
	
	function valida_input(t,o){
			
		var val = t.val();
		ret = true;
		
		//E-MAIL
		if(t.hasClass(o.classe_email)){
				
			var tmp = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
				
		}
		//URLs
		if(t.hasClass(o.classe_url)){
			var tmp = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		//NUMEROS
		if(t.hasClass(o.classe_numero)){
				
			var tmp = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
			
		}
		//REGEX PERSONALIZADO
		if(t.hasClass(o.classe_regex)){
			
			var regex = t.attr(o.atributo_regex);	
			var tmp = new RegExp(regex);
			if(!tmp.test(val) || val==''){
				ret = false;
			}
		}
		//NORMAL
		else{
			if(val==''){
				ret = false;
			};
		}
		
		return ret;
			
	}
	
})(jQuery);

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

/**
* @name				Linha Nav
* @version			1.0
* @descripton		Plugin Jquery para criação de menus dropdown de multi-level(s),
* 					Plugin extensível e customizável
*					MODO DE USAR $.nav({opcoes}); || $('.classeTal').nav({opcoes});
*
* @author			Mateus Souza
* @author-email		mateussouzaweb@gmail.com
* @author-website	http://www.mateussouza.com | http://www.linhaframework.com
* @copyright		(c) 2010 Mateus Souza
* @license			MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html
* 
* @ultima-revisao   11/03/10 as 10:01 | nº 5
*/
(function($){
	$.fn.nav = function(options){
		return new $.nav(options, this);	
	};
	
	$.nav = function(options, elem){
		
		var padrao = {
			seletor: '.menu li',		//Seletor padrão
			filho: 'ul:first', 			//Seletor filho, o que será exibido
			
			evento : 'mouseenter', 		//Evento para disparar o plugin
			eventoFim : 'mouseleave', 	//Evento para terminar o plugin
			
			anima: false,				//Anima a exibição?
			slide : false,				//Animação no formato de slide?
			tempoMostra: 200,			//Tempo para mostrar o submenu
			tempoEsconde: 200,			//Tempo para esconder o submenu

			onInicio : null,			//Callback
			onFim: null					//Callback
		};
		var o = $.extend(padrao, options);
		
		if(elem === undefined){ elem = $(o.seletor);}
		
		return elem.each(function(){
				
			var t = $(this);
			
			//Eventos customizados
			if(o.evento){
				t.bind(o.evento, function(){return showNav(t);});
			}
			
			if(o.eventoFim){
				t.bind(o.eventoFim, function(){ return hideNav(t);});
			}
		});
	
		/**
		 * @param {Object} t - elemento this
		 */
		function showNav(t){
			if ($.isFunction(o.onInicio)) {o.onInicio.apply(t);}
			if (o.anima) {
				if (o.slide) {
					$(o.filho, t).slideDown(o.tempoMostra);
				}
				else {
					$(o.filho, t).fadeIn(o.tempoMostra);
				}
			}else{
				$(o.filho, t).show();
			}
		};
		/**
		 * @param {Object} t - elemento this
		 */
		function hideNav(t){
			if(o.anima){
				if (o.slide) {
						$(o.filho, t).slideUp(o.tempoEsconde);
				}else {
					$(o.filho, t).fadeOut(o.tempoEsconde);
				}
			}else{
				$(o.filho, t).hide();
			}
			if ($.isFunction(o.onFim)) {o.onFim.apply(t);}
		};
	};
})(jQuery);

/**
* @name				Linha slideTabs
* @version			1.1
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
* @ultima-revisao   19/04/10 as 8:43 | nº 5
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
				
				var l = $(this).prevAll(o.seletor_miniatura).length;
		
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
* @ultima-revisao   02/05/10 as 14:58 | nº 9
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
