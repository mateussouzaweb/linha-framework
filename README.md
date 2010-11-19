LINHA FRAMEWORK - 1.3
=====================
<http://www.linhaframework.com> || by Mateus Souza - mateussouzaweb@gmail.com | <http://mateussouza.com>

### Licença
MIT and GPL License - <http://www.opensource.org/licenses/mit-license.php> || <http://www.gnu.org/licenses/gpl.html>

### Documentação
Para ver a documentaçõa visite <http://www.linhaframework.com/docs/>

PLUGINS USADOS
==============
Tudo isto não foi trabalho apenas do LF, devo dar os créditos a:

 * jQuery - <http://jquery.com/>
 * Selectizr - <http://selectivizr.com/>
 * jQuery Browser Selector - <https://github.com/mateus007/jQuery-Browser-Selector>
 * Chrome Frame - <http://www.google.com/chromeframe>
 * HTML5 Boilerplate (Fonte de inspiração para algumas partes do LF) - <https://github.com/paulirish/html5-boilerplate>
 * Closure Compiler - <http://code.google.com/intl/pt-BR/closure/compiler/>
 * Google Search - Thanks!!! :)
 
CHANGELOG 
=====================
### 1.3 - XX de XXXXXXXX de 2011

 * Adicionado os arquivos .htacess e robots.txt
 * Atualização jQuery para V. 1.4.4
 * Movimentação para changelog
 * Otimização CSS e JS - Veja log plugins
 * Remoção do $.pluginX, em apoio a $.fn.pluginX
 * Novo arquivo para funções core jQuery LF - core.js
 * Adicionado plugin jQuery Browser Selector ao core
 * Adicionado plugin Selectizr
 * Adicionado checagem de carregamento jQuery, também foi adiciona o arquivo em /xhtml/js (apensar de estar disponível desde a versão 1.2 só é valido a partir da versão 1.3) 
 
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


CHANGELOG Plugins jQuery Linha Framework
=========================
Linha ACORD:
----
### 1.2

 * Adicionado suporte a hash navigation
 * Otimização de código
 * Remoção da funçaõ $.acord em apoio a função $.fn.acord
 
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

Linha FOCUS:
----
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

 * Monitoramento live(DOM e Ajax) para Valida (use alternativamente $("seletor-valida").trigger('iniciaValida'); caso tenha problemas)
 * Renomeado para Linha Valida (anteriormente chamado de Linha Form)
 * Adicionado validação para Checkbox, Radio e Select
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado

### 1.0

 * Inicial