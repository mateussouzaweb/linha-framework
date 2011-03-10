/**
 * Linha Load 1.0
 */
L.extend({
	
	head: document.getElementsByTagName('head')[0],

	fila: [],
	
	/**
	 * Adiciona um item a fila de processamento
	 * @param [string] type
	 * @param [array] args
	 */
	addFila: function(type, args){

		/**
		 * Adiciona à fila
		 * JS
		 */
		if(type == 'js'){
		
			this.fila.push(function(){
				L.loadScript.apply(L, args);				
			});
		
		/**
		 * CSS
		 */
		}else if(type == 'css'){

			this.fila.push(function(){
				L.loadCss.apply(L, args);				
			});
		}
		
		return this;
	},
	
	/**
	 * Carrega scripts Javascript na página, assim que a página terminar de ser carregada
	 * @param [string - array] src
	 * @param [function] callback
	 */
	loadScript: function(src, callback){
						
		/**
		 * Checa se o DOM está pronto para fazer a inserção
		 */
		if(!this.isReady)
			return this.addFila('js', arguments);
		
		var itens = [],
			ok = 0;	
		
		/**
		 * Força array
		 */
		if(!L.is('array', src)) itens.push(src);
		else itens = src;
		
		/**
		 * Processa cada item
		 */
		itens.forEach(function(item){
			
			/**
			 * Cria o script
			 */	
			var s = document.createElement('script');
			
			s.type = 'text/javascript';
			s.src = item;
			s.async = true;
			
			/**
			 * Adicionar o evento quando completar
			 */
			s.onreadystatechange = s.onload = function(){
			
				var state = s.readyState;
			
				if(!state || state.test(/loaded|complete/)){
					
					ok++;
				
					/**
		 			 * Executa a função?
		 			 * Só executa se todos os itens foram carregados
		 			 */
		 			if(ok == itens.length && typeof(callback) === 'function')
		 				callback.call();
		 									
				}
			
				/**
				 * Fix de memória IE
				 */
				s.onload = s.onreadystatechange = null;
			};
			
			L.head.appendChild(s);

		});
		
		return this;
	},
	
	/**
	 * Carrega estilos CSS na página, assim que a página for carregada
	 * @param [string - array] src
	 * @param [string] media
	 */
	loadCss: function(src, media){
	
		/**
		 * Checa se o DOM está pronto para fazer a inserção
		 */
		if(!this.isReady)
			return this.addFila('css', arguments);
				
		/**
		 * Força array
		 */
		var itens = [];
		
		if(!L.is('array', src)) itens.push(src);
		else itens = src;
		
		/**
		 * Processa cada item
		 */
		itens.forEach(function(item){
		
			var l = document.createElement('link');
			
			l.type = 'text/css';
			l.rel = 'stylesheet';
			l.href = item;
			l.media = (media || 'screen');
			
			L.head.appendChild(l);
		
		});
		
		return this;
	}
});

/**
 * Processa a fila, se tiver...
 */
L.ready(function(){
	
	L.fila.forEach(function(item){
		item.call();
	});

});