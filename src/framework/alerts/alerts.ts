/**
 * Init alerts
 */
const init = () => {

    document.addEventListener('click', (event: Event) => {

        const target = event.target as HTMLElement
        const close = target.closest('.close')
        const alert = target.closest('.alert')

        if (close && alert) {
            alert.remove()
            event.preventDefault()
        }

    })

}

export const Alerts = {
    init
}
