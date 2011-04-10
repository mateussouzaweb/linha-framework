module('Array');
	
test('clean', function(){

	expect(1);
	
	deepEqual([1, null, undefined, 'exemplo', false].clean(), [1, 'exemplo', false], 'Limpa a array');

});

test('clone', function(){
	
	expect(1);
	
	var a = [1, 2, 3];
	var b = a.clone();
	
	a.reverse();
	
	notDeepEqual(a, b, 'Checa se a array clonada é igual a original, que foi "reversada"');
	
});

test('each', function(){

	expect(2);
	
	var a = [];
	
	ok([1, 2, 3].each(function(item, i, array){
		a.push( item );
	}));
	
	deepEqual(a, [1, 2, 3], 'É o mesmo teste do do forEach');
});

test('every', function(){

	expect(1);
	
	var p = [2, 4, 5, 10].every(function(value){
		return value > 1;
	});
	
	equal(p, true, 'Todas as opções são maiores que 1');

});

test('filter', function(){

	expect(1);
	
	var f = [1, 2, 3, 4, 'exemplo', 'doido'].filter(function(value){
		return typeof(value) != 'string';
	});

	deepEqual(f, [1, 2, 3, 4], 'só passa o que for número');

});

test('forEach', function(){

	expect(1);
	
	var a = [];
	
	[1, 2, 3].forEach(function(item, i, array){
		a.push( item );
	});
	
	deepEqual(a, [1, 2, 3], 'var a deve ter os mesmos itens do forEach');

});

test('indexOf', function(){

	expect(1);
	equal(['um', 'exemplo', 'de', 'indexOf'].indexOf('exemplo'), 1, 'Esperado = 1');

});

test('map', function(){

	expect(1);

	var map = [1, 2, 3, 4, 5].map(function(value){
		return value * 2;
	});

	deepEqual(map, [2, 4, 6, 8, 10] ,'Depois do mapeamento os valores devem ser multiplicados por 2');

});

test('remove', function(){

	expect(1);
	deepEqual(['um', 'exemplo', 'de', 'remove'].remove('exemplo'), ['um', 'de', 'remove'], 'Remove um item da array');

});

test('size', function(){

	expect(1);
	equal([1, 2, 3].size(), 3, 'Retorna o numero de itens na array');

});