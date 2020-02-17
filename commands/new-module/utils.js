const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const dashify = require('dashify')
const { getProjectInfo } = require('../utils/project')
const getCWD = require('../utils/get-cwd')

module.exports.throwIfModuleExistsInProject = async ( name ) =>{
    let cwd = await getCWD(process.cwd())
    let alias = dashify(name)
    let pollonJSON = getProjectInfo(path.join(cwd, '.pollon.json'))

    if (pollonJSON.aliases[`@${alias}/`]) {
        let message = chalk.redBright(`Sorry but a module called ${name} already exists in the current project!\n`) + chalk.redBright.bold('\nAborting...\n')
        throw new Error(message)
    }
}

const getModuleFolder = async( folder, name ) =>{
    let cwd = await getCWD(process.cwd())

    let alias = dashify(name)
    return path.join(cwd, 'app', 'modules', folder, alias)
}

module.exports.getModuleFolder = getModuleFolder

module.exports.errorIfModuleFolderExists = async ( folder, name ) => {
    let moduleCWD = await getModuleFolder(folder, name)

    if( fs.existsSync(moduleCWD) ){
        return `Sorry but a folder called ${name} already exists in the current project!\n\nAborting...\n`
    }
}