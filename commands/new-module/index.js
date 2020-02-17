const { throwIfNotInProject } = require('../utils/project')
const executeCommand = require('./action')
const prompts = require('./prompts')
const { throwIfModuleExistsInProject } = require('./utils')

module.exports = function( prog ){
    prog
        .command('module:new', 'Create a new module')
        .argument('<name>', 'Name of the module')
        .option('-d, --defaults', 'Skip prompts and apply defaults')
        .action(async ({ name }, { defaults }, logger) => {
            await throwIfNotInProject()       
            await throwIfModuleExistsInProject(name)
            
            const { folder } = await prompts.folder(name)

            await executeCommand({
                name,
                folder
            }, logger)
        })
}