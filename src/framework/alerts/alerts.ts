/**
 * Init alerts
 */
const init = () => {

    document.addEventListener('click', (event: Event) => {

        const close = (<HTMLElement>event.target).closest('.close')
        const alert = (<HTMLElement>event.target).closest('.alert')

        if( close && alert ){
            alert.remove()
            event.preventDefault()
        }

    })

}

export const Alerts = {
    init
}
