const fs = require('fs')

const stat = function( path ){
    return new Promise((resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if (error) reject(error)
            else resolve(stats)
        })
    })
}

module.exports = stat