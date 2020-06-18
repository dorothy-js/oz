const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ProgressBar = require('cli-progress')

const getImportMap = function ({ pollonPackages, loader, bundler }) {
    return {
        imports: [
            ...(pollonPackages.map(p => {
                let path = p.split('/')[1]
                return { [p]: `./node_modules/${p}/dist/${path}.system.js` }
            })),
            {
                'knockout': './node_modules/knockout/build/output/knockout-latest.debug.js',
                'komapping': 'https://cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min.js'
            }
        ].reduce((a, b) => Object.assign(a, b), {})
    }
}

module.exports = async function ({ name, npm, registry, cwd, pollonPackages, loader, bundler }) {
    let bar = new ProgressBar.Bar({
        format: chalk.cyan('{bar}: ') + chalk.magentaBright(`${name} | Creating import map`),
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })

    bar.start(100)
    bar.update(10)

    const importmaps = getImportMap({ pollonPackages, bundler, loader })
    fs.writeFileSync(path.join(cwd, 'import-maps.json'), JSON.stringify(importmaps, null, 4))

    bar.update(100)
    bar.stop()
}