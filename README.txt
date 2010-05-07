
LINHA FRAMEWORK - versão 1.2 (ALPHA)
by Mateus Souza - mateussouzaweb@gmail.com | http://www.mateussouza.com

======= Licença ========
LICENÇA: MIT and GPL License - http://www.opensource.org/licenses/mit-license.php || http://www.gnu.org/licenses/gpl.html

======= Change-log ========
1.2
---
* Atualização para os plugins: Linha Acord, Linha Focuss, Linha Form, Linha Modal, Linha Nav, Linha Slidetabs e Linha Tooltip
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
LIVE
A partir da versão 1.2 os plugins para jQuery terão monitoramente live,
ainda não descobrir uma forma mais eficaz do que a atual para o monitoramento do DOM.
Basicamente é feito uma checagem em um intervalo determinado tem tempo para a chegagem.

Caso deseje desativar a função para monitoramento live, sete "live" para "false" nas opções do plugin.
Com o live=false, use $('elemento-adicionado').trigger('iniciaPluginX'); quando ele for inserido na página
por meio de ajax ou html(); por exemplo...assim terá o mesmo efeito do monitoramente live, mais de forma manual.
Lembre-se que o seletor para o trigger deve ser o mesmo usado em sua nova instância do plugin, para que o plugin
recupere as opções setadas para este elemento.

Há ainda uma opção, não é uma boa prática ao meu ver mais também se encaixa:
Estancie o plugin logo depois que o elemento for adicionado a página. EX:
$('body').append('meu-elemento');
$('meu-elemento').pluginX({
	opções....
});
Assim o resultado será o mesmo das duas opções acima;

CALLBACK
Todos os plugins oferem o callback para personalização de eventos.

		
		
		