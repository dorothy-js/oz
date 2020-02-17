const { Snippet } = require('enquirer')
const semver = require('semver')

const gitTemplate = ({ name, git, host }) => (git && `
    "homepage": "${host}\${username}/${name}",
    "author": "\${author_name} (${host}\${username})",
    "repository": {
        "type": "git",
        "url": "git+${host}\${username}/${name}.git"
    },`) || ''

const template = ({ name, git, host }) => `{
    "name": "${name}",
    "description": "\${description}",
    "version": "\${version}",${gitTemplate({name, git, host})}
    "license": "\${license:ISC}",
    "scripts": {
        "dev:build": "pollon app:build"
    }
}`

module.exports = async function( args ) {
    const package = new Snippet({
        name: 'package',
        message: 'Fill out the fields in package.json',
        required: true,
        fields: [
            {
                name: 'author_name',
                message: 'Your name'
            },
            {
                name: 'description',
                message: 'Another wonderful app build with pollon-js'
            },                    
            {
                name: 'version',
                validate(value, state, item, index) {
                    if (item && item.name === 'version' && !semver.valid(value)) {
                        return package.styles.danger('version should be a valid semver value')
                    }
                    return true
                }
            }
        ],
        template: template(args)
    })

    return await package.run()
}