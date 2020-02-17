import { Module, Lifecycle } from '@pollon/pollon'
import { {% this.module.name %}View as View } from './view'

export class {% this.module.name %} extends Module {
    constructor() {
        super()
        this.name = 'anonymous.{% this.module.name %}'
        this.title = '{% this.module.name %}'
        this.View = new View(this)
        this.Lifecycle = new Lifecycle(this)
    }

    onReady() {
        this.View.onReady()
    }
}