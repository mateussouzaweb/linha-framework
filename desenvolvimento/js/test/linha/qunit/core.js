module('Core');

test('Básico', function(){
	
	expect(3);
	
	ok(L, 'L');
	ok(Function.prototype.extend, 'Extend');
	ok(Function.prototype.implement, 'Implement');

});

test('L.extend', function(){
	
	expect(1);
	
	var obj = {
		exemplo: true, 
		funcao: function(){ return true; } 
	};
	
	var obj2 = {
		exemplo: false,
		funcao: function(){ return true; },
		outro: 20
	};
	
	L.extend( obj, {exemplo: false, outro: 20});
	
	equal( obj.exemplo, obj2.exemplo, 'obj depois do extend, deve ter os mesmos valor do obj2');
	
});

test('L.is', function(){
	
	expect(24);
	
	// TRUE
	equal( L.is('empty', []), true, 'Empty' );
	equal( L.is('node', document.getElementsByTagName('head')[0]), true, 'Node' );
	equal( L.is('array', [1, 2, 3]), true, 'Array' );
	equal( L.is('object', {teste: 'exemplo'}), true, 'Object' );
	equal( L.is('function', function(){ return false; }), true , 'Function');
	equal( L.is('string', 'algum texto'), true, 'String' );
	equal( L.is('number', 12346 ), true, 'Numero');
	equal( L.is('date', new Date() ), true, 'Data');
	equal( L.is('boolean', true ), true, 'Boolean' );
	equal( L.is('regex', /.+/g ), true, 'Regex' );
	equal( L.is('null', null ), true, 'Nulo' );
	equal( L.is('undefined', undefined), true, 'Indefinido' );
	
	// FALSE
	equal( L.is('empty', [1, 2, 3]), false, 'NÃO Empty' );
	equal( L.is('node', window), false, 'NÃO Node' );
	equal( L.is('array', {1: 'um', 2: 'dois'}), false, 'NÃO Array' );
	equal( L.is('object', ['teste', 'exemplo']), false, 'NÃO Object' );
	equal( L.is('function', true), false , 'NÃO Function');
	equal( L.is('string', null), false, 'NÃO String' );
	equal( L.is('number', [] ), false, 'NÃO Numero');
	equal( L.is('date', new Array() ), false, 'NÃO Data');
	equal( L.is('boolean', 2 ), false, 'NÃO Boolean' );
	equal( L.is('regex', '/.+/g' ), false, 'NÃO Regex' );
	equal( L.is('null', undefined ), false, 'NÃO Nulo' );
	equal( L.is('undefined', 'texto'), false, 'NÃO Indefinido' );
});

asyncTest('L.delay', function(){
	
	expect(1);
	
	L.delay(function(argumento){
	
		equal(argumento, true, 'Aqui o argumento deve estar presente');
		start();
		
	}, 200, true);
	    	
});

asyncTest('L.ready', function(){
	
	expect(2);
	
	L.ready(function(){
		
		equal(L.isReady, true, 'Checa o valor de isReady');
		ok(true, 'Aqui o DOM já está carregado');
		
		start();
		
	});
	    	
});