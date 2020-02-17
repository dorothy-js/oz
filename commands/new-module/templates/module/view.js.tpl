import { Application } from '@pollon/pollon'

export class {% this.module.name %}View {
    constructor( module ){
        this.template = '@{% this.module.alias %}/template.jpt'
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
