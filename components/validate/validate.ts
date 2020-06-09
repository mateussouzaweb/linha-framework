type FormElement = HTMLFormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

var Validate = {

    /**
     * Validate defaults
     * @var {Object}
     */
    defaults: {
        invalidMessage: 'Invalid.',
        afterValidate: null,
        beforeValidate: null,
        onValid: null,
        onInvalid: null,
    },

    /**
     * Custom handler options
     * @var {Array}
     */
    handlers: [],

    /**
     * Init validate
     * @return {void}
     */
    init: function(): void{

        var self = this;

        document.addEventListener('submit', function(e){
            var form = (<FormElement>e.target).closest('form');
            if( !self.validate(form) ){
                e.preventDefault();
                e.stopPropagation();
            };
        });

        document.addEventListener('change', function(e){
            self.validate(e.target);
        });

    },

    /**
     * Attach validation to form or field element by its selector
     * @param {String} selector
     * @param {Object} options
     * @return {void}
     */
    attach: function(selector: string, options: object): void{
        this.handlers.push({
            selector: selector,
            options: options
        });
    },

    /**
     * Retrieve validate options for given element
     * @param {FormElement} element
     * @param {Object} append
     * @return {Object}
     */
    options: function(element: FormElement, append: object): object{

        var options = Object.assign(
            {},
            this.defaults,
            (append || {})
        );

        this.handlers.map(function(handler: { selector: string; options: object; }){
            if( element.matches(handler.selector) ){
                Object.assign(options, handler.options);
            }
        });

        return options;
    },

    /**
     * Check the validity of an element
     * @param {FormElement} element
     * @return {Boolean}
     */
    check: function(element: FormElement): boolean{

        // Form
        if( element.nodeName === 'FORM' ){

            var items = Array.from(element.querySelectorAll('[required]'));
            var self = this;

            return items.filter(function(field: FormElement){
                return !self.validate(field);
            }).length === 0;
        }

        // Fields
        if( element.disabled ){
            return true;
        }

        if( !element.required ){
            return true;
        }

        var value = element.value;
        var type = element.getAttribute('type');

        // Selects
        if( element.nodeName === 'SELECT' ){
            return ( value !== '' ) ? true : false;
        }

        // CheckBox / Radio
        if( type == 'checkbox' || type == 'radio' ){

            var name = element.getAttribute('name');
            var selector = 'input[name="' + name + '"]:checked';
            var checked = document.querySelectorAll(selector).length;

            return (checked == 0) ? false : true;
        }

        // Reset current validation
        element.setCustomValidity('');

        // Others
        return value !== '' && element.checkValidity();
    },

    /**
     * Decorate element based on validity
     * @param {FormElement} element
     * @param {Boolean} valid
     * @param {Object} options
     * @return {void}
     */
    decorate: function(element: FormElement, valid: boolean, options: { invalidMessage: string }): void{

        var type = element.getAttribute('type');
        var parent = element.closest('.select, label');
        var elements = [element, parent];

        if( type && (type == 'checkbox' || type == 'radio' ) ){

            var name = element.getAttribute('name');
            var selector = 'input[name="' + name + '"]';
            var items = document.querySelectorAll(selector);

            items.forEach(function(item){
                elements.push(item, item.closest('.select, label'));
            });

        }

        elements = elements.filter(Boolean);
        elements = Array.from( new Set(elements) );
        elements.map(function(item: FormElement){

            if( item.setCustomValidity ){
                item.setCustomValidity(
                    ( valid ) ? '' : options.invalidMessage
                );
            }

            item.classList.add( ( valid ) ? 'valid' : 'invalid');
            item.classList.remove( ( valid ) ? 'invalid' : 'valid');

        });

    },

    /**
     * Validate element with the options
     * @param {FormElement} element
     * @param {Object} options
     * @return {Boolean}
     */
    validate: function(element: FormElement, options: object): boolean{

        var _options = this.options(element, options);

        var runCallback = function(callback: Function){
            if( typeof callback == 'function' ){
                callback.apply(element, new Array(element, _options));
            }
        }

        runCallback(_options.beforeValidate);

        var valid = this.check(element);

        this.decorate(element, valid, _options);

        if( valid ){
            runCallback(_options.onValid);
        }else{
            runCallback(_options.onInvalid);
        }

        runCallback(_options.afterValidate);

        return valid;
    },

    /**
     * Validate the form
     * @param {FormElement} form
     * @param {Object} options
     * @return {Boolean}
     */
    form: function(form: FormElement, options: object): boolean{
        return this.validate(form, options);
    },

    /**
     * Validate an field
     * @param {FormElement} field
     * @param {Object} options
     * @return {Boolean}
     */
    field: function(field: FormElement, options: object): boolean{
        return this.validate(field, options);
    }

};

Validate.init();