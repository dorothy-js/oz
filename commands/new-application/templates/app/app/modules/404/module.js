import { Module, Lifecycle } from '@pollon/pollon'
import { _404View as View } from './view'

export class _404 extends Module {
    constructor() {
        super()
        this.name = 'anonymous._404'
        this.title = '_404'
        this.View = new View(this)
        this.Lifecycle = new Lifecycle(this)
    }

    onReady() {
        this.View.onReady()
    }
}