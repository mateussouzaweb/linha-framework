# LINHA FRAMEWORK - 2.0

by Mateus Souza | <https://mateussouzaweb.com>

## Licença

MIT and GPL License - <http://www.opensource.org/licenses/mit-license.php> || <http://www.gnu.org/licenses/gpl.html>

## SOBRE

Linha framework é um projeto com anos de desenvolvimento que visa proporcionar um ponto inicial para programação de páginas web de forma facilitada. Pense nele como um Twitter Bootstrap muito mais simples, que lhe dá liberdade para desenvolver - na verdade, este é o objetivo do Linha Framework, simplificar cada vez mais o seu stack. As linguagens básicas do framework incluem:

* HTML5
* CSS3
* JavaScript

Tudo isto não foi trabalho apenas do Linha Framework, devo dar os créditos a:

* Sass - <http://sass-lang.com>
* HTML5 Boilerplate (Fonte de inspiração para algumas partes do LF) - <https://html5boilerplate.com>
* GitHub (vários projetos, não teria como citar todos aqui...) - <https://github.com/mateus007/following>
* Google Search - Thanks!!! :)

## RECOMENDAÇÕES & DICAS

Não temos exatamente tudo feito e este não é o nosso objetivo. Alguns pontos ficam por sua decisão, mas deixamos abaixo algumas dicas e recomendações para lhe auxiliar neste processo:

* Compre um Mac OS ou use Linux - dê adeus ao Windows!
* Aprenda a usar o Sass - ESSÊNCIAL
* Decida qual framework JS irá utilizar
* Delete o que você não usa... mantenha seu stack limpo
* Aprenda um pouco de SEO - <http://googlewebmastercentral.blogspot.com/2008/11/googles-seo-starter-guide.html>
* Alterar o código fonte não é proibido :P
* Contribua!

## DESENVOLVIMENTO

Compilar CSS com SASS:

```bash
sass --watch components/ --style compressed
```

Compilar JS com TypeScript:

```bash
find components/ -name "*.ts" | xargs tsc --target ES6 --removeComments -w
```

Compilar versão JS com Minify:

```bash
npm install uglify-js -g

find components/ \
    -type f \
    -name "*.js" ! -name "*.min.*" \
    -exec echo {} \; \
    -exec uglifyjs -o {}.min {} \; \
    -exec bash -c 'mv $1 ${1/%js.min/min.js}' -- {}.min \;
```

## CHANGELOG

### 2.0 - 06 de Junho de 2020

* jQuery removido do projeto
* Framework migrado para sistema de componentes
* Melhorias gerais de CSS e JS

### 1.6 - 04 de Maio de 2018

* jQuery atualizado para V. 3.3.1.
* CSS para navegação removido
* JS para navegação removido
* Melhorias e reescritas gerais para CSS

### 1.5 - 03 de Novembro de 2017

* jQuery atualizado para V. 3.2.1.
* Extra Selectors removido: A compatibilidade Cross Browser atual dispensa este tipo de seletor
* Flexbox agora é o sistema principal para colunas CSS
* Favicon.ico substituído por Favicon.png com 144px
* CSS para toolbar removido
* Melhorias e reescritas gerais

### 1.4.1 - 03 de Abril de 2017

* jQuery atualizado para V. 3.2.0
* Melhorias gerais

### 1.4 - 05 de Janeiro de 2015

* Framework agora é focado apenas em HTML, CSS e JS em um único branch - master
* Arquivo .htaccess removido
* jQuery atualizado para V. 2.1.4
* Novos componentes: Paginação, Modal, Upload
* Componente removido: Bounce

### 1.3 - 18 de Setembro de 2014

* Código agora está no padrão internacional - INGLÊS (Código, não comentários e textos...)
* HTML migrado para HTML5 (não vá confundir com as funcionalidades do HTML5)
* Adicionado os arquivos .htaccess.txt (quando concluir renomei para .htaccess) e robots.txt
* Reestruturação dos arquivos
* Versão do framework mais clean, apenas com o necessário
* Otimização CSS e JS - Agora o framework tem arquivos separados para Scripts e CSS
* Remoção de tudos os plugins jQuery Linha em favor do framework.js e interações via CSS
* Atualização jQuery para V. 2.1.1
* Removido jQuery via CDN - por vezes fica muito lento o carregamento do site, além de impedir o desenvolvimento offline
* Arquivos CSS simplificados em 1 arquivo (anteriormente eram 7)
* Estilos CSS a lá OOCSS, gerenciados com Sass
* Normalize.css
* Grid e arquivos para design removidos
* Estilo flat básico

### 1.2 - 23 de Setembro de 2010

* Atualização para os plugins: Linha Acord, Linha Focuss, Linha Modal, Linha Nav, Linha Slidetabs, Linha Tooltip e Linha Form (agora chamado Valida),
* Linha Form renomeado pra Linha Valida (o nome tem mais relação com a função do plugin)
* Remoção de estilos para IE6 e Mobile - não tem muita utilidade :)
* Grid CSS fica em um novo arquivo css (grid.css)
* Regra para grid simplificada ( + semelhante ao grid 960)
* Otimização de CSS
* Arquivo para css separados de acordo com o conteúdo
* Agora o estilos.css fica em branco, facilitando a atualização do framework
* Introdução/Suporte a HTML5
* Reset.css com suporte a HTML5
* Adicionado estilos básicos para html5 (html5.css)
* Reestruturação para desenvolvimento

### 1.1 - 03 de Abril de 2010

* Alguns fixes sem importância :)
* Implementação de css para tabelas (&lt;table&gt;)
* Tamanho de fontes para small e big (&lt;small&gt;&lt;big&gt;)
* Estilos hr (&lt;hr/&gt;)
* Estilos para iframe (&lt;iframe&gt;)
* Fim do suporte para modelos
* Adicionado suporte a grid 12, 16 e 24 colunas
* Adição de Classes fix: .first e .last
* Atualização versões plugins js

### 1.0 - 28 de Março de 2010

* Inicial
