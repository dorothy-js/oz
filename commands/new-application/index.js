const chalk = require('chalk')
const dashify = require('dashify')
const prompts = require('./prompts')
const executeCommand = require('./action')
const { throwIfInProject, throwIfFolderExists } = require('../utils/project')

module.exports = function( prog ){
    prog
        .command('app:new', 'Create a new pollon application')
        .alias('a:n')
        .argument('<name>', 'Name of the app')
        .option('-d, --defaults', 'Skip prompts and apply defaults')
        .action(async ({ name }, { defaults }, logger) => {

            await throwIfInProject(name)            
            await throwIfFolderExists(dashify(name))

            let message = defaults ?
                [ chalk.greenBright('\nGot it! Creating'), chalk.greenBright.bold(name), chalk.greenBright('with default values...\n') ]
                :
                [ chalk.greenBright('\nCool! Let\'s build'), chalk.greenBright.bold(name), chalk.greenBright('together!\n') ]
            
            console.log.apply(console, message)

            if( defaults ){
                return
            }

            const { npm, registry } = await prompts.npm()
            const { git, host } = await prompts.git()
            const { result: package } = await prompts.package({name, git, host})
            const loader = await prompts.loader()
            const bundler = await prompts.bundler()

            await executeCommand({
                name,
                npm,
                registry,
                git,
                host,
                package,
                loader,
                bundler
            }, logger)
        })
}