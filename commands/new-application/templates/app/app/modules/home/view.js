import { Application } from '@pollon/pollon'

export class HomeView {
    constructor( module ){
        this.template = '@home/template.jpt'
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
