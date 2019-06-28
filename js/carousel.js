(function(){

    var Carousel = {

        /**
         * Init carousel
         * @return {void}
         */
        init: function(){

            var self = this;
            var body = document.body;

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

            scroll.scrollLeft = (next - 1) * itemWidth;

        }

    };

    window.Carousel = Carousel;

})();