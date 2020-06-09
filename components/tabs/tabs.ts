var Tabs = {

    /**
     * Init tabs
     * @return {void}
     */
    init: function(): void{

        var self = this;

        document.addEventListener('click', function(e){

            var tabs = (<HTMLElement>e.target).closest('ul.tabs');
            var li = (<HTMLElement>e.target).closest('li');

            if( tabs && li ){
                self.activate(tabs, li.dataset.tabId);
                e.preventDefault();
            }

        });

    },

    /**
     * Activate the next active tab
     * @param {HTMLElement} element
     * @param {String} tabId
     * @return {void}
     */
    activate: function(element: HTMLElement, tabId: string): void{

        var current = element.querySelector('li.active') as HTMLElement;
        var currentId = null;
        var currentTab = null;

        var next = element.querySelector('li[data-tab-id="' + tabId + '"]') as HTMLElement;
        var nextTab = document.querySelector('[data-tab="' + tabId + '"]') as HTMLElement;

        if( current ){
            current.classList.remove('active');
            currentId = current.dataset.tabId;
            currentTab = document.querySelector('[data-tab="' + currentId + '"]');
        }

        if( currentTab ){
            currentTab.classList.remove('active');
        }

        if( next ){
            next.classList.add('active');
        }

        if( nextTab ){
            nextTab.classList.add('active');
        }

    }

};

Tabs.init();