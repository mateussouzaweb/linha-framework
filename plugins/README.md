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
#### 1.2
* Plugin renomeado de Valida para Validate
* Validação agora usa atributos HTML5 para validar os campos, como o atributo required, pattern, types: email, url, number...
* Elementos com o atributo "disabled" não devem ser validados.

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