const { Select } = require('enquirer')

module.exports = async function(){
    const whichLoader = new Select({
        message: 'Which file loader do you like to use?',
        choices: [
            { name: 'SystemJS', value: 'systemjs' }
        ],
        result( name ){
            return this.map(name)[name]
        }

    })

    return await whichLoader.run()
}