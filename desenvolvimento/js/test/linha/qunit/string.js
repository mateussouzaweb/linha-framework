module('String');

test('test', function(){
	
	expect(1);
	equal('Um texto exemplo'.test('texto'), true);

});

test('toArray', function(){
	
	expect(1);
	
	var a = 'string'.toArray();

	equal(L.is('array', a), true);

});

test('toUri', function(){
	
	expect(1);
	equal('Uma nova URL'.toUri(), 'uma-nova-url', 'Deve ser igual');

});
	
test('trim', function(){
	
	expect(1);
	equal('   Trim!!!!  '.trim(), 'Trim!!!!');

});