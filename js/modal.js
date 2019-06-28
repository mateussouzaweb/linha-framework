(function(){

    var Modal = {

        animationTime: 150,

        /**
         * Init modal
         * @return {void}
         */
        init: function(){

            var self = this;
            var body = document.body;

            jQuery(body).on('click', '[data-modal]', function(event){

                var element = document.querySelector(
                    this.dataset.modal
                );

                event.preventDefault();
                self.show(element);

            });

            jQuery(body).on('click', '.modal .backdrop', function(event){

                var element = jQuery(this).parents('.modal')[0];

                event.preventDefault();
                self.hide(element);

            });

            jQuery(body).on('click', '.modal .close', function(event){

                var element = jQuery(this).parents('.modal')[0];

                event.preventDefault();
                self.hide(element);

            });

        },

        /**
         * Show modal
         * @param {Node} element
         * @return {void}
         */
        show: function(element){

            var self = this;
            var body = document.body;

            body.classList.add('modal-open');

            element.classList.remove('hidden');
            element.classList.add('visible')

            window.setTimeout(function(){
                element.classList.add('in');
            }, self.animationTime);

        },

        /**
         * Hide modal
         * @param {Node} element
         * @return {void}
         */
        hide: function(element){

            var self = this;
            var body = document.body;

            body.classList.remove('modal-open');
            element.classList.remove('in');

            window.setTimeout(function(){
                element.classList.remove('visible');
                element.classList.add('hidden')
            }, self.animationTime);

        }

    };

    window.Modal = Modal;

})();