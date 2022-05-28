# LINHA FRAMEWORK

by Mateus Souza | <https://mateussouzaweb.com>

Linha Framework é um projeto com anos de desenvolvimento que visa proporcionar uma base inicial para programação de websites e aplicativos com uma stack independente e simplificada.

Este framework contém muitos componentes, mas não possui um tema de cores opinativo para nenhum deles - ou seja, você não é obrigado a manter o padrão de design do projeto, até porque ele não tem nenhum. Esta abordagem proporciona maior personalização em todos os aspectos do sistema com total liberdade através das variáveis do CSS, e você pode aplicar elas tanto globalmente quanto no escopo que desejar.

As linguagens básicas do framework estão listadas abaixo. Recomendamos que tenha o conhecimento básico delas antes de utilizar este projeto:

* HTML5
* SCSS / CSS
* TypeScript / JavaScript

---

## DESENVOLVIMENTO

Para compilar seu projeto, primeiro instale o compilador. O processo de instalação é bem simples e pode ser verificado diretamente na página do projeto (aproveite para entender como o compilador pode lhe ajudar no desenvolvimento de projetos):

* ``compactor``: <https://github.com/mateussouzaweb/compactor>

Depois de instalado, execute o comando abaixo e passe a desenvolver ou gerar a versão de distribuição do projeto:

```bash
make develop
make build
```

---

## CHANGELOG

### 3.0.0 - 31 de Março de 2021

* Arquivos para desenvolvimento e distribuição separados
* Makefile para automatizar comandos
* Ajustes de formatação geral
* Revisão geral para CSS e JS, com maior separação
* Uso de variáveis CSS adotado para componentes
* Arquivo manifest.webmanifest
* Favicon SVG com dark and light mode
* Defer para scripts JS

### 2.0.0 - 06 de Junho de 2020

* jQuery removido do projeto
* Framework migrado para sistema de componentes
* Melhorias gerais de CSS e JS
* Estrutura de pastas atualizadas para melhor uso em projetos pequenos e de larga escala

### 1.6.0 - 04 de Maio de 2018

* jQuery atualizado para V. 3.3.1.
* CSS para navegação removido
* JS para navegação removido
* Melhorias e reescritas gerais para CSS

### 1.5.0 - 03 de Novembro de 2017

* jQuery atualizado para V. 3.2.1.
* Extra Selectors removido: A compatibilidade Cross Browser atual dispensa este tipo de seletor
* FlexBox agora é o sistema principal para colunas CSS
* Favicon.ico substituído por Favicon.png com 144px
* CSS para toolbar removido
* Melhorias e reescritas gerais

### 1.4.1 - 03 de Abril de 2017

* jQuery atualizado para V. 3.2.0
* Melhorias gerais

### 1.4.0 - 05 de Janeiro de 2015

* Framework agora é focado apenas em HTML, CSS e JS em um único branch - master
* Arquivo .htaccess removido
* jQuery atualizado para V. 2.1.4
* Novos componentes: Paginação, Modal, Upload
* Componente removido: Bounce

### 1.3.0 - 18 de Setembro de 2014

* Código agora está no padrão internacional - INGLÊS (Código, não comentários e textos...)
* HTML migrado para HTML5 (não vá confundir com as funcionalidades do HTML5)
* Adicionado os arquivos .htaccess.txt (quando concluir renomeie para .htaccess) e robots.txt
* Reestruturação dos arquivos
* Versão do framework mais clean, apenas com o necessário
* Otimização CSS e JS - Agora o framework tem arquivos separados para Scripts e CSS
* Remoção de todos os plugins jQuery Linha em favor do framework.js e interações via CSS
* Atualização jQuery para V. 2.1.1
* Removido jQuery via CDN - por vezes fica muito lento o carregamento do site, além de impedir o desenvolvimento offline
* Arquivos CSS simplificados em 1 arquivo (anteriormente eram 7)
* Estilos CSS a lá OOCSS, gerenciados com Sass
* Normalize.css
* Grid e arquivos para design removidos
* Estilo flat básico

### 1.2.0 - 23 de Setembro de 2010

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

### 1.1.0 - 03 de Abril de 2010

* Alguns fixes sem importância :)
* Implementação de css para tabelas (&lt;table&gt;)
* Tamanho de fontes para small e big (&lt;small&gt;&lt;big&gt;)
* Estilos hr (&lt;hr/&gt;)
* Estilos para iframe (&lt;iframe&gt;)
* Fim do suporte para modelos
* Adicionado suporte a grid 12, 16 e 24 colunas
* Adição de Classes fix: .first e .last
* Atualização versões plugins js

### 1.0.0 - 28 de Março de 2010

* Inicial
