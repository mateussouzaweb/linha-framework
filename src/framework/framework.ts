import { Alerts } from "./alerts/alerts"
import { Carousel } from "./carousel/carousel"
import { Lazy } from "./lazy/lazy"
import { Modal } from "./modal/modal"
import { Tabs } from "./tabs/tabs"
import { Validate } from "./validate/validate"

document.addEventListener('DOMContentLoaded', () => {
    Lazy.init()
    Alerts.init()
    Carousel.init()
    Modal.init()
    Tabs.init()
    Validate.init()
})

export {}