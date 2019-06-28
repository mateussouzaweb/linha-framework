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

});