/**
 * Linha Framework 1.3
 * 
 * Funcionalidades:
 * # Classe OS & Browser
 * # Classe Screen Resolution
 * # Classe CSS3 Suporte (Ex: box-shadow, sem-box-shadow)
 * # HTML5 Elements para navegadores antigos
 */
window.Linha = {

	/**
	 * Dados úteis :)
	 */
	ua: navigator.userAgent.toLowerCase(),
	
	screens: [320, 480, 640, 768, 1024, 1280, 1440, 1680, 1920],
	
	css3: 'background-origin background-clip background-size box-sizing box-shadow box-reflect border-image border-radius columns perspective transform transition'.split(' '),
			   
	html5: 'abbr article aside audio canvas datalist details figure footer header hgroup mark menu meter nav output progress ruby rt section time video'.split(' '),
	
	html: document.childNodes[1],
	
	/**
	 * Adiciona uma classe na tag HTML
	 */
	addClass: function(classe){
	
		if(this.html.className) this.html.className += ' ' + classe;
		else this.html.className = classe;
	},
	
	/**
	 * Define a classe para o OS atual
	 */
	osSelector: function(){
		var ua = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(this.ua);
		this.addClass(ua[1]);
	},
	
	/**
	 * Define a classe para o browser atual e a sua versão
	 */
	browserSelector: function(){
		
		var ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(this.ua);
		
		this.addClass(ua[1]);
				
		/**
		 * Fix safari
		 */
		if(ua[1] == 'safari') this.addClass(ua[1] + '-' + ua[2].substring(0, 1));
		else this.addClass(ua[1] + '-' + parseInt(ua[2]));

		/**
		 * Condicionais IE
		 */
		if(ua[1] == 'ie'){
		
			for(var ver = 3; ver < 10; ver++) {
				if(parseInt(ua[2]) < ver) this.addClass('lt-ie-' + ver);		
			}
		}
	},
	
	/**
	 * Define a classe para o tamanho da tela atual
	 * Suporta redimensionamento...
	 */
	screenSelector: function(){
	
		var w = window.outerWidth || this.html.clientWidth;
		
		/**
		 * Remove a classe atual
		 */
		this.html.className = this.html.className.replace(/ (screen|width)-\d+/g, '');
		
		this.addClass('width-' + w);
		
		/**
		 * Processa cada resolução disponível
		 */
		for(var i = 0; i < this.screens.length; i++){
		
			if(w <= this.screens[i]){
				this.addClass('screen-' + this.screens[i]);
				break;
			}
		}
		
	},
	
	/**
	 * Define quais itens do CSS3 funcionam no navegador e adiciona a classe correspodente
	 */
	css3Selector: function(){
		
		var vendors = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'],
		l = vendors.length,
		
		style = document.createElement('div').style,
		
		/**
		* Faz o teste do suporte a propriedade
		*/	
		test = function(item){
			
			/**
			* Upercase nos itens
			*/
			item = item.replace(/(^|-)[a-z]/ig, function(val){
				return val.replace('-', '').toUpperCase();
			});

			if(item in style) return true;
			
			/**
			 * Checa com os verdors
			 */
			for(var i = 0; i < l; i++){
				if(vendors[i] + item in style) return true;			
			}
			
			return false;
		}
		
		/**
		* Começa a checagem
		*/
		var i = this.css3.length;
		
		while(i--){
			var c = this.css3[i]; if(!test(c)) c = 'sem-' + c;
			this.addClass(c);
		}
		
		/**
		 * Demais pripriedades que não funcionam no loop :(
		 */
		var multiBackgrounds = function(){
			style.cssText = 'background: url(//:), url(//:), white url(//:)';
			return new RegExp('(url\\s*\\(.*?){3}').test(style.background);
		};
		
		var gradientes = function(){
		
			var str1 = 'background-image:',
				str2 = 'gradient(linear, left top, right bottom, from(#9f9), to(white));',
				str3 = 'linear-gradient(left top, #9f9, white);';
			
			style.cssText = 
				str1 + str2
				+ str1 + '-webkit-' + str2
				+ str1 + '-moz-' + str2
				+ str1 + '-khtml-' + str2
				+ str1 + '-o-' + str2
				+ str1 + '-ms-' + str2
				+ str1 + str3
				+ str1 + '-webkit-' + str3
				+ str1 + '-moz-' + str3
				+ str1 + '-khtml-' + str3
				+ str1 + '-o-' + str3
				+ str1 + '-ms-' + str3;

			return !!style.backgroundImage;
		}

		var backgroundColor = function(cor){
			style.cssText = 'background-color: ' + cor;		
			return !!style.backgroundColor;
		}
		
		/**
		 * Adiciona outras classes
		 */ 
		this.addClass( ((style.textShadow === '')? '' : 'sem-') + 'text-shadow');
		this.addClass( ((style.resize === '')? '' : 'sem-') + 'resize');
		this.addClass( ((style.opacity === '')? '' : 'sem-') + 'opacity');
		this.addClass( ((gradientes())? '' : 'sem-') + 'gradientes');
		this.addClass( ((multiBackgrounds())? '' : 'sem-') + 'multiplos-backgrounds');
		this.addClass( ((backgroundColor('rgba(0, 0, 0, 0.5)'))? '' : 'sem-') + 'rgba');
		this.addClass( ((backgroundColor('hsla(120, 40%, 100%, 0.5)'))? '' : 'sem-') + 'hsla');
	},
	
	/**
	 * Cria alguns elementos HTML5 em navegadores antigos
	 */
	criarHtml5: function(){

        var i = this.html5.length;
        while( i-- ){
            elem = document.createElement( this.html5[i] );
        }
	}
};

/**
 * Inicia TUDO
 */
Linha.osSelector();
Linha.browserSelector();
Linha.screenSelector();
Linha.css3Selector();
Linha.criarHtml5();

window.onresize = function(){
	Linha.screenSelector();
};