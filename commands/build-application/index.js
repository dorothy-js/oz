const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const chokidar = require('chokidar')
const ProgressBar = require('cli-progress')
const exec = require('../utils/exec')
const { throwIfNotInProject, getProjectInfo } = require('../utils/project')
const getCWD = require('../utils/get-cwd')


const getRealPath = function( key, value, cwd ){
    let matches = value.match(/^#(url|dist|nm):(.*)/)
    let type
    let fragment = value
    let trailingSlash = key.slice(key.length - 1) == path.sep ? path.sep : ''
    let leadingSlash = ''

    if( !matches || matches.length != 3 ){
        type = 'dist'    
        leadingSlash = value[0] == path.sep ? '' : path.sep
    }else{
        type = matches[1]
        fragment = matches[2]
        leadingSlash = fragment[0] == path.sep ? '' : path.sep
    }
    
    if( 'dist' == type ){
        let p = path.join(cwd, `./dist${leadingSlash}${fragment}`)
        return `.${path.sep}` + path.relative(cwd, p) + trailingSlash
    }

    if( 'url' == type ){
        return fragment
    }

    if( 'nm' == type ){
        let p = path.join(cwd, `node_modules/${leadingSlash}${fragment}`)
        return `.${path.sep}` + path.relative(cwd, p) + trailingSlash
    }

}

const BUILD_LOCK_FILE = '.pollon.build.lock'

const buildWatcher = function( cwd ){
    let file = path.join(cwd, BUILD_LOCK_FILE)
    const watcher = chokidar.watch('app/**', { cwd })
    let building = false
    let firstTime = true
    watcher.on('all', async function(){
        if( building ){
            return
        }
        building = true
        
        let message = firstTime ? chalk.yellowBright('Listening for changes... ( CRL+C to stop )') : chalk.yellowBright('Changes detected. Rebuilding...')
        
        console.log(message)
        let command = 'app --out-dir dist --plugins=@babel/plugin-transform-modules-systemjs --source-maps --copy-files'
        await exec('babel', command.split(' '), { cwd })
        building = false
        firstTime = false
    })

    fs.writeFileSync(path.join(cwd, BUILD_LOCK_FILE))

    let sink = function(){
       
        watcher.unwatch('app/**')

        if( !fs.existsSync(file) ){
            return
        }
        fs.unlinkSync(file)
    }

    
    process.on('exit', function(){
        
    })

    // catch ctrl+c event
    process.on('SIGINT', function(){
        sink()
        process.exit(2)
    })

    //catch uncaught exceptions
    process.on('uncaughtException', function( e ){
        if( !e.noCleanup ){
            sink()
        }
        process.exit(99)
    })
}

module.exports = async function (prog) {
    prog
        .command('app:build', 'Compile a Pollon application')
        .alias('a:b')
        .option('-w, --watch', 'Watch the project for changes and rebuild the project. May need sudo privileges')
        .action(async (args, opts, logger) => {
            await throwIfNotInProject()

            let cwd = await getCWD(process.cwd())
            let { bundler, name, aliases } = getProjectInfo(path.join(cwd, '.pollon.json'))
            

            if( fs.existsSync(path.join(cwd, BUILD_LOCK_FILE)) ){
                let e = new Error(chalk.redBright('Sorry but you cannot build a project that has a build watcher aready running.\n') + chalk.redBright.bold('\nAborting...\n'))
                e.noCleanup = true
                throw e
            }

            if( bundler != 'babel' ){
                return
            }

            let bar = new ProgressBar.Bar({
                format: chalk.cyan('{bar}: ') + chalk.magentaBright(`${name} | Building`),
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                hideCursor: true
            })
            bar.start(2)
            
            let importmap = require(path.join(cwd, 'import-maps.json'))
            let scopedAliases = Object.entries(aliases)
                .map(([ key, path ]) => {
                    let realpath = getRealPath(key, path, cwd)
                    return { [key]: realpath } 
                }).reduce(( a, b ) => Object.assign(a, b), {})

            importmap.imports = Object.assign(importmap.imports, scopedAliases)

            fs.writeFileSync(path.join(cwd, 'import-maps.json'), JSON.stringify(importmap, null, 4))

            bar.update(1)
            
            let command = 'app --out-dir dist --plugins=@babel/plugin-transform-modules-systemjs --source-maps --copy-files'
            await exec('babel', command.split(' '), { cwd })
            
            if( opts && opts.watch ){
                buildWatcher(cwd)

            }

            bar.update(2)

            bar.stop()
            
            !(opts || opts.watch) && console.log('\n')
        })
}