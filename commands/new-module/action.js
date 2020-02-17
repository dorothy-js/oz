const workflow = require('./tasks/workflow')


module.exports = async function({ name, folder }, logger){
    await workflow({ name, folder })

}