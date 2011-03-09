L.ready(function(){

	module('Events');
	
	var statusBind = true;
	var statusBindNS = true;
	
	test('bind', function(){
		
		expect(4);
	
		L('#bind').bind('click', function(e){
			
			statusBind = (statusBind)? false : true;
			
			e.preventDefault();
			return false;
	
		});
		
		L('#bind').trigger('click');
		equal(statusBind, false, 'Checa se o valor do status bate');
		
		L('#bind').trigger('click');
		equal(statusBind, true, 'Checa se o valor do status bate');
		
		
		//Namespace
		L('#bind').bind('namespace.click', function(e){
			
			statusBindNS = (statusBindNS)? false : true;
			
			e.preventDefault();
			return false;
	
		});
		
		L('#bind').trigger('namespace.click');
		equal(statusBindNS, false, 'Checa se o valor do status bate, usando namespace');
		
		L('#bind').trigger('namespace.click');
		equal(statusBindNS, true, 'Checa se o valor do status bate, usando namespace');
		
	});
	
	test('unbind', function(){
		
		expect(1);
		
		statusBind = false;
		
		L('#bind').unbind('click');
		L('#bind').trigger('click');
		
		notEqual(statusBind, true, 'Checa se o valor do status bate, se bater o unbind não funciona');
		
	});
	
	var statusDelegate = true;
	var li = L('li').eq(0);
	
	test('delegate', function(){
	
		expect(2);
		
		L('ul').delegate('li', 'click', function(e){
		
			statusDelegate = (statusDelegate)? false : true;

			e.preventDefault();
			return false;
			
		});
		
		//Prepara para adicionar novos itens
		L('#add').bind('click', function(){
		
			var html = L('ul').eq(0).html();
			L('ul').eq(0).html( html + '<li><a href="#">Novo Item</a></li>');
		
		});
		
		//Faz os testes
		li.trigger('delegate.click');
		equal(statusDelegate, false, 'Checa se o valor do status bate');
		
		L('#add').trigger('click');
		L('li').eq(4).trigger('delegate.click');
		equal(statusDelegate, true, 'Checa se o valor do status bate');
		
	});
	
	test('undelegate', function(){
		
		expect(1);
		
		statusDelegate = false;
		
		L('ul').undelegate('li', 'click');
		li.trigger('delegate.click');
		
		notEqual(statusDelegate, true, 'Checa se o valor do status bate, se bater o undelegate não funciona');
			
	});
	
});