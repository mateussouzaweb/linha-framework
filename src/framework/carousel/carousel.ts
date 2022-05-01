/**
 * User event watcher
 */
let userEvent = true

/**
 * Scroll carousel element to given position
 * @param element
 * @param direction
 */
const move = (element: Element, direction: string) => {

    const scroll = element.querySelector('.scroll')
    const items = element.querySelectorAll('.item')

    if( !items.length ){
        return
    }

    const itemWidth = (items[0] as HTMLElement).offsetWidth

    let perPage = scroll.clientWidth / itemWidth
        perPage = Math.round(perPage)

    let current = (scroll.scrollLeft / itemWidth) + 1
        current = Math.round(current)

    let count = items.length
    let append = count % perPage
    let next: number

    // Next
    if( direction == 'next' ){

        next = current + perPage

        if( !append && next > count ){
            next = 1

        }else if( append && next >= count ){

            if( current + append < count ){
                next = current + append
            }else{
                next = 1
            }

        }

    // Previous
    }else if( direction == 'previous' ){

        next = current - perPage

        if( !append && next <= 0 ){
            next = count

        }else if( append && next <= 0 ){

            if( current - append > 0 ){
                next = current - append
            }else{
                next = count
            }

        }

    // Current
    }else{
        next = current
    }

    userEvent = false
    scroll.scrollLeft = (next - 1) * itemWidth
    userEvent = true

}

/**
 * Init carousel
 */
const init = () => {

    let timer = null
    let parent = null

    document.addEventListener('click', (event: Event) => {

        const target = event.target as HTMLElement
        const next = target.closest('.next')
        const previous = target.closest('.previous')
        const element = target.closest('.carousel')

        if( next && element ){
            event.preventDefault()
            move(element, 'next')
        }
        if( previous && element ){
            event.preventDefault()
            move(element, 'previous')
        }

    })

    document.addEventListener('scroll', (event: Event) => {

        if( !userEvent || event.target === document ){
            return
        }

        const target = event.target as HTMLElement
        const scroll = target.closest('.scroll')

        if( !scroll ){
            return
        }

        parent = scroll.closest('.carousel')

        if( !parent ){
            return
        }

        if( timer ){
            window.clearInterval(timer)
        }

        timer = window.setTimeout(() => {
            if( parent ){
                move(parent, 'current')
            }
        }, 100)

    }, true)

    window.addEventListener('resize', () => {

        const items = document.querySelectorAll('.carousel')

        items.forEach((item) => {
            move(item, 'current')
        })

    })

}

export const Carousel = {
    move,
    init
}