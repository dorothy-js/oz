import { Module, Lifecycle } from '@pollon/pollon'
import { WelcomeView as View } from './view'

export class Welcome extends Module {
    constructor() {
        super()
        this.name = 'anonymous.Welcome'
        this.title = 'Welcome'
        this.View = new View(this)
        this.Lifecycle = new Lifecycle(this)
    }

    onReady() {
        this.View.onReady()
    }
}