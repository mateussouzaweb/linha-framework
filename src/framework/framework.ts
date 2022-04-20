import { Alerts } from "./alerts/alerts.js"
import { Carousel } from "./carousel/carousel.js"
import { Lazy } from "./lazy/lazy.js"
import { Modal } from "./modal/modal.js"
import { Tabs } from "./tabs/tabs.js"
import { Validate } from "./validate/validate.js"

document.addEventListener('DOMContentLoaded', () => {
    Lazy.init()
    Alerts.init()
    Carousel.init()
    Modal.init()
    Tabs.init()
    Validate.init()
})

export {}