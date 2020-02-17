import { Application } from '@pollon/pollon'

export class _404View {
    constructor( module ){
        this.template = '@404/template.jpt'
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
