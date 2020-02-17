const path = require('path')
const stat = require('./stat')

const searchCWD = function( dir ){
    let parent = path.join(dir, '..')

    if( parent === dir ){
        return
    }

    return stat(path.join(dir, '.pollon.json'))
        .then(() => dir)
        .catch(() => searchCWD(parent))
}

module.exports = searchCWD