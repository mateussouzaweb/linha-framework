/**
 * In/out animation time
 */
let animationTime = 150

/**
 * Show modal
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

        const target = <HTMLElement>event.target
        const link = target.closest('[data-modal]') as HTMLElement
        const close = target.closest('.close') as HTMLElement
        const backdrop = target.closest('.backdrop') as HTMLElement
        let modal = target.closest('.modal') as HTMLElement

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