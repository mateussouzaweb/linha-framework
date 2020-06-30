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
    init: function(): void{

        var self = this;
        var timer = null;
        var parent = null;

        document.addEventListener('click', function(e){

            var next = (<HTMLElement>e.target).closest('.next');
            var previous = (<HTMLElement>e.target).closest('.previous');
            var element = (<HTMLElement>e.target).closest('.carousel');

            if( next && element ){
                e.preventDefault();
                self.move(element, 'next');
            }
            if( previous && element ){
                e.preventDefault();
                self.move(element, 'previous');
            }

        });

        document.addEventListener('scroll', function(e){

            if( !self.userEvent || e.target === document ){
                return;
            }

            var scroll = (<HTMLElement>e.target).closest('.scroll');

            if( !scroll ){
                return;
            }

            parent = scroll.closest('.carousel');

            if( timer ){
                window.clearInterval(timer);
            }

            timer = window.setTimeout(function(){
                self.move(parent, 'current');
            }, 100);

        }, true);

        window.addEventListener('resize', function(){

            var items = document.querySelectorAll('.carousel');

            [].forEach.call(items, function(item: Element){
                self.move(item, 'current');
            });

        });

    },

    /**
     * Scroll carousel element to given position
     * @param {Element} element
     * @param {String} direction
     * @return {void}
     */
    move: function(element: Element, direction: string): void{

        var scroll = element.querySelector('.scroll');
        var items = element.querySelectorAll('.item');

        if( !items.length ){
            return;
        }

        var itemWidth = (<HTMLElement>items[0]).offsetWidth;

        var perPage = scroll.clientWidth / itemWidth;
            perPage = Math.round(perPage);

        var current = (scroll.scrollLeft / itemWidth) + 1;
            current = Math.round(current);

        var count = items.length;
        var append = count % perPage;
        var next: number;

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

        // Previous
        }else if( direction == 'previous' ){

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

Carousel.init();