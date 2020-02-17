const workflow = require('./tasks/workflow')


module.exports = async function({ name, npm, registry, git, host, package, loader, bundler }, logger){
    await workflow({ name, npm, registry, git, host, package, loader, bundler })

}