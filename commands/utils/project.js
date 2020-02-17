const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const getCWD = require('./get-cwd')

module.exports.throwIfInProject = async ( name ) =>{
    const inProject = await getCWD(process.cwd())
    if( inProject ){
        let message = chalk.redBright('Sorry but you cannot create a new app here. You are already in a Pollon project!\n') + chalk.redBright.bold('\nAborting...\n')
        throw new Error(message)
    }
}

module.exports.throwIfNotInProject = async () =>{
    const inProject = await getCWD(process.cwd())
    if( !inProject ){
        let message = chalk.redBright('Sorry but you cannot run this command outside a Pollon project!\n') + chalk.redBright.bold('\nAborting...\n')
        throw new Error(message)
    }
}

module.exports.throwIfFolderExists = ( name ) =>{
    let folder = path.join(process.cwd(), name)
    if( fs.existsSync(folder) ){
        let message = chalk.redBright(`Sorry but it appears that a folder called ${name} already exists!\n`) + chalk.redBright.bold('\nAborting...\n')
        throw new Error(message)
    }
}


module.exports.getProjectInfo = ( path ) =>{
    let config = require(path)

    if( !config.name ){
        throw new Error('Build error. Invalid pollon.json. name parameter is missing')
    }

    if( !config.bundles  ){
        throw new Error('Build error. Invalid pollon.json. bundles parameter is missing')
    }

    return config
}