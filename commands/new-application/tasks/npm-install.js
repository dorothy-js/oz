const chalk = require('chalk')
const ProgressBar = require('cli-progress')
const exec = require('../../utils/exec')

const getPackages = function({ pollonPackages, loader, bundler }){
    return [
        ...pollonPackages,
        ...(loader == 'systemjs' ? [
            'systemjs'
        ] : []),
        ...(bundler == 'babel' ? [
            '@babel/cli',
            '@babel/core',
            '@babel/plugin-transform-modules-systemjs',
            '@babel/plugin-proposal-decorators',
            '@babel/plugin-proposal-class-properties'
        ] : [])
    ].filter(Boolean)
}

const getDevPackages = function () {
    return [
        
    ]
}

module.exports = async function ({ name, npm, registry, cwd, pollonPackages, loader, bundler }){
    const packages = getPackages({ pollonPackages, loader, bundler })
    const devPackages = getDevPackages()

    let bar = new ProgressBar.Bar({
        format: chalk.cyan('{bar}: ') + chalk.magentaBright(`${name} | Installing packages`),
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })
    bar.start(packages.length + devPackages.length)
    
    let done = 0
    await packages
        .map(repo => [npm, 'i', repo])
        .reduce((a, [command, ...options]) => {
            return a.then(() => {
                if( registry ){
                    options.push('--registry', registry)
                }
                return exec(command, options, { cwd })
            }).then(function () {
                bar.update(++done)
            })
        }, Promise.resolve())

    await devPackages
        .map(repo => [npm, 'i', '--only=dev', repo])
        .reduce((a, [command, ...options]) => {
            return a.then(() => {
                if (registry) {
                    options.push('--registry', registry)
                }
                return exec(command, options, { cwd })
            }).then(function () {
                bar.update(++done)
            })
        }, Promise.resolve())        

    bar.stop()

    bar = new ProgressBar.Bar({
        format: chalk.cyan('{bar}: ') + chalk.magentaBright(`${name} | Building`),
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })
    bar.start(1)

    await exec(npm, ['run', 'dev:build'], { cwd })
    bar.update(1)
    bar.stop()
}