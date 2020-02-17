import { Module, Lifecycle } from '@pollon/pollon'
import { HomeView as View } from './view'

export class Home extends Module {
    constructor() {
        super()
        this.name = 'anonymous.Home'
        this.title = 'Home'
        this.View = new View(this)
        this.Lifecycle = new Lifecycle(this)
    }

    onReady() {
        this.View.onReady()
    }
}