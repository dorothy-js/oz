const fs = require('fs')

function copy( oldPath, newPath, reject ){
    var readStream = fs.createReadStream(oldPath)
    var writeStream = fs.createWriteStream(newPath)

    readStream.on('error', reject)
    writeStream.on('error', reject)

    readStream.on('close', function(){
        fs.unlink(oldPath, reject)
    })

    readStream.pipe(writeStream)
}

module.exports = function( oldPath, newPath ){
    return new Promise(function( resolve, reject ){
        fs.rename(oldPath, newPath, function( err ){
            if( err ){
                if( err.code === 'EXDEV' ){
                    copy(oldPath, newPath, reject)
                }else{
                    reject(err)
                }
                return
            }
            resolve()
        })
    })
}