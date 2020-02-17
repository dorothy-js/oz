const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const dashify = require('dashify')
const pascalcase = require('pascalcase')
const ProgressBar = require('cli-progress')
const exec = require('../../utils/exec')
const { renderDir } = require('../../utils/render')
const { getProjectInfo } = require('../../utils/project')
const getCWD = require('../../utils/get-cwd')


module.exports = async function ({ name, folder }){
    let cwd = await getCWD(process.cwd())

    let pollonJSON = getProjectInfo(path.join(cwd, '.pollon.json'))

    let app = pollonJSON.name

    let bar = new ProgressBar.Bar({
        format: chalk.cyan('{bar}: ') + chalk.magentaBright(`${app} | Creating module ${name}`),
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })

    bar.start(100)
    bar.update(33)

    let template = path.join(__dirname, '../', 'templates/module')
    let alias = dashify(name)

    await renderDir(template, folder, {
        module: {
            name: pascalcase(name),
            alias
        }
    })

    bar.update(66)

    let modulePath = path.relative(path.join(cwd,'app'), folder)
    pollonJSON.aliases[`@${alias}/`] = `/${modulePath}/`

    fs.writeFileSync(path.join(cwd, '.pollon.json'), JSON.stringify(pollonJSON, null, 4))

    await exec('pollon', ['app:build'], { cwd })
    
    bar.update(100)
    bar.stop()

    console.log('\n')
}