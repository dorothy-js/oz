const { Select } = require('enquirer')

module.exports = async function(){
    const whichBundler = new Select({
        message: 'and which bundler?',
        choices: [
            { name: 'Babel', value: 'babel' }
        ],
        result( name ){
            return this.map(name)[name]
        }

    })

    return await whichBundler.run()
}