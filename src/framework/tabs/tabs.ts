/**
 * Activate the next active tab
 * @param element
 * @param tabId
 */
const activate = (element: HTMLElement, tabId: string) => {

    const current = element.querySelector('li.active') as HTMLElement
    let currentId: string
    let currentTab: HTMLElement

    const next = element.querySelector('li[data-tab-id="' + tabId + '"]')
    const nextTab = document.querySelector('[data-tab="' + tabId + '"]')

    if( current ){
        current.classList.remove('active')
        currentId = current.dataset.tabId
        currentTab = document.querySelector('[data-tab="' + currentId + '"]')
    }

    if( currentTab ){
        currentTab.classList.remove('active')
    }

    if( next ){
        next.classList.add('active')
    }

    if( nextTab ){
        nextTab.classList.add('active')
    }

}

/**
 * Init tabs
 */
const init = () => {

    document.addEventListener('click', (event: Event) => {

        const target = event.target as HTMLElement
        const tabs = target.closest('ul.tabs') as HTMLElement
        const li = target.closest('li') as HTMLElement

        if( tabs && li ){
            event.preventDefault()
            if( !li.classList.contains('disabled') ){
                activate(tabs, li.dataset.tabId)
            }
        }

    })

}

export const Tabs = {
    activate,
    init
}