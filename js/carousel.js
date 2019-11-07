(function(){

    var Carousel = {

        /**
         * User event watcher
         * @var {boolean}
         */
        userEvent: true,

        /**
         * Init carousel
         * @return {void}
         */
        init: function(){

            var self = this;
            var body = document.body;
            var timer = null;
            var parent = null;

            jQuery(body).on('click', '.carousel .next', function(event){

                var element = jQuery(this).parents('.carousel')[0];

                event.preventDefault();
                self.move(element, 'next');

            });

            jQuery(body).on('click', '.carousel .prev', function(event){

                var element = jQuery(this).parents('.carousel')[0];

                event.preventDefault();
                self.move(element, 'prev');

            });

            jQuery(window).on('resize', function(){

                jQuery('.carousel').each(function(){
                    self.move(this, 'current');
                });

            });

            jQuery('.carousel .scroll').on('scroll', function(){

                if( !self.userEvent ){
                    return;
                }

                parent = this.parentElement;

                if( timer ){
                    window.clearInterval(timer);
                }

                timer = window.setTimeout(function(){
                    self.move(parent, 'current');
                }, 100);

            });

        },

        /**
         * Scroll carousel element to given position
         * @param {Node} element
         * @param {String} direction
         * @return {void}
         */
        move: function(element, direction){

            var scroll = element.querySelector('.scroll');
            var items = element.querySelectorAll('.item');

            if( !items.length ){
                return;
            }

            var itemWidth = items[0].offsetWidth;

            var perPage = scroll.clientWidth / itemWidth;
                perPage = Math.round(perPage);

            var current = (scroll.scrollLeft / itemWidth) + 1;
                current = Math.round(current);

            var count = items.length;
            var append = count % perPage;
            var next;

            // Next
            if( direction == 'next' ){

                next = current + perPage;

                if( !append && next > count ){
                    next = 1;

                }else if( append && next >= count ){

                    if( current + append < count ){
                        next = current + append;
                    }else{
                        next = 1;
                    }

                }

            // Prev
            }else if( direction == 'prev' ){

                next = current - perPage;

                if( !append && next <= 0 ){
                    next = count;

                }else if( append && next <= 0 ){

                    if( current - append > 0 ){
                        next = current - append;
                    }else{
                        next = count;
                    }

                }

            // Current
            }else{
                next = current;
            }

            this.userEvent = false;
            scroll.scrollLeft = (next - 1) * itemWidth;
            this.userEvent = true;

        }

    };

    window.Carousel = Carousel;

})();