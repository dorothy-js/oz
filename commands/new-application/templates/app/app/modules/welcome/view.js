import { Application } from '@pollon/pollon'

export class WelcomeView {
    constructor( module ){
        this.template = '@welcome/template.jpt'
        this.Module = module
    }

    init( ...args ){
    }

    onApplyBindings( ...args ){

    }

    onReady(){

    }

    showPartialView( name, template, VM ){

    }

    onDispose( ...args ){

    }
}
