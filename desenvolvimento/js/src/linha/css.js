Linha.extend({
	
	/**
	 * Faz o regex para procura de uma class
	 * @param string name
	 */
	_regexClass: function(name){
		return new RegExp("(^|\\s)" + name + "(\\s|$)")
	},
	
	/**
	 * Checa se já tem a classe no elemento
	 * @param object elem
	 * @param string name
	 */
	_hasClass: function(elem, name){

		if( !this.is(name, 'function') ) name = this._regexClass(name);
		
		return name.test(elem.className);
	},
	
	/**
	 * Adiciona classes ao elemento
	 * @param object elem
	 * @param string name
	 */
	_addClass: function(elem, name){
		
		var self = this;

		return this.each(elem, function(){
			!self._hasClass(this, name) && (this.className += (this.className ? ' ' : '') + name);
		});
	},
	
	/**
	 * Remove classes do elemento
	 * @param object elem
	 * @param string name
	 */
	_removeClass: function(elem, name){
	
		var self = this;

		return this.each(elem, function(){
			this.className = self.trim( this.className.replace( self.is(name, 'string')? self._regexClass(name) : name, ' ') );
		});
	},
	
	/**
	 * Adiciona ou Remove classes do elemento
	 * @param object elem
	 * @param string name
	 */
	_toggleClass: function(elem, name){
		
		var self = this;
		
		return this.each(elem, function(){
			(self._hasClass(this, name))? self._removeClass(this, name) : self._addClass(this, name);
		});
	}
	
});