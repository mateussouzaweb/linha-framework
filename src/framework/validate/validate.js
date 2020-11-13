var Validate = {
    defaults: {
        invalidMessage: 'Invalid.',
        afterValidate: null,
        beforeValidate: null,
        onValid: null,
        onInvalid: null,
    },
    handlers: [],
    init: function () {
        var self = this;
        document.addEventListener('submit', function (e) {
            var form = e.target.closest('form');
            if (!self.validate(form)) {
                e.preventDefault();
                e.stopPropagation();
            }
            ;
        });
        document.addEventListener('change', function (e) {
            self.validate(e.target);
        });
    },
    attach: function (selector, options) {
        this.handlers.push({
            selector: selector,
            options: options
        });
    },
    options: function (element, append) {
        var options = Object.assign({}, this.defaults, (append || {}));
        this.handlers.map(function (handler) {
            if (element.matches(handler.selector)) {
                Object.assign(options, handler.options);
            }
        });
        return options;
    },
    check: function (element) {
        if (element.nodeName === 'FORM') {
            var items = Array.from(element.querySelectorAll('[required]'));
            var self = this;
            return items.filter(function (field) {
                return !self.validate(field);
            }).length === 0;
        }
        if (element.disabled) {
            return true;
        }
        if (!element.required) {
            return true;
        }
        var value = element.value;
        var type = element.getAttribute('type');
        if (element.nodeName === 'SELECT') {
            return (value !== '') ? true : false;
        }
        if (type == 'checkbox' || type == 'radio') {
            var name = element.getAttribute('name');
            var selector = 'input[name="' + name + '"]:checked';
            var checked = document.querySelectorAll(selector).length;
            return (checked == 0) ? false : true;
        }
        element.setCustomValidity('');
        return value !== '' && element.checkValidity();
    },
    decorate: function (element, valid, options) {
        var type = element.getAttribute('type');
        var parent = element.closest('.select, label');
        var elements = [element, parent];
        if (type && (type == 'checkbox' || type == 'radio')) {
            var name = element.getAttribute('name');
            var selector = 'input[name="' + name + '"]';
            var items = document.querySelectorAll(selector);
            items.forEach(function (item) {
                elements.push(item, item.closest('.select, label'));
            });
        }
        elements = elements.filter(Boolean);
        elements = Array.from(new Set(elements));
        elements.map(function (item) {
            if (item.setCustomValidity) {
                item.setCustomValidity((valid) ? '' : options.invalidMessage);
            }
            item.classList.add((valid) ? 'valid' : 'invalid');
            item.classList.remove((valid) ? 'invalid' : 'valid');
        });
    },
    validate: function (element, options) {
        var _options = this.options(element, options);
        var runCallback = function (callback) {
            if (typeof callback == 'function') {
                callback.apply(element, new Array(element, _options));
            }
        };
        runCallback(_options.beforeValidate);
        var valid = this.check(element);
        this.decorate(element, valid, _options);
        if (valid) {
            runCallback(_options.onValid);
        }
        else {
            runCallback(_options.onInvalid);
        }
        runCallback(_options.afterValidate);
        return valid;
    },
    form: function (form, options) {
        return this.validate(form, options);
    },
    field: function (field, options) {
        return this.validate(field, options);
    }
};
Validate.init();