const path = require('path')
const dashify = require('dashify')
const { renderDir } = require('../../utils/render')
const npmInstall = require('./npm-install')
const createImportMap = require('./create-import-map')

const pollonPackages = [
    '@pollon/light-dom',
    '@pollon/state-machine',
    '@pollon/message-broker',
    '@pollon/pollon',
    '@pollon/http',
    '@pollon/juice',
    '@pollon/juice-lang',
    '@pollon/knockout',
    '@pollon/system-js',
    '@pollon/decorators'
]

module.exports = async function ({ name, npm, registry, git, host, package, loader, bundler }){
    let template = path.join(__dirname, '../', 'templates/app')
    let cwd = path.join(process.cwd(), dashify(name))

    await renderDir(template, cwd, {
        app: {
            name,
            package,
            bundler,
            loader
        }
    })

    process.chdir(cwd)

    await createImportMap({ name, npm, registry, cwd, pollonPackages, loader, bundler })
    await npmInstall({ name, npm, registry, cwd, pollonPackages, loader, bundler })
    console.log('\n')
}