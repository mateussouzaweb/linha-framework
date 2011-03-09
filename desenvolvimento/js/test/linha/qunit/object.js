module('Object');

test('clean', function(){

	expect(1);
	
	deepEqual(
		Object.clean({'um': 1, 'limpo': true, 'teste': null, 'exemplo': undefined}),
		{'um': 1, 'limpo': true},
		'Limpa o objeto'	
	);	

});

test('each', function(){
	
	expect(2);
	
	var o = {};
	
	ok(Object.each({'um': 1, 'dois': 2, 'tres': 3}, function(value, key, object){
		o[key] = value;
	}), 'Se o Mootools for carregado depois do Linha, este teste dará erro, porque o comportamento é diferente');
	
	deepEqual(o, {'um': 1, 'dois': 2, 'tres': 3}, 'Mesmo teste do Object.forEach');
	
});

test('every', function(){
	
	expect(1);
	
	var p = Object.every({'um': 1, 'dois': 2, 'tres': 3}, function(value){
		return value < 5;
	});

	equal(p, true, 'Todos são menores que cinco');

});

test('filter', function(){
	
	expect(1);
	
	var f = Object.filter({'um': 1, 'dois': 2, 'tres': 3, 'exemplo': 'doido'}, function(value){
		return typeof(value) == 'string';
	});
	
	deepEqual(f, {'exemplo': 'doido'}, 'Limpa os valores que não são strings');

});

test('forEach', function(){
	
	expect(1);
	
	var o = {};
	
	Object.forEach({'um': 1, 'dois': 2, 'tres': 3}, function(value, key, object){
		o[key] = value;
	});
	
	deepEqual(o, {'um': 1, 'dois': 2, 'tres': 3}, 'var o deve ter os mesmo itens do Object.forEach');

});

test('keyOf', function(){
	
	expect(1);
	equal(Object.keyOf({'um': 1, 'dois': 2, 'tres': 3}, 2), 'dois', 'Retorna a chave de acordo com o valor');

});

test('keys', function(){
	
	expect(1);
	deepEqual(Object.keys({'um': 1, 'dois': 2, 'tres': 3}), ['um', 'dois', 'tres'], 'Retorna um array com as chaves do objeto');

});

test('map', function(){

	expect(1);

	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	
	obj = Object.map(obj, function(value){
		return value * 2;
	});

	deepEqual(obj, {'um': 2, 'dois': 4, 'tres': 6}, 'Multiplica as chaves do objeto');

});

test('merge', function(){

	expect(1);

	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	Object.merge(obj, {'quatro': 4, 'cinco': 5});

	deepEqual(obj, {'um': 1, 'dois': 2, 'tres': 3, 'quatro': 4, 'cinco': 5}, 'Junta dois objetos');

});

test('remove', function(){
	
	expect(1);
	
	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	Object.remove(obj, 'dois');
	
	deepEqual(obj, {'um': 1, 'tres': 3}, 'Remove uma chave do objeto');

});

test('size', function(){
	
	expect(1);
	equal(Object.size({'um': 1, 'dois': 2, 'tres': 3}), 3);

});

test('toArray', function(){
	
	expect(1);
	deepEqual(Object.toArray({'um': 1, 'dois': 2, 'tres': 3}), [1, 2, 3], 'Transforma um objeto em uma array');

});

test('values', function(){
	
	expect(1);
	deepEqual(Object.toArray({'um': 1, 'dois': 2, 'tres': 3}), [1, 2, 3], 'Transforma um objeto em uma array, é o mesmo que Object.toArray()');

});