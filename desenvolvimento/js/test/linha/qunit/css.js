L.ready(function(){

	module('CSS');
	
	test('hasClass', function(){
		
		expect(2);
	
		equal(L('#css').hasClass('has-class'), true, 'Checa se tem a classe no elemento, método simples');
		equal(L('#css').hasClass(/(-class)/g), true, 'Checa se tem alguma classe que bate com o regex');
		
	});
	
	test('addClass', function(){
		
		expect(1);
		
		L('#css').addClass('add-class');
		equal(L('#css').hasClass('add-class'), true, 'Checa se tem a classe que foi adicionada agora, no elemento');
		
	});
	
	test('removeClass', function(){
	
		expect(1);
		
		L('#css').removeClass('remove-class');
		equal(L('#css').hasClass('remove-class'), false, 'Checa se ainda tem a classe que foi removida no elemento');
	
	});
	
	test('toggleClass', function(){
		
		expect(2);
		
		L('#css').toggleClass('toggle-class');
		equal(L('#css').hasClass('toggle-class'), false, 'Checa se ainda tem a classe que foi "togglada" no elemento');
		
		L('#css').toggleClass('toggle-class');
		equal(L('#css').hasClass('toggle-class'), true, 'Checa se agora tem a classe que foi "togglada" no elemento');
	
	});
	
	test('css', function(){
		
		expect(3);
		
		L('#css').css('margin-bottom', 0);
		
		notEqual(L('#css').css('color'), undefined, 'Recupera a cor do texto e checa se o valor não é undefined');
		
		L('#css').css({
			color: 'green',
			marginBottom: '10px',
			'padding-top': '5px'
		});
		
		notEqual(L('#css').css('marginBottom'), 0, 'Checa se o valor de marginBottom não é igual a zero, depois de ter sido alterado');
		
		deepEqual(L('#css').css(['margin-bottom', 'paddingTop']), ['10px', '5px'], 'Recupera múltiplos valores de CSS')
		
	});
	
	test('offset', function(){
		
		expect(2);
		
		notEqual(L('#offset').offset().top, 0, 'Recupera o offsetTop do elemento');
		equal(L('#offset').offset().left, 0, 'Recupera o offsetLeft do elemento');
		
	});
	
	test('position', function(){
		
		expect(2);
		
		equal(L('#position').position().top, 10, 'Recupera o position, checando se o valor é o correto');
		
		L('#offset').css('paddingTop', '25px');
		L('#position').css('marginTop', '10px');
		
		equal(L('#position').position().top, 25, 'Recupera o position, depois de ter alterado a posição, checando se o valor é o correto');
		
	});
	
});