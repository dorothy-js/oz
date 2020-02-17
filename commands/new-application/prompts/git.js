const { Toggle, Select, Input  } = require('enquirer')
const isUrl = require('is-valid-http-url')

module.exports = async function(){
    const wants = new Toggle({
        message: 'Do you want to initialize a git repository for it?',
        enabled: 'Yep',
        disabled: 'Nope'

    })

    const git = await wants.run()

    if( !git ){
        return git
    }

    const version_control = new Select({
        message: 'Where do you want to host it?',
        choices: [
            { name: 'GitHub', value: 'https://github.com/' },
            { name: 'Bitbucket', value: 'https://bitbucket.com/' },
            { name: 'Let me decide', value: 'Let me decide' }
        ],
        result( name ){
            return this.map(name)[name]
        }

    })

    const host = await version_control.run()
    if( 'Let me decide' != host ){
        return { git, host }
    }

    const custom_host = new Input({
        message: 'So, where is it?',
        initial: 'https://my.cool.git',
        validate(value, state, item, index) {
            if( !isUrl(value) ){
                return custom_host.styles.danger('The value you entered is not a valid url')
            }
            return true
        },
        result( name ){
            return name.replace(/\/?$/, '/') // add trailing slash if not present
        }
    })

    const other = await custom_host.run()
    return { git, host: other }
}
