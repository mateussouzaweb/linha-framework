/**
 * Cross-browser lazy loading library compatible with "loading" attribute.
 *
 * Simple image:
 * <img loading="lazy" data-src="" src="" ... />
 *
 * With picture:
 * <picture>
 *    <source data-srcset="" .../>
 *    <img loading="lazy" data-src="" src="" ... />
 * </picture>
 */
var Lazy = {

    /**
     * Active flag
     * @var {boolean}
     */
    active: false,

    /**
     * Init carousel
     * @return {void}
     */
    init: function(): void {

        var self = this;
        var elements = Array.from( document.querySelectorAll('[loading]') );

        /**
         * Process and load elements
         * @return {void}
         */
        function processElements(): void{

            if( elements.length === 0 ){
                return;
            }

            elements.forEach(function(element){
                if( self.isInViewport(element) ){

                    self.loadElement(element as HTMLImageElement);
                    elements = elements.filter(function(theElement) {
                        return element !== theElement;
                    });

                }
            });

        }

        /**
         * Lazy load elements
         * @return {void}
         */
        function runLoad(): void{

            if( self.active ){
                return;
            }

            self.active = true;
            window.setTimeout(function(){

                processElements();

                if( elements.length === 0 ){
                    document.removeEventListener('scroll', runLoad);
                    window.removeEventListener('resize', runLoad);
                    window.removeEventListener('orientationchange', runLoad);
                }

                self.active = false;

            }, 200);

        }

        if( 'loading' in HTMLImageElement.prototype ){
            (elements as HTMLImageElement[]).forEach(function(element){
                self.loadElement(element);
            });
        }else{
            document.addEventListener('scroll', runLoad);
            window.addEventListener('resize', runLoad);
            window.addEventListener('orientationchange', runLoad);
            runLoad();
        }

    },

    /**
     * Update element attributes
     * @param {Element} element
     * @return {void}
     */
    updateElement: function(element: HTMLImageElement | HTMLSourceElement): void{

        if( element.dataset.src ){
            element.src = element.dataset.src;
        }
        if( element.dataset.srcset ){
            element.srcset = element.dataset.srcset;
        }
        if( element.dataset.sizes ){
            element.sizes = element.dataset.sizes;
        }

        element.classList.remove('lazy');

    },

    /**
     * Load element
     * @param {Element} element
     * @return {void}
     */
    loadElement: function(element: HTMLImageElement): void{

        var self = this;
            self.updateElement(element);

        // Process sibling <source/> element
        var child = element.parentElement.querySelectorAll('source');
            child = [].slice.call(child);

        if( !child.length ){
            return;
        }

        child.forEach(function(childElement){
            self.updateElement(childElement);
        });

    },

    /**
     * Return if element is in viewport
     * @param {Element} element
     * @return {Boolean}
     */
    isInViewport: function(element: Element): boolean{
        return ( element.getBoundingClientRect().top <= window.innerHeight
                && element.getBoundingClientRect().bottom >= 0 )
                && getComputedStyle(element).display !== 'none';
    }

};

document.addEventListener('DOMContentLoaded', function(){
    Lazy.init();
});