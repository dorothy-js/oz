const { Toggle, Select, Input  } = require('enquirer')
const isUrl = require('is-valid-http-url')

module.exports = async function(){
    
    const package_manager = new Select({
        message: 'Which package manager do you want you use?',
        choices: [
            { name: 'npm' },
            { name: 'yarn'}
        ]
    })

    let npm = await package_manager.run()

    const custom_registry_yn = new Toggle({
        message: 'Are you using a custom registy?',
        enabled: 'Yep',
        disabled: 'Nope'

    })

    const cr = await custom_registry_yn.run()

    if (!cr) {
        return { npm }
    }

    const custom_registry = new Input({
        message: 'So, where is it?',
        initial: 'http://127.0.0.1:4873',
        validate(value, state, item, index) {
            if( !isUrl(value) ){
                return custom_registry.styles.danger('The value you enetered is not a valid url')
            }
            return true
        }
    })

    const registry = await custom_registry.run()
    return { npm, registry }
}
