var Alerts = {

    /**
     * Init carousel
     * @return {void}
     */
    init: function(): void{

        document.addEventListener('click', function(e: Event){

            var close = (<HTMLElement>e.target).closest('.close');
            var alert = (<HTMLElement>e.target).closest('.alert');

            if( close && alert ){
                alert.remove();
                e.preventDefault();
            }

        });

    }

};

Alerts.init();