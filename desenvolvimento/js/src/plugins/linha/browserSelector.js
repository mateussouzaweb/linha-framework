/**
 * Linha Browser Selector 1.0
 */
L.extend({
	
	/**
	 * User Agent e HTML Node
	 */
	ua: navigator.userAgent.toLowerCase(),
	
	html: document.childNodes[1],
	
	/**
	 * Classes CSS
	 */
	screens: [320, 480, 640, 768, 1024, 1280, 1440, 1680, 1920],
	
	css3: 'background-origin background-clip background-size box-sizing box-shadow box-reflect border-image border-radius columns perspective transform transition'.split(' '),
		
	/**
	 * Define a classe para o OS atual
	 */
	osSelector: function(){
		var ua = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(this.ua);
		L(this.html).addClass(ua[1]);
		
		return this;
	},
	
	/**
	 * Define a classe para o browser atual e a sua versão
	 */
	browserSelector: function(){
		
		var html = L(this.html),
			ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(this.ua);
		
		html.addClass(ua[1]);
				
		/**
		 * Fix safari
		 */
		if(ua[1] == 'safari') html.addClass(ua[1] + '-' + ua[2].substring(0, 1));
		else html.addClass(ua[1] + '-' + parseInt(ua[2]));

		/**
		 * Condicionais IE
		 */
		if(ua[1] == 'ie'){
		
			for(var ver = 3; ver < 10; ver++) {
				if(parseInt(ua[2]) < ver) html.addClass('lt-ie-' + ver);		
			}
		}
		
		return this;
	},
	
	/**
	 * Define a classe para o tamanho da tela atual
	 * Suporta redimensionamento...
	 */
	screenSelector: function(){
		
		var html = L(this.html),
			w = window.outerWidth || html[0].clientWidth;
		
		/**
		 * Remove a classe atual
		 */
		this.html.className = this.html.className.replace(/(\s)screen-[0-9]+/ig, '').trim();
		
		/**
		 * Processa cada resolução disponível
		 */
		for(var i = 0; i < this.screens.length; i++ ){
			
			if(w <= this.screens[i]){
				html.addClass('screen-' + this.screens[i]);
				break;
			}
		
		}
		
		return this;	
	},
	
	/**
	 * Define quais itens do CSS3 funcionam no navegador e adiciona a classe correspodente
	 */
	css3Selector: function(){
		
		var html = L(this.html),
			vendors = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'],
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
			html.addClass(c);
		}
		
		// Demais pripriedades que não funcionam no loop :(
		 
		/**
		 * Multi-backgrounds
		 */ 
		var multiBackgrounds = function(){
			style.cssText = 'background: url(//:), url(//:), white url(//:)';
			return new RegExp('(url\\s*\\(.*?){3}').test(style.background);
		};
		
		/**
		 * Gradientes
		 */
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
		
		/**
		 * Background Color - rgba, hsla
		 */
		var backgroundColor = function(cor){
			style.cssText = 'background-color: ' + cor;		
			return !!style.backgroundColor;
		}
		
		/**
		 * Font-face
		 * http://paulirish.com/2009/font-face-feature-detection/
		 */
		var fontFace = function(){
		
			var head = document.getElementsByTagName('head')[0],
				sheet,
				style = document.createElement("style"),
				impl = document.implementation || { hasFeature: function() { return false; } };
			
			/**
			 * Seta o tipo e insere no head
			 */	
			style.type = 'text/css';
			
			head.insertBefore(style, head.firstChild);
			sheet = style.sheet || style.styleSheet;
 			
 			/**
 			 * Checa se tem CSS2
 			 */
 			var supportAtRule = impl.hasFeature('CSS2', '') ?
        	
        	// True
        	function(rule){
        	
            	if (!(sheet && rule)) return false;
            	var result = false;
            	
            	try {
                	sheet.insertRule(rule, 0);
                	result = !(/unknown/i).test(sheet.cssRules[0].cssText);
                	sheet.deleteRule(sheet.cssRules.length - 1);
            	} catch(e) { }
            
            return result;
        	}:
        	
        	// False
        	function(rule) {
            	
            	if (!(sheet && rule)) return false;
            	sheet.cssText = rule;
 
            	return sheet.cssText.length !== 0 && !(/unknown/i).test(sheet.cssText) &&
              		sheet.cssText
                	.replace(/\r+|\n+/g, '')
                	.indexOf(rule.split(' ')[0]) === 0;
        	};
 
			return supportAtRule('@font-face { font-family: "font"; src: "font.ttf"; }');
		}
		
		/**
		 * Adiciona outras classes
		 */ 
		html.addClass( ((style.textShadow === '')? '' : 'sem-') + 'text-shadow');
		html.addClass( ((style.resize === '')? '' : 'sem-') + 'resize');
		html.addClass( ((style.opacity === '')? '' : 'sem-') + 'opacity');
		html.addClass( ((gradientes())? '' : 'sem-') + 'gradientes');
		html.addClass( ((multiBackgrounds())? '' : 'sem-') + 'multiplos-backgrounds');
		html.addClass( ((backgroundColor('rgba(0, 0, 0, 0.5)'))? '' : 'sem-') + 'rgba');
		html.addClass( ((backgroundColor('hsla(120, 40%, 100%, 0.5)'))? '' : 'sem-') + 'hsla');
		html.addClass( ((fontFace())? '' : 'sem-') + 'font-face');
	
		return this;
	}
	
});

/**
 * Inicia Teste CSS
 */
L.osSelector()
 .browserSelector()
 .css3Selector()
 .screenSelector();

L(window).bind('resize', function(){
	L.screenSelector();
});