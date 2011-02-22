/** 
 * ========================================
 * Teste CORE
 * ========================================
 */
Bench.clearAll()
.add('delay', function(){
	
	L.delay(function(){
		//console.log('foi!');
	}, 200);
		
}).
add('extend', function(){
	
	L.extend({exemplo: true, funcao: function(){ return true; } });
	//console.log(L);
		
})
.add('is', function(){
	
	//console.log(
		L.is('empty', []),
		L.is('node', document.getElementsByTagName('head')[0]),
		L.is('array', [1, 2, 3]),
		L.is('object', {teste: 'exemplo'}),
		L.is('function', function(){ return false; }),
		L.is('string', 'algum texto'),
		L.is('number', 12346 ),
		L.is('date', new Date() ),
		L.is('boolean', true ),
		L.is('regex', /.+/g ),
		L.is('null', null ),
		L.is('undefined', undefined)
	//);
	
});

console.log('Core:', Bench.runAll());

/**
 * ========================================
 * Teste STRING
 * =========================================
 */
Bench.clearAll()
.add('hyphenate', function(){

//	console.log('Uma nova URL'.hyphenate());
	
})
.add('test', function(){
	
//	console.log('Um texto exemplo'.test('texto'));

})
.add('toArray', function(){
	
//	console.log('string'.toArray());
	
})
.add('trim', function(){
	
//	console.log('   Trim!!!!  '.trim());
	
});

console.log('String', Bench.runAll());

/**
 * ========================================
 * Testes ARRAY
 * ========================================
 */
Bench.clearAll()
.add('every', function(){

	var p = [2, 4, 5, 10].every(function(value){
		return value > 1;
	});
	//console.log(p);
	
})
.add('filter', function(){
	
	var f = [1, 2, 3, 4, 'exemplo', 'doido'].filter(function(value){
		return typeof(value) != 'string';
	});
	//console.log(f);
	
})
.add('forEach', function(){

	[1, 2, 3].forEach(function(item, i, array){
		//console.log(item, i, array);
	});

})
.add('indexOf', function(){
	
	//console.log(['um', 'exemplo', 'de', 'indexOf'].indexOf('exemplo')); //Esperado = 1
	
})
.add('map', function(){

	var map = [1, 2, 3, 4, 5].map(function(value){
		return value * 2;
	});
	//console.log(map);

})
.add('clean', function(){
	
	//console.log([1, null, undefined, 'exemplo', false].clean());
	
})
.add('each', function(){

	[1, 2, 3].each(function(item, i, array){
		//console.log(item, i, array);
	});
	
})
.add('remove', function(){
	
	//console.log(['um', 'exemplo', 'de', 'remove'].remove('exemplo')); //Esperado = ['um', 'de', 'remove']
	
})
.add('size', function(){
	
	//console.log([1, 2, 3].size());
	
});

console.log('Array', Bench.runAll());

/**
 * ========================================
 * Testes OBJECT
 * ========================================
 */
Bench.clearAll()
.add('clean', function(){
	
	//console.log(Object.clean({'um': 1, 'limpo': true, 'teste': null, 'exemplo': undefined}));
	
})
.add('each', function(){
	
	Object.each({'um': 1, 'dois': 2, 'tres': 3}, function(value, index, object){
		//console.log(value, index);
	});
	
})
.add('every', function(){

	var p = Object.every({'um': 1, 'dois': 2, 'tres': 3}, function(value){
		return value < 5;
	});
	
	//console.log(p);
	
})
.add('filter', function(){

	var f = Object.filter({'um': 1, 'dois': 2, 'tres': 3, 'exemplo': 'doido'}, function(value){
		return typeof(value) != 'string';
	});
	//console.log(f);
	
})
.add('forEach', function(){
	
	Object.forEach({'um': 1, 'dois': 2, 'tres': 3}, function(value, index, object){
		//console.log(value, index);
	});
	
})
.add('keyOf', function(){

	//console.log(Object.keyOf({'um': 1, 'dois': 2, 'tres': 3}, 2));
	
})
.add('keys', function(){
	
	//console.log(Object.keys({'um': 1, 'dois': 2, 'tres': 3}));
	
})
.add('map', function(){
	
	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	
	obj = Object.map(obj, function(value){
		return value * 2;
	});
	
	//console.log(obj);
	
})
.add('merge', function(){

	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	Object.merge(obj, {'quatro': 4, 'cinco': 5});
	
	//console.log(obj);
	
})
.add('remove', function(){

	var obj = {'um': 1, 'dois': 2, 'tres': 3};
	Object.remove(obj, 'dois');
	
	//console.log(obj);

})
.add('size', function(){
	
	//console.log(Object.size({'um': 1, 'dois': 2, 'tres': 3}));
		
})
.add('toArray', function(){

	//console.log(Object.toArray({'um': 1, 'dois': 2, 'tres': 3}));

})
.add('values', function(){

	//console.log(Object.values({'um': 1, 'dois': 2, 'tres': 3}));

});

console.log('Object', Bench.runAll());