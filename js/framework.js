/*!
 * Extra Selectors
 */
(function(){

	var userAgent = navigator.userAgent.toLowerCase(),
		html = document.getElementsByTagName('html')[0],
		os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent),
		ua = /(ie|edge|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

	var addClass = function(name){
		html.className += ' ' + name;
	};

	addClass(os[1]);

	if( !ua ){
		return;
	}

	addClass(ua[1]);

	// Fix for Safari
	if( ua[1] == 'safari' ){
		addClass(ua[1] + '-' + ua[2].substring(0, 1));
	}else{
		addClass(ua[1] + '-' + parseInt(ua[2]));
	}

	// IE conditional
	if( ua[1] == 'ie' ){

		for( var ver = 3; ver < 10; ver++ ){
			if( parseInt(ua[2]) < ver ){
				addClass('lt-ie-' + ver);
			}
		}

	}

})();

/*!
 * Validate
 */
(function($){

	$.validate = [];
	$.validate.defaults = {
		classError: 'error',
		selectDefaultValue: 0,
		redirect: true,
		inline: false,
		inlineEvent: 'focusout',
		onItemValidate: null,
		onItemError: null,
		onValidate: null,
		onError: null
	};

	/**
	 * Validate the form
	 * @param {Object} $form
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.form = function($form, options){

		var result = true;

		if( !options ){
			options = $form.data('validate');
		}

		$form.find('[required]').each(function(){

			var itemResult = $.validate.item( $(this), options );
				result = result && itemResult;

		});

		return result;
	};

	/**
	 * Validate an item in the form
	 * @param {Object} item
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.item = function(item, options){

		var result = true;

		item.removeClass(options.classError);
		item.parent('.select').removeClass(options.classError);

		if( item.is(':disabled') ){
			return true;
		}

		// Callback
		if( $.isFunction( options.onItemValidate ) ){
			options.onItemValidate.apply( item, new Array(item, options) );
		}

		// Selects
		if( item.is('select') ){
			result = ( item.val() && item.val() != options.selectDefaultValue ) ? true : false;

		// CheckBox / Radio
		}else if( item.is(':checkbox') || item.is(':radio') ){

			var inputName = item.attr('name'),
				checked = $('input[name="' + inputName + '"]:checked').length;

			result = (checked == 0) ? false : true;

		// Input
		}else{
			result = item[0].checkValidity();
		}

		if( result == false ){

			item.addClass( options.classError );
			item.parent('.select').addClass( options.classError );

			// Callback
			if( $.isFunction( options.onItemError ) ){
				options.onItemError.apply(item, new Array(item, options));
			}

		}

		return result;
	};

	/**
	 * Validate a form and return the validation result
	 * @param {Object} options
	 */
	$.fn.validate = function(options){

		if( ! $(this).is('form') ){
			return false;
		}

		var options = $.extend( {}, $.validate.defaults, options );

		// Force novalidate and append options to form
		$(this).attr('novalidate', 'novalidate');
		$(this).data('validate', options);

		// Submit
		$(this).on('submit', function(){

			// Pass
			if( $.validate.form( $(this), options ) ){

				if( $.isFunction( options.onValidate ) ){
					options.onValidate.apply( this, new Array(this, options) );
				}

				return (options.redirect) ? true : false;

			// Error!
			}else{

				if( $.isFunction( options.onError ) ){
					options.onError.apply( this, new Array(this, options) );
				}

				return false;
			}

		});

		// Inline
		if( options.inline ){

			$(this).find('[required]')
			.on( options.inlineEvent, function(){
				$.validate.item( $(this), options );
			});

		}

	};

})(jQuery);

/*!
 * Navigation
 */
(function($){

	/**
	 * Navigation Constructor
	 * @param {Object} element
	 * @param {String} action
	 * @return {void}
	 */
	var Navigation = function(element, action){

		this.NAV = $(element);
		this.CLASS = 'navigation-responsive-active';

		return this[action]();
	}

	/**
	 * Show navigation
	 * @return {void}
	 */
	Navigation.prototype.show = function(){
		this.NAV.addClass(this.CLASS);
	}

	/**
	 * Hide navigation
	 * @return {void}
	 */
	Navigation.prototype.hide = function(){

		if( this.NAV.hasClass(this.CLASS) ){
			this.NAV.removeClass(this.CLASS);
		}

	}

	/**
	 * Toggle navigation
	 * @return {void}
	 */
	Navigation.prototype.toggle = function(){

		if( this.NAV.hasClass(this.CLASS) ){
			this.hide();
		}else{
			this.show();
		}

	}

	$.fn.navigation = function(action){
		return new Navigation(this, action);
	};

})(jQuery);

/*!
 * Modal
 */
(function($){

	/**
	 * Modal Constructor
	 * @param {Object} element
	 * @param {String} action
	 * @return {void}
	 */
	var Modal = function(element, action){

		this.BODY = $(document.body);
		this.BACKDROP = $('.modal-backdrop');
		this.MODAL = $(element);

		return this[action]();
	}

	/**
	 * Show modal
	 * @return {void}
	 */
	Modal.prototype.show = function(){

		var self = this;

		self.BODY.addClass('modal-open');
		self.BACKDROP.removeClass('hide').show();
		self.MODAL.removeClass('hide').show();

		window.setTimeout(function(){
			self.BACKDROP.addClass('in');
			self.MODAL.addClass('in');
		}, 150);

	}

	/**
	 * Hide modal
	 * @return {void}
	 */
	Modal.prototype.hide = function(){

		var self = this;

		self.BODY.removeClass('modal-open');
		self.MODAL.removeClass('in');
		self.BACKDROP.removeClass('in');

		window.setTimeout(function(){
			self.MODAL.hide();
			self.BACKDROP.hide();
		}, 150);

	}

	$.fn.modal = function(action){
		return new Modal(this, action);
	};

})(jQuery);

/*!
 * Events
 */
jQuery(function($){

	// Click scroll
	$('a')
	.filter(function(){
		return (this.hostname && this.hostname === location.hostname && this.hash) || this.hash;
	})
	.on('click', function(e){

		var target = String(this.href).replace(/(.*)\#/, '');

		if( !$('#' + target).length ){
			return window.location = this.href;
		}else if( !target ){
			return false;
		}

		$('html, body').animate({
			scrollTop: $('#' + target).offset().top
		}, 600, function(){

			window.location.hash = target;

		});

		e.preventDefault();
		return false;
	});

	// Forms
	$('form').validate({
		classError: 'error'
	});

	// Alerts
	$('.alert .close').on('click', function(e){
		$(this).parent('.alert').remove();
		e.preventDefault();
	});

	// Navigation
	$('.navigation').on('click', '.navigation-icon', function(e){
		$(this).parents('.navigation').navigation('toggle');
		e.preventDefault();
	});

	$('.navigation').on('click', 'a', function(){
		$(this).parents('.navigation').navigation('hide');
	});

	// Modal
	$('[data-modal]').on('click', function(e){
		$( $(this).data('modal') ).modal('show');
		e.preventDefault();
	});

	$('.modal .close').on('click', function(e){
		$(this).parents('.modal').modal('hide');
		e.preventDefault();
	});

});