var Modal = {

    /**
     * In/out animation time
     * @var {Number}
     */
    animationTime: 150,

    /**
     * Init modal
     * @return {void}
     */
    init: function(): void{

        var self = this;

        document.addEventListener('click', function(e){

            var link = (<HTMLElement>e.target).closest('[data-modal]') as HTMLElement;
            var close = (<HTMLElement>e.target).closest('.close') as HTMLElement;
            var backdrop = (<HTMLElement>e.target).closest('.backdrop') as HTMLElement;
            var modal = (<HTMLElement>e.target).closest('.modal') as HTMLElement;

            if( link ){
                modal = document.querySelector(
                    link.dataset.modal
                );
            }

            if( !modal ){
                return;
            }

            if( close || backdrop ){
                e.preventDefault();
                self.hide(modal);
            }else if( link ){
                e.preventDefault();
                self.show(modal);
            }

        });

    },

    /**
     * Show modal
     * @param {Element} element
     * @return {void}
     */
    show: function(element: Element): void{

        var self = this;

        element.classList.remove('hidden');
        element.classList.add('visible')

        window.setTimeout(function(){
            element.classList.add('in');
        }, self.animationTime);

    },

    /**
     * Hide modal
     * @param {Element} element
     * @return {void}
     */
    hide: function(element: Element): void{

        var self = this;

        element.classList.remove('in');

        window.setTimeout(function(){
            element.classList.remove('visible');
            element.classList.add('hidden')
        }, self.animationTime);

    }

};

Modal.init();