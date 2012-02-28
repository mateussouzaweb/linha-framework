/*!
 * Extend para Acord 1.3+
 * Simula um pouco o slide, aparecendo a descrição do item
 */
$.extend($.acord.padrao, {
	descricao: '.descricao',	 		//Seletor para as descrições dos slides
	tempoDescricaoIn: 'slow',			//Tempo para a entrada das descrições
	tempoDescricaoOut: 'fast'			//Tempo para a saída das descrições
});

/**
 * EXTEND slide init
 */
$.acord.padrao.extend['slide-init'] = function(){

	var o = $(this).data('acord');
	$(o.descricao, this).addClass('acord-descricao');

};

/**
 * FX slide
 */
$.acord.fx['slide'] = function(p, f){

	var o = $(this).data('acord'),
		self = this;

	/**
	 * Esconde a descrição e o filho atual
	 */
	$('.acord-descricao', f).fadeOut(o.tempoDescricaoOut, function(){

		$(o.filho, self).not(f).slideUp(o.tempoIn, o.easingIn);

		/**
		 * Exibe o filho e a descrição
		 */
		f.slideDown(o.tempoOut, o.easingOut)
		 .find('.acord-descricao')
		 .hide()
		 .fadeIn(o.tempoDescricaoIn);
	});

}