L.ready(function(){

	module('DOM');
	
	test('selectors', function(){
		
		expect(7);
		
		equal(L('#id').length, 1, 'Seletor para IDs');
		equal(L('.class').length, 2, 'Seletor para classes');
		ok(L('span'), 'Seletor para tags');
		
		var context = L('#context')[0];
		
		equal(L('.dentro', context).length, 2, 'Seletor avançado (Class), com contexto');
		equal(L('#dentro', context).length, 1, 'Seletor avançado (ID), com contexto');
		equal(L('#fora', context).length, 0, 'Seletor avançado (ID), com contexto que deve dar erro - sem resultados, rs');
		equal(L('span', context).length, 1, 'Seletor avançado (TAG), com contexto');

	});
	
	test('each', function(){
		
		expect(1);
		
		var ok = false;
		
		L('.each').each(function(){
		
			ok = (ok) ? false : true;
			
			this.style.backgroundColor = 'red';
			
		});
		
		equal(ok, true, 'Vai alterando o valor da variável até que termine o loop');
		
	});
	test('size', function(){
		
		expect(1);
		
		equal(L('.class').size(), 2, 'Recupera o número de elementos encontrados de acordo com o seletor');
		
	});
	test('eq', function(){
		
		expect(2);
		
		var item = L('.class')[1];
		
		equal(L('.class').eq(1)[0], item, 'Itens devem ser o mesmo');
		equal(L('.class').eq(1).length, 1, 'Número de itens deve ser um');
		
	});
	
	test('first', function(){
		
		expect(2);
		
		var item = L('.class')[0];
		
		equal(L('.class').first()[0], item, 'Itens devem ser o mesmo');
		equal(L('.class').first().length, 1, 'Número de itens deve ser um');
		
	});
	
	test('last', function(){
		
		expect(2);
		
		var item = L('.class')[1];
		
		equal(L('.class').last()[0], item, 'Itens devem ser o mesmo');
		equal(L('.class').last().length, 1, 'Número de itens deve ser um');
		
	});
	
	test('html', function(){
		
		expect(2);
		
		//Opera 9.6 e IE8- retorna tags em upercase, então coloquei toLowerCase() para garantir que é igual..
		equal(L('#html').html().toLowerCase(), '<a href="#">HTML</a>'.toLowerCase(), 'Recupera o HTML do item');
		equal(L('#html').html('<b>Ha!</b>').html().toLowerCase(), '<b>Ha!</b>'.toLowerCase(), 'Seta e Recupera o HTML do item');
		
	});
	
	test('text', function(){
		
		
		expect(2);
		
		equal(L('#texto').text(), 'Texto', 'Recupera o texto do item');
		equal(L('#texto').text('Alterado').html(), 'Alterado', 'Seta e Recupera o texto do item');
			
	});
	
	test('attr', function(){
		
		expect(2);
		
		equal(L('#attr').attr('rel'), 'teste', 'Recupera o valor do atributo');
		equal(L('#attr').attr('rel', 'exemplo'), 'exemplo', 'Seta e Recupera o valor do atributo');
	
	});
	
	test('removeAttr', function(){
		
		expect(1);
		equal(L('#attr').removeAttr('title').attr('title'), null, 'Remove e tenta recuperar o valor do atributo removido');
		
	});
	
	test('data', function(){
		
		expect(3);
		
		equal(L('#data').data('rel'), 'teste', 'Recupera o valor da data');
		equal(L('#data').data('rel', 'exemplo'), 'exemplo', 'Seta e Recupera o valor da data');
		equal(L('#data').data('modelo', '1'), '1', 'Cria, Seta e Recupera o valor da data');
		
	});
	
	test('removeData', function(){
		
		expect(1);
		equal(L('#data').removeData('tipo').data('tipo'), null, 'Remove e tenta recuperar o valor da data removida');
		
	});
	
	test('val', function(){
		
		expect(7);
		
		/**
		 * Firefox 3.6 altera o valor antes de recuperar (acontece com todos os frameworks) - veja o próximo comentário
		 * Então o valor é setado primeiro, antes de testar
		 */
		L('input').val('Algum valor...');
		equal(L('input').val(), 'Algum valor...', 'Recupera o valor do input');
		
		L('#radio1').val('radio');
		equal(L('#radio1').val(), 'radio', 'Seta e recupera o valor do input:radio');
		
		L('#select1').val(1);
		equal(L('select').val(), '1', 'Recupera o valor do select');
		
		L('#select2').val(['1', '2', '3']);
		deepEqual(L('#select2').val(), ['1', '2', '3'], 'Recupera o valor do select multiplo')
		
		//Aqui que seria o erro, porque o primeiro teste já retorna o valor alterado
		L('input').val('Teste');
		equal(L('input').val(), 'Teste', 'Recupera o valor input, que foi alterado');
		
		L('#select1').val('3');
		equal(L('select').val(), '3', 'Recupera o valor do select, que foi alterado');
		
		L('#select2').val(['1', '3']);
		deepEqual(L('select').eq(1).val(), ['1', '3'], 'Recupera o valor do select múltiplo, que foi alterado');
		
	});

});