/*!
 * Extra Selectors - Script fork do jQuery Browser Selector
 * Não depende do jQuery e é mais rápido!
 */
(function(){

	var userAgent = navigator.userAgent.toLowerCase(),
		html = document.getElementsByTagName('html')[0],
		os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent),
		ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

	var addClass = function(name){
		html.className += ' ' + name;
	};

	addClass(os[1]);

	if( ua ){

		addClass(ua[1]);

		// Fix for Safari
		if(ua[1] == 'safari')
			addClass(ua[1] + '-' + ua[2].substring(0, 1));
		else
			addClass(ua[1] + '-' + parseInt(ua[2]));

		// IE conditional
		if(ua[1] == 'ie'){

			for(var ver = 3; ver < 10; ver++) {
				if(parseInt(ua[2]) < ver)
					addClass('lt-ie-' + ver);
			}

		}
	}

})();

/*!
 * jQuery Validate 1.2
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
	 * Valida o formulário por completo
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
	 * Valida um item do formulário
	 * @param {Object} item
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.item = function(item, options){

		var result = true;

		item.removeClass(options.classError);

		if( item.is(':disabled') ){
			return true;
		}

		// Callback Valida
		if( $.isFunction( options.onItemValidate ) ){
			options.onItemValidate.apply( item, new Array(item, options) );
		}

		// Select
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

			// Callback Erro
			if( $.isFunction( options.onItemError ) ){
				options.onItemError.apply(item, new Array(item, options));
			}

		}

		return result;
	};

	/**
	 * Valida um formulário e retorna o resultado da validação
	 * @param {Object} options
	 */
	$.fn.validate = function(options){

		if( ! $(this).is('form') ){
			return false;
		}

		var options = $.extend( {}, $.validate.defaults, options );

		// Força novalidate e acrescenta as opções ao formulário
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
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*!
 * Eventos jQuery
 */
$(function(){

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

		// Faz a animação
		$('html, body').animate({
			scrollTop: $('#' + target).offset().top
		}, 600, function(){

			window.location.hash = target;

		});

		e.preventDefault();
		return false;
	});

	// Formulários
	$('form').validate({
		classError: 'error'
	});

	// Alerta
	$('.alert .close').on('click', function(e){
		$(this).parent('.alert').remove();
		e.preventDefault();
	});

	// Toolbar
	$('.toolbar .close').on('click', function(e){
		$(this).parent('.toolbar').remove();
		e.preventDefault();
	});

	// Navegação
	$('.navigation').on('click', '.navigation-icon', function(e){

		var NAV = $(this).parents('.navigation');
		var CLASS = 'navigation-responsive-active';

		if( NAV.hasClass(CLASS) ){
			NAV.removeClass(CLASS)
		}else{
			NAV.addClass(CLASS);
		}

		e.preventDefault();
	});

	$('.navigation').on('click', 'a', function(){

		var NAV = $(this).parents('.navigation');
		var CLASS = 'navigation-responsive-active';

		if( NAV.hasClass(CLASS) ){
			NAV.removeClass(CLASS)
		}

	});

	// Bounce
	$(document).on('mouseleave', function(){

		var bounce = $('.bounce');
		var bounceBackground = $('.bounce-background');

		if( bounce.length && $.cookie('bounce-' + bounce.attr('id')) != 'hide' ){
			bounce.show();
			bounceBackground.show();
		}

	});

	$('.bounce .close').on('click', function(e){

		var bounce = $(this).parents('.bounce');
		var bounceBackground = $('.bounce-background');

		bounce.remove();
		bounceBackground.remove();

		$.cookie('bounce-' + bounce.attr('id'), 'hide', { expires: 7 });

		e.preventDefault();

	});

});