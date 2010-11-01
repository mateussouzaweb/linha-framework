LINHA FRAMEWORK - 1.3
=====================
http://www.linhaframework.com || by Mateus Souza - mateussouzaweb@gmail.com | http://www.mateussouza.com

Licença
-----------
MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html

MONITORAMENTO LIVE
------------------
A partir da versão 1.2 os plugins para jQuery terão monitoramente live, ainda não descobri uma forma mais eficaz do que a atual para o monitoramento do DOM.
Basicamente é feito uma checagem em um intervalo determinado de tempo.

Para ativar o monitoramento apenas sete a opção "live" para "true" no plugin que deseja usar, por exemplo:

<pre>
$('meu-elemento').pluginX({
	live: true
});
</pre>

Há ainda a opção de alterar o intervalo de tempo para a checagem...o padrão é 100 milisegundos (1/10 de um segundo).
Se desejar alterar, a opção é "liveTempo", mais lembre-se que deve ser em milisegundos.

Alternativamente você pode fazer o monitoramento de modo manual.

Use **$('elemento-adicionado').trigger('iniciaPluginX');** quando ele for inserido na página por meio de ajax ou html(); por exemplo...assim terá o mesmo efeito do monitoramente live, mais de forma manual.

Lembre-se que o seletor para o trigger deve ser o mesmo usado em sua nova instância do plugin, para que o plugin recupere as opções setadas para este elemento. EX:

<pre>
$('meu-elemento').pluginX({
	opções...
});
//Outras funções
$('button').click(function(){
	$('body').append('meu-elemento');
	$('meu-elemento').trigger('iniciaPluginX'); //Assim ele inicia o plugin com as opções setadas anteriormente
});
</pre>

Há ainda uma terceira opção, não é uma boa prática ao meu ver mais também se encaixa:

Estancie o plugin logo depois que o elemento for adicionado a página. EX:

<pre>
$('body').append('meu-elemento');
//Inicie o plugin agora
$('meu-elemento').pluginX({
	opções....
});
</pre>

Assim o resultado será o mesmo das duas opções acima;

LIVE
------

Diferentemente de *MONITORAMENTO* LIVE, os plugins com live não precisa de nada descrito no *MONITORAMENTO* LIVE para se ter o mesmo efeito. Estes são feitos de forma automática.
Para melhor esclarecimento, o *MONITORAMENTO LIVE* é necessário em alguns plugins pois eles necessitam de um "setup" antes de entrar em uso, o que já não ocorre em um plugin LIVE.

Sendo um pouco mais prático um accordion precisa de um "setup", ou seja, definir qual parte do accordion será a inicial e etc. Já um tooltip não precisa, pois o setup é feito assim que ele é disparado.

CALLBACK
--------

Todos os plugins oferem o callback para personalização de eventos. Os callbacks possuem argumentos personalizados, mas sempre está relacionado ao elemento do plugin + opções do plugin.
p. Em cada callback é possível usar o elemento **$(this)** ou **this** na função. Este elemento será o que disparou o evento ou o elemento do plugin. Mais não fica só por ai, como citei há os argumentos. Ao se utilizar dos argumentos, use da seguinte maneira:

<pre>
$('meu-elemento').pluginX({
	opções...
	//a, b c, d, e, o - são os argumentos do plugin, cada plugin informará quais são esses argumentos na documentação do própio.
	//o - sempre será o último dos argumentos, ele é as opções do plugin 
	onFazAlgo: function(a, b, c, d, e, o){
		alert($(this));
		alert(a); //será o mesmo que alert($(this));
	}
});
</pre>

Para os argumentos você pode definir o nome que quiser, no exemplo eu usei a, b, c...mais poderia ser arg1, arg2, arg3...não importa se é a ou arg1, sempre retornará o mesmo valor.

Se você não entendeu nada não se preocupe, quando se aprofundar em um plugin você vai tirar isso de letra...