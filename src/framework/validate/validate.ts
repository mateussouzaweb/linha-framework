declare type ValidableElement = HTMLFormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

declare type ValidateOptions = {
    invalidMessage: string,
    afterValidate: ValidateCallback | undefined,
    beforeValidate: ValidateCallback | undefined,
    onValid: ValidateCallback | undefined,
    onInvalid: ValidateCallback | undefined,
}

declare type ValidateHandle = {
    selector: string,
    options: ValidateOptions
}


declare type ValidateCallback = (element: ValidableElement, options: ValidateOptions) =>  void

/**
 * Validate defaults
 */
const defaults: ValidateOptions = {
    invalidMessage: 'Invalid field value.',
    afterValidate: null,
    beforeValidate: null,
    onValid: null,
    onInvalid: null
}

/**
 * Custom handler options
 */
const handlers: Array<ValidateHandle> = []

/**
 * Attach validation to form or field element by its selector
 * @param selector
 * @param options
 */
const attach = (selector: string, options: ValidateOptions) => {
    handlers.push({
        selector: selector,
        options: options
    })
}

/**
 * Retrieve validate options for given element
 * @param element
 * @param append
 * @returns
 */
const getOptions = (element: ValidableElement, append?: ValidateOptions) => {

    const options = Object.assign(
        {},
        defaults,
        (append || {})
    )

    handlers.map((handler) => {
        if( element.matches(handler.selector) ){
            Object.assign(options, handler.options)
        }
    })

    return options
}

/**
 * Check the validity of an element
 * @param element
 * @param options
 * @returns
 */
const check = (element: ValidableElement, options?: ValidateOptions) => {

    // Form
    if( element.nodeName === 'FORM' ){
        const items = Array.from(element.querySelectorAll('[required]')) as ValidableElement[]
        return items.filter((field) => {
            return !validate(field, options)
        }).length === 0
    }

    // Fields
    if( element.disabled ){
        return true
    }

    if( !element.required ){
        return true
    }

    const value = element.value
    const type = element.getAttribute('type')

    // Selects
    if( element.nodeName === 'SELECT' ){
        return ( value !== '' ) ? true : false
    }

    // CheckBox / Radio
    if( type == 'checkbox' || type == 'radio' ){

        const name = element.getAttribute('name')
        const selector = 'input[name="' + name + '"]:checked'
        const checked = document.querySelectorAll(selector).length

        return (checked == 0) ? false : true
    }

    // Reset current validation
    element.setCustomValidity('')

    // Others
    return value !== '' && element.checkValidity()
}

/**
 * Decorate element based on validity
 * @param element
 * @param valid
 * @param options
 */
const decorate = (element: ValidableElement, valid: boolean, options: ValidateOptions) => {

    const type = element.getAttribute('type')
    const parent = element.closest('.select, label')
    let elements = [element, parent]

    if( type && (type == 'checkbox' || type == 'radio' ) ){

        const name = element.getAttribute('name')
        const selector = 'input[name="' + name + '"]'
        const items = document.querySelectorAll(selector)

        items.forEach((item) => {
            elements.push(item, item.closest('.select, label'))
        })

    }

    elements = elements.filter(Boolean)
    elements = Array.from( new Set(elements) )
    elements.map((item) => {

        if( (item as ValidableElement).setCustomValidity ){
            (item as ValidableElement).setCustomValidity(
                ( valid ) ? '' : options.invalidMessage
            )
        }

        item.classList.add( ( valid ) ? 'valid' : 'invalid')
        item.classList.remove( ( valid ) ? 'invalid' : 'valid')

    })

}

/**
 * Validate element with the options
 * @param element
 * @param options
 * @returns
 */
const validate = (element: ValidableElement, options?: ValidateOptions) => {

    const _options = getOptions(element, options)
    const runCallback = (callback: ValidateCallback) => {
        if( typeof callback == 'function' ){
            callback.apply(element, [element, _options])
        }
    }

    runCallback(_options.beforeValidate)

    const valid = check(element)

    decorate(element, valid, _options)

    if( valid ){
        runCallback(_options.onValid)
    }else{
        runCallback(_options.onInvalid)
    }

    runCallback(_options.afterValidate)

    return valid
}

/**
 * Validate the form
 * @param form
 * @param options
 * @returns
 */
const form = (form: ValidableElement, options?: ValidateOptions) => {
    return validate(form, options)
}

/**
 * Validate an field
 * @param field
 * @param options
 * @returns
 */
const field = (field: ValidableElement, options?: ValidateOptions) => {
    return validate(field, options)
}

/**
 * Init validate
 */
const init = () => {

    document.addEventListener('submit', (event: Event) => {
        const target = event.target as ValidableElement
        const form = target.closest('form')
        if( !validate(form) ){
            event.preventDefault()
            event.stopPropagation()
        }
    })

    document.addEventListener('change', (event: Event) => {
        validate(event.target as ValidableElement)
    })

}

export const Validate = {
    defaults,
    attach,
    getOptions,
    check,
    decorate,
    validate,
    field,
    form,
    init
}