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
 *
 * With iframe:
 * <iframe loading="lazy" data-src="" src="" ... />
 */

declare type LazyLoadableElement = HTMLImageElement | HTMLSourceElement | HTMLIFrameElement

/**
 * Active flag
 */
let active = false

/**
 * Return if element is in viewport
 * @param element
 */
const isInViewport = (element: Element) => {
    return (element.getBoundingClientRect().top <= window.innerHeight
        && element.getBoundingClientRect().bottom >= 0)
        && getComputedStyle(element).display !== 'none'
}

/**
 * Update element attributes
 * @param element
 */
const updateElement = (element: LazyLoadableElement) => {

    if (element.dataset.src) {
        element.src = element.dataset.src
    }
    if ('srcset' in element && element.dataset.srcset) {
        element.srcset = element.dataset.srcset
    }
    if ('sizes' in element && element.dataset.sizes) {
        element.sizes = element.dataset.sizes
    }

    element.classList.remove('lazy')

}

/**
 * Load element
 * @param element
 */
const loadElement = (element: LazyLoadableElement) => {

    updateElement(element)

    const parent = element.parentElement
    if (!parent) {
        return
    }

    // Process sibling <source/> element
    Array.from(parent.querySelectorAll('source'))
    .forEach((childElement) => {
        updateElement(childElement)
    })

}

/**
 * Process and load elements in viewport
 * Also returns the filtered remaining list of elements not processed
 * @param elements
 * @returns
 */
const processElementsInViewport = (elements: LazyLoadableElement[]) => {

    if (elements.length === 0) {
        return []
    }

    elements.forEach((element) => {
        if (isInViewport(element)) {

            loadElement(element)
            elements = elements.filter((theElement) => {
                return element !== theElement
            })

        }
    })

    return elements
}

/**
 * Init lazy
 */
const init = () => {

    let elements = Array.from(document.querySelectorAll('[loading]')) as LazyLoadableElement[]

    const runLoad = () => {

        if (active) {
            return
        }

        active = true
        window.setTimeout(() => {

            elements = processElementsInViewport(elements)

            if (elements.length === 0) {
                document.removeEventListener('scroll', runLoad)
                window.removeEventListener('resize', runLoad)
                window.removeEventListener('orientationchange', runLoad)
            }

            active = false

        }, 200)

    }

    if ('loading' in HTMLImageElement.prototype) {
        elements.forEach((element) => {
            loadElement(element)
        })
    } else {
        document.addEventListener('scroll', runLoad, { passive: true })
        window.addEventListener('resize', runLoad, { passive: true })
        window.addEventListener('orientationchange', runLoad, { passive: true })
        runLoad()
    }

}

export const Lazy = {
    isInViewport,
    updateElement,
    loadElement,
    processElementsInViewport,
    init
}
