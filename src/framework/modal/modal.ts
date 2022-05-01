/**
 * In/out animation time
 */
let animationTime = 150

/**
 * Show modal
 * @param element
 */
const show = (element: Element) => {

    element.classList.remove('hidden')
    element.classList.add('visible')

    window.setTimeout(() => {
        element.classList.add('in')
    }, animationTime)

}

/**
 * Hide modal
 * @param element
 */
const hide = (element: Element) => {

    element.classList.remove('in')

    window.setTimeout(() => {
        element.classList.remove('visible')
        element.classList.add('hidden')
    }, animationTime)

}

/**
 * Init modal
 */
const init = () => {

    document.addEventListener('click', (event: Event) => {

        const target = event.target as HTMLElement
        const link = target.closest('[data-modal]') as HTMLElement
        const close = target.closest('.close')
        const backdrop = target.closest('.backdrop')
        let modal = target.closest('.modal')

        if( link ){
            modal = document.querySelector(
                link.dataset.modal
            )
        }

        if( !modal ){
            return
        }

        if( close || backdrop ){
            event.preventDefault()
            hide(modal)
        }else if( link ){
            event.preventDefault()
            show(modal)
        }

    })

}

export const Modal = {
    animationTime,
    show,
    hide,
    init
}