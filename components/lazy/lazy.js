document.addEventListener('DOMContentLoaded', function () {
    var active = false;
    var elements = Array.from(document.querySelectorAll('[loading]'));
    function updateElement(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
        }
        if (element.dataset.srcset) {
            element.srcset = element.dataset.srcset;
        }
        if (element.dataset.sizes) {
            element.sizes = element.dataset.sizes;
        }
        element.classList.remove('lazy');
    }
    function loadElement(element) {
        updateElement(element);
        var child = element.parentElement.querySelectorAll('source');
        child = [].slice.call(child);
        if (!child.length) {
            return;
        }
        child.forEach(function (childElement) {
            updateElement(childElement);
        });
    }
    function isInViewport(element) {
        return (element.getBoundingClientRect().top <= window.innerHeight
            && element.getBoundingClientRect().bottom >= 0)
            && getComputedStyle(element).display !== 'none';
    }
    function processElements() {
        if (elements.length === 0) {
            return;
        }
        elements.forEach(function (element) {
            if (isInViewport(element)) {
                loadElement(element);
                elements = elements.filter(function (theElement) {
                    return element !== theElement;
                });
            }
        });
    }
    function lazyLoad() {
        if (active) {
            return;
        }
        active = true;
        window.setTimeout(function () {
            processElements();
            if (elements.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationchange', lazyLoad);
            }
            active = false;
        }, 200);
    }
    if ('loading' in HTMLImageElement.prototype) {
        elements.forEach(loadElement);
    }
    else {
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad();
    }
});
