Linha.extend({
	
	head: document.getElementsByTagName('head')[0],
	
	isReady: false,
	
	fila: [],
	
	/**
	 * Carrega um script Javascript na página
	 * @param string src
	 * @param string callback
	 */
	script: function(src, callback){
						
		/**
		 * Checa se o DOM está pronto para fazer a inserção
		 */
		if(!this.isReady){
			
			var args = arguments,
			self = this;
			
			/**
			 * Adiciona à fila
			 */
			this.fila.push(function(){
				self.script.apply(self, args);				
			});
			
			return this;
		}
		
		/**
		 * Cria o script
		 */	
		var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.async = true;
		
		/**
		 * Adicionar o evento quando completar
		 */
		s.onreadystatechange = s.onload = function(){
			
			var state = s.readyState;
			
			if(!state || /loaded|complete/.test(state)){
			
				/**
		 		 * Executa a função
		 		 */
				if(typeof(callback) === 'function') callback.call();	
			}
			
			/**
			 * Fix de memória IE
			 */
			s.onload = s.onreadystatechange = null;
		}; 
			
		this.head.appendChild(s);
		
		return this;
	},
	
	/**
	 * Carrega um estilo CSS na página
	 * @param string src
	 * @param string media
	 */
	css: function(src, media){
	
		var l = document.createElement('link');
			l.type = 'text/css';
			l.rel = 'stylesheet';
			l.href = src;
			l.media = (media || 'screen');
						
		this.head.appendChild(l);
		
		return this;
	}
});

/**
 * Libera Ready
 */
setTimeout(function(){

	Linha.isReady = true;
	for(fn in Linha.fila) Linha.fila[fn].call();
		
}, 200);