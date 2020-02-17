const { spawn } = require('child_process')


module.exports = function exec( command, args, options ){
    let cwd = options.cwd || process.cwd()
    return new Promise(function( resolve, reject ){
        var proc = spawn(command, args, {
            cwd: cwd
        })

        proc.on('error', function( error ){
            reject(new Error(command + ' ' + args.join(' ') + ' in ' + cwd + 'encountered error ' + error.message))
            console.log(error)
        })
        
        proc.on('exit', function( code ){
            if( code !== 0 ){
                reject(new Error(command + ' ' + args.join(' ') + ' in ' + cwd + ' exited with code ' + code))
            }else{
                resolve()
            }
        })
    })
}