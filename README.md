LINHA FRAMEWORK - 1.3
=====================
<http://www.linhaframework.com> || by Mateus Souza - mateussouzaweb@gmail.com | <http://mateussouza.com>

### Licença
MIT and GPL License - <http://www.opensource.org/licenses/mit-license.php> || <http://www.gnu.org/licenses/gpl.html>

### Documentação
Para ver a documentação completa, visite <http://www.linhaframework.com/docs/>

LINHA FRAMEWORK JS - L()
========================
Linha JS - "L" - é um framework Javascript como os demais, bem semelhante ao jQuery e ao Mootools, por exemplo, mas, com uma grande diferença: é extremamente leve - apenas 5kb com gzip -, o que torna vantajoso o uso dele em qualquer projeto. Foi desenvolvido tendo como regras, o básico de qualquer framework JS: selecionar, editar propriedades/atributos, alterar CSS e adicionar/remover eventos a qualquer elemento com mais rapidez e facilidade.

Linha JS, também extende funções em qualquer String, Array e Objeto presente em seu código JS, semelhantemente ao trabalho que faz o Mootools ou Prototype (jQuery não faz isso). Além de tornar tudo totalmente extensível, para desenvolvimentos de plugins ou novas funcionalidades, por exemplo - Você pode extender facilmente o Linha JS, Strings, Arrays, Objetos, Datas, Numbers, Regexs, Frameworks... Um exemplo prático que Linha JS já faz é, adicionar algumas funcionalidades do Javascript 1.6 a navegadores antigos.

Conta também, desde sua versão inicial, alguns plugins para facilitar o desenvolvimento de projetos: Browser Selector e Load - lazy loading. 

<b>Linha Browser Selector</b>: adiciona classes ao HTML de acordo com o OS, navegador, resolução do navegador e propriedades CSS3 suportadas. Assim, você pode trabalhar o CSS da melhor maneira pra cada variação disponível e desejada. Ex: Estilos IE, Responsive Webdesign...

<b>Linha Load</b>: faz o carregamento dinâmico para Scripts Javascript e estilos CSS, logo após que o DOM é totalmente carregado, aumentando assim a performance do projeto drásticamente... experimente!

É claro que Linha JS é muito mais do que isto, mas vamos parar por aqui... se quiser saber mais detalhes veja a documentação. 

Compatibilidade (Principais Navegadores):

* Chrome 5+
* Firefox 2+
* Internex Explorer 6+
* Opera 9.6+
* Safari 3+

Compatibilidade (Demais Navegadores):

* Avant Browser 10.2+
* Camino 1+
* Fennec 1+
* Flock 2.6+
* Maxthon 2.5+
* OmniWeb 5.1+
* RockMelt 0+
* SeaMonkey 1.1+
* SlimBrowser 4+
* Stainless 0+
* Existe outro browser? Avise :)

### Compilando seu JS

Para compilar qualquer JS do Linha Framework, você precisa ter em mãos [NodeJS + NPM + Tuild](https://gist.github.com/866799). O processo é bem simples: Depois de terminada as alterações do SRC do JS, abra o terminal na pasta /desenvolvimento/js/build e execute os seguintes comando:
	
	node build.js 
	
Recomendo que dêem uma olhada no arquivo /desenvolvimento/js/build/build.js, pois nele há algumas opções para customização do compilador.

PLUGINS USADOS
==============
Tudo isto não foi trabalho apenas do LF, devo dar os créditos a:

 * jQuery - <http://jquery.com/>
 * Selectizr - <http://selectivizr.com/>
 * HTML5 Shiv <http://code.google.com/p/html5shiv/>
 * Chrome Frame - <http://www.google.com/chromeframe>
 * HTML5 Boilerplate (Fonte de inspiração para algumas partes do LF) - <https://github.com/paulirish/html5-boilerplate>
 * NodeJS - <http://nodejs.org>
 * GitHub.com (vários projetos :P) - <https://github.com/mateus007/following>
 * Google Search - Thanks!!! :)
 
RECOMENDAÇÕES & DICAS
=====================
Não temos exatamente tudo feito, alguns pontos ficam por sua decisão. Abaixo algumas dicas e recomendações:
 
 * Aprenda a trabalhar com medidas padrões - Grids
 * Escolha um padrão de Grid e apague os demais (html/css/grid.css)
 * Carregue JS dinamicamente, usando Linha Load.
 * Crie versões minifield de seus códigos com uma linguagem server-side - <http://code.google.com/p/minify/>
 * Se o site não tiver suporte nativo para o IE6, avise os usuários usando Adeus IE6 - <https://github.com/mateus007/Adeus-IE6>
 * Aprenda um pouco de SEO - <http://googlewebmastercentral.blogspot.com/2008/11/googles-seo-starter-guide.html>
 * Alterar o código fonte não é proibido :P
 * Utilize o fórum do Linha Framework - <http://www.linhaframework.com/forum/>
 * Contribua!
 
CHANGELOG 
=====================
### 1.3 - XX de XXXXXXXX de 2011

 * Adicionado os arquivos exemplo.htaccess (quando concluir renomei para .htaccess) e robots.txt
 * Atualização jQuery para V. 1.5.1
 * Movimentação para changelog
 * Otimização CSS e JS - Veja log plugins
 * Remoção do $.pluginX, em apoio a $.fn.pluginX
 * Introdução a library Linha Framework JS, com testes unitários e jsHint
 * Novo build para JS - Tuild, feito em NodeJS
 * Separação do código jQuery do core LF, tornando mais simples o uso de outro framework JS
 * Linha Framework JS - Criado plugin (Browser Selector) "modernizer" com classes CSS. Ex: .mac .chrome .chrome9 .box-shadow
 * Linha Framework JS - Criado plugin (Load), para carregar dinamicamente JS e CSS
 * Adicionado plugin Selectizr
 * Adicionado plugin HTML5 shiv
 * Removido jQuery via CDN - por vezes fica muito lento o carregamento do site, além de impedir o desenvolvimento offline
 * Reestruturação dos arquivos.
 * Arquivos CSS simplificados em 5 arquivos (anteriormente eram 7)
 * Novo sistema de grid, chamado de grid flex (fluído ou flexivel), com um pouco de Responsive Webdesign
 
### 1.2 - 23 de Setembro de 2010

 * Atualização para os plugins: Linha Acord, Linha Focuss, Linha Modal, Linha Nav, Linha Slidetabs, Linha Tooltip e Linha Form (agora chamado Valida),
 * Linha Form renomeado pra Linha Valida (o nome tem mais relação com a função do plugin)
 * Remoção de estilos para IE6 e Mobile - não tem muita utilidade :)
 * Grid CSS fica em um novo arquivo css (grid.css)
 * Regra para grid simplificada ( + semelhante ao grid 960)
 * Otimização de CSS
 * Arquivo para css separados de acordo com o conteudo
 * Agora o estilos.css fica em branco, facilitando a atualização do framework
 * Introdução/Suporte a HTML5
 * Reset.css com suporte a HTML5
 * Adicionado estilos básicos para html5 (html5.css)
 * Reestruturação para desenvolvimento

### 1.1 - 03 de Abril de 2010

 * Alguns fixs sem importancia :)
 * Implementação de css para tabelas (&lt;table&gt;)
 * Tamanho de fontes para small e big (&lt;small&gt;&lt;big&gt;)
 * Estilos hr (&lt;hr/&gt;)
 * Estilos para iframe (&lt;iframe&gt;)
 * Fim do suporte para modelos
 * Adicionado suporte a grid 12, 16 e 24 colunas
 * Adição de Classes fix: .primeiro e .ultimo
 * Atualização versões plugins js

### 1.0 - 28 de Março de 2010

 * Inicial

CHANGELOG JS Linha Framework
=========================

### 1.3.1

 * Adicionado métodos Array.clone & L.filter
 * Fix de parâmetro para L.ready()
 * Fix para previnir erros onde nenhum elemento é selecionado

### 1.3

 * Inicial

CHANGELOG Plugins jQuery Linha Framework
=========================
Linha ACORD:
----
### 1.2

 * Adicionado suporte a Hash Navigation
 * Simplificação de algumas opções
 * Otimização de código
 * Remoção da função $.acord em apoio a função $.fn.acord
 
### 1.1

 * Monitoramento live(DOM e Ajax) para Accordions (use alternativamente $("seletor-accordion").trigger('iniciaAcord'); caso tenha problemas)
 * Animação com Easing
 * Ajax no conteúdo dos accordions
 * Opção Accordion inicial
 * Ajuste para CSS
 * Melhor controle via CSS (com classes adicionadas automaticamente pelo plugin)
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado

### 1.0

* Inicial

Linha FOCUSS:
----
### 1.2

 * Otimização de código
 * Remoção da função $.focuss em apoio a função $.fn.focuss
 
### 1.1

 * Monitoramento live(DOM e Ajax) para Foccus (use alternativamente $("seletor-focuss").trigger('iniciaFocuss'); caso tenha problemas)
 * Ajustes para retirada de focuss em elemento do tipo input[type="submit"]
 * Removido a opção "remove" (o mesmo pode ser feito com css .tal-classe{outline: none;}
 * Opção "cor" foi removida por "classe", assim a customização é maior pois fica feita através da classe
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callbacks melhorados

### 1.0

 * Inicial

Linha MODAL:
----
### 1.2

 * Otimização de código
 * Remoção da função $.modal em apoio a função $.fn.modal
 
### 1.1

 * Live Events (não é o mesmo que Monitoramento live, mais tem o mesmo resultado :))
 * Adicionado fix de posição (ou o mesmo q usar position:fixed)
 * Titulo modal fica opcional, se não necessita sete classeTitulo como 'null' ou 'false'
 * Algumas novas opções
 * Arrays alteradas para Objetos
 * Ajuste para CSS
 * Mais Callbacks
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callbacks melhorados
 * Outros...

### 1.0

 * Inicial

Linha NAV:
----
### 1.2

 * Otimização de código
 * Remoção da função $.nav em apoio a função $.fn.nav
 
### 1.1

 * Live Events (não é o mesmo que Monitoramento live, mais tem o mesmo resultado :))
 * Animação com Easing
 * Ajuste para CSS
 * Melhor controle via CSS (com classes adicionadas automaticamente pelo plugin)
 * Fix para prevenção de animação em fila
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callbacks melhorados

### 1.0

 * Inicial

Linha SLIDETABS:
----
### 1.2
 
 * Adicionado suporte a Hash Navigation
 * Simplificação de algumas opções
 * Otimização de código
 * Remoção da função $.slideTabs em apoio a função $.fn.slideTabs
 * Nova opção para pausar slide automático quado estiver no estado hover - pausarAuto
 
### 1.1

 * Monitoramento live(DOM e Ajax) para SlideTabs (use alternativamente $("seletor-slidetabs").trigger('iniciaSlideTabs'); caso tenha problemas)
 * Animação com Easing
 * Adicionado Direção de Transição (horizontal ou vertical)
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado

### 1.0

 * Inicial

Linha TOOLTIP:
----
### 1.3

 * Otimização de código
 * Remoção da função $.tooltip em apoio a função $.fn.tooltip
 
### 1.2

 * Live Events (não é o mesmo que Monitoramento live, mais tem o mesmo resultado :))
 * Adicionado fix de posição pra os eventos window resize e window scroll
 * Adicionado setas de posição do tooltip
 * Adicionado Opção para mensagem de erro personalizado
 * Adicionado propriedade atual (registra o elemento que disparou o tooltip que está sendo exibido)
 * Adicionado Opção para tempo de fade (padrão: "fast")
 * Melhor Controle da posição via classe (as setas)
 * Alteração tip = de array para object
 * Descontinuado opção para continuar
 * Callback melhorado
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"

### 1.1

 * Ajuste opções padding_top e padding_left
 * Adicionado opção para wrapper

### 1.0

 * Inicial

## Linha VALIDA:
### 1.1
 
 * Adicionado suporte a validação inline 
 * Agora o input que tiver algum erro, será marcado com uma classe, automaticamente (classeErro)
 * Otimização de código
 * Remoção da função $.valida em apoio a função $.fn.valida

### 1.0

 * Inicial
 * Monitoramento live(DOM e Ajax) para Valida (use alternativamente $("seletor-valida").trigger('iniciaValida'); caso tenha problemas)
 * Renomeado para Linha Valida (anteriormente chamado de Linha Form)
 * Adicionado validação para Checkbox, Radio e Select
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado