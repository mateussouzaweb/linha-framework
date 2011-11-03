LINHA FRAMEWORK - 1.3
=====================
<http://linhaframework.org> || by Mateus Souza - mateussouzaweb@gmail.com | <http://mateussouzaweb.com>

### Licença
MIT and GPL License - <http://www.opensource.org/licenses/mit-license.php> || <http://www.gnu.org/licenses/gpl.html>

### Documentação
Para ver a documentação completa, visite <http://linhaframework.org/docs/>

PLUGINS USADOS
==============
Tudo isto não foi trabalho apenas do LF, devo dar os créditos a:

 * Modernizr - <http://www.modernizr.com/>
 * jQuery - <http://jquery.com/>
 * Tuild - <https://github.com/mateus007/tuild>
 * HTML5 Boilerplate (Fonte de inspiração para algumas partes do LF) - <https://github.com/paulirish/html5-boilerplate>
 * GitHub.com (vários projetos :P) - <https://github.com/mateus007/following>
 * Google Search - Thanks!!! :)

RECOMENDAÇÕES & DICAS
=====================
Não temos exatamente tudo feito, alguns pontos ficam por sua decisão. Abaixo algumas dicas e recomendações:

 * Aprenda a trabalhar com medidas padrões - Grids
 * Escolha um padrão de Grid e apague os demais (html/css/all.css)
 * Carregue JS dinamicamente, usando um plugin para lazy loading (YepNope)
 * Compile uma versão mais exclusiva do Modernizr pelo site do desenvolvedor
 * Use o build incluso no framework para criar versões minifield do seu código
 * Se o site não tiver suporte nativo para o IE6, avise os usuários usando Adeus IE6 - <https://github.com/mateus007/adeus-ie6>
 * Aprenda um pouco de SEO - <http://googlewebmastercentral.blogspot.com/2008/11/googles-seo-starter-guide.html>
 * Alterar o código fonte não é proibido :P
 * Contribua!

CHANGELOG
=====================
#### 1.3 - XX de XXXXXXXX de 2011

 * Código agora está no padrão internacional - INGLÊS (Código, não comentários e textos...)
 * HTML migrado para HTML5 (não vá confundir com as funcionalidades do HTML5)
 * Adicionado os arquivos example.htaccess (quando concluir renomei para .htaccess) e robots.txt
 * Atualização jQuery para V. 1.6.4
 * Movimentação para changelog
 * Otimização CSS e JS - Veja log plugins
 * Remoção do $.pluginX, em apoio a $.fn.pluginX
 * Novo build para JS - Tuild, feito em NodeJS
 * Adicionado plugin Modernizr
 * Removido jQuery via CDN - por vezes fica muito lento o carregamento do site, além de impedir o desenvolvimento offline
 * Reestruturação dos arquivos
 * Arquivos CSS simplificados em 3 arquivos (anteriormente eram 7)
 * Novo sistema de grid: responsive
 * Removido plugin Linha Focuss (o HTML5 oferece o atributo "placeholder" como alternativa)

#### 1.2 - 23 de Setembro de 2010

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

#### 1.1 - 03 de Abril de 2010

 * Alguns fixs sem importancia :)
 * Implementação de css para tabelas (&lt;table&gt;)
 * Tamanho de fontes para small e big (&lt;small&gt;&lt;big&gt;)
 * Estilos hr (&lt;hr/&gt;)
 * Estilos para iframe (&lt;iframe&gt;)
 * Fim do suporte para modelos
 * Adicionado suporte a grid 12, 16 e 24 colunas
 * Adição de Classes fix: .first e .last
 * Atualização versões plugins js

#### 1.0 - 28 de Março de 2010

 * Inicial

CHANGELOG Plugins jQuery Linha Framework
=========================
### Linha ACORD:
#### 1.2

 * Adicionado suporte a Hash Navigation
 * Simplificação de algumas opções
 * Otimização de código
 * Remoção da função $.acord em apoio a função $.fn.acord

#### 1.1

 * Monitoramento live(DOM e Ajax) para Accordions (use alternativamente $("seletor-accordion").trigger('iniciaAcord'); caso tenha problemas)
 * Animação com Easing
 * Ajax no conteúdo dos accordions
 * Opção Accordion inicial
 * Ajuste para CSS
 * Melhor controle via CSS (com classes adicionadas automaticamente pelo plugin)
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado

#### 1.0

* Inicial

### Linha MODAL:
#### 1.2

 * Otimização de código
 * Remoção da função $.modal em apoio a função $.fn.modal

#### 1.1

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

#### 1.0

 * Inicial

### Linha NAV:
#### 1.2

 * Otimização de código
 * Remoção da função $.nav em apoio a função $.fn.nav

#### 1.1

 * Live Events (não é o mesmo que Monitoramento live, mais tem o mesmo resultado :))
 * Animação com Easing
 * Ajuste para CSS
 * Melhor controle via CSS (com classes adicionadas automaticamente pelo plugin)
 * Fix para prevenção de animação em fila
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callbacks melhorados

#### 1.0

 * Inicial

### Linha SLIDETABS:
#### 1.3
 * Reescrita total de código
 * Utilização mais parecida com o jQuery UI
 * Removido suporte a hash (faça isto manualmente, é bem fácil...)
 * Slide contínuo agora não volta ao começo, funciona como se fosse o próximo slide
 * Removido opções para definições de classes

#### 1.2

 * Adicionado suporte a Hash Navigation
 * Simplificação de algumas opções
 * Otimização de código
 * Remoção da função $.slideTabs em apoio a função $.fn.slideTabs
 * Nova opção para pausar slide automático quado estiver no estado hover - pausarAuto

#### 1.1

 * Monitoramento live(DOM e Ajax) para SlideTabs (use alternativamente $("seletor-slidetabs").trigger('iniciaSlideTabs'); caso tenha problemas)
 * Animação com Easing
 * Adicionado Direção de Transição (horizontal ou vertical)
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado

#### 1.0

 * Inicial

### Linha TOOLTIP:
#### 1.3

 * Otimização de código
 * Remoção da função $.tooltip em apoio a função $.fn.tooltip

#### 1.2

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

#### 1.1

 * Ajuste opções padding_top e padding_left
 * Adicionado opção para wrapper

#### 1.0

 * Inicial

### Linha VALIDA:
#### 1.1

 * Adicionado suporte a validação inline
 * Agora o input que tiver algum erro, será marcado com uma classe, automaticamente (classeErro)
 * Otimização de código
 * Remoção da função $.valida em apoio a função $.fn.valida

#### 1.0

 * Inicial
 * Monitoramento live(DOM e Ajax) para Valida (use alternativamente $("seletor-valida").trigger('iniciaValida'); caso tenha problemas)
 * Renomeado para Linha Valida (anteriormente chamado de Linha Form)
 * Adicionado validação para Checkbox, Radio e Select
 * Alterações de nome de opções: "opcao_tal" agora é "opcaoTal"
 * Callback melhorado
