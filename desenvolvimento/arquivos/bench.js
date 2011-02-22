/**
 * Basic script to benchmark JS
 */
window.Bench = {
	
	numberTests: 1000,
	
	tests: {},
	
	/**
	 * Add one test
	 */
	add: function(name, fn){
	
		this.tests[name] = fn;
		
		return this;
	},
	
	/**
	 * Run one specific tests
	 * @param string item
	 */
	run: function(item){
		
		if(!this.tests[item]) return false;
		
		/**
		 * Time
		 */
		var i = this.numberTests,
			time = new Date();
			
		while(i--) this.tests[item].call();
			
		return new Date() - time + 'ms';
	},
	
	/**
	 * Limpa todos os testes
	 */
	clearAll: function(){
		
		this.tests = {};
		
		return this;		
	},
	
	/**
	 * Run all tests
	 */
	runAll: function(){
		
		var results = {};
		
		/**
		 * Executa cada teste e grava o resultado
		 */
		for(var t in this.tests){
			results[t] = this.run(t);
		}
		
		return results;
	}
}