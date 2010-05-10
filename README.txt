
LINHA FRAMEWORK - versão 1.2 (ALPHA)
by Mateus Souza - mateussouzaweb@gmail.com | http://www.mateussouza.com

======= Licença ========
LICENÇA: MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html

======= Change-log ========
1.2
---
* Linha Form renomeado pra Linha Valida(o nome tem mais relação com a função do plugin)
* Atualização para os plugins: Linha Acord, Linha Focuss, Linha Modal, Linha Nav, Linha Slidetabs, Linha Tooltip e Linha Form(agora chamado Valida), 
* Remoção de estilos para IE6 e Mobile - não tem muita utilidade :)
* Grid CSS fica em um novo arquivo css (grid.css)
* Otimização de CSS
* Introdução/Suporte a HTML5
* Reset.css com suporte a HTML5
* Adicionado estilos básicos para html5 (html5.css)	

1.1
---
* Alguns fixs sem importancia :)
* Implementação de css para tabelas (<table>)
* Tamanho de fontes para small e big (<small><big>)
* Estilos hr (<hr/>)
* Estilos para iframe (<iframe>)
* Fim do suporte para modelos
* Adicionado suporte a grid 12, 16 e 24 colunas
* Adição de Classes fix: .primeiro e .ultimo
* Atualização versões plugins js

1.0
---
* Inicial
		
======= Algumas Considerações ========
MONITORAMENTO LIVE
A partir da versão 1.2 os plugins para jQuery terão monitoramente live,
ainda não descobri uma forma mais eficaz do que a atual para o monitoramento do DOM.
Basicamente é feito uma checagem em um intervalo determinado tem tempo para a chegagem.
Para ativar o monitoramento apenas sete a opção "live" para "true" no plugin que deseja usar, por exemplo:
$('meu-elemento').pluginX({
	live: true
});
Há ainda a opção de alterar o intervalo de tempo para a checagem...o padrão é 100 milisegundos (1/10 de um segundo).
Se desejar alterar, a opção é "liveTempo", mais lembre-se que deve ser em milisegundos. 

Alternativamente você pode fazer o monitoramento de modo manual.
Use $('elemento-adicionado').trigger('iniciaPluginX'); quando ele for inserido na página
por meio de ajax ou html(); por exemplo...assim terá o mesmo efeito do monitoramente live, mais de forma manual.
Lembre-se que o seletor para o trigger deve ser o mesmo usado em sua nova instância do plugin, para que o plugin
recupere as opções setadas para este elemento. EX:
$('meu-elemento').pluginX({
	opções...
});
//Outras funções
$('button').click(function(){
	$('body').append('meu-elemento');
	$('meu-elemento').trigger('iniciaPluginX'); //Assim ele inicia o plugin com as opções setadas anteriormente
});

Há ainda uma terceira opção, não é uma boa prática ao meu ver mais também se encaixa:
Estancie o plugin logo depois que o elemento for adicionado a página. EX:
$('body').append('meu-elemento');
//Inicie o plugin agora
$('meu-elemento').pluginX({
	opções....
});
Assim o resultado será o mesmo das duas opções acima;

LIVE
Diferentemente de MONITORAMENTO LIVE, os plugins com live não precisa de nada descrito no MONITORAMENTO LIVE para
se ter o mesmo efeito. Estes são feitos de forma automática.

CALLBACK
Todos os plugins oferem o callback para personalização de eventos.

		
		
		