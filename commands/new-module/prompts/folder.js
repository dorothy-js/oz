const { Input } = require('enquirer')
const { errorIfModuleFolderExists, getModuleFolder } = require('../utils')


module.exports = async function ( name ) {

    const folder = new Input({
        message: 'In which folder do you want to add it? (relative to \'app/modules\')',
        initial: '.',
        async validate( value, state, item, index ){
            let error = await errorIfModuleFolderExists(value, name)
            if( error ){
                folder.styles.danger(error)
            }
            return true
        },
        result( folder ){
            return getModuleFolder(folder, name)
        }
    })

    const location = await folder.run()
    return { folder: location }
}
