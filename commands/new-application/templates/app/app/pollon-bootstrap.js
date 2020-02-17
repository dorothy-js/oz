function getInfo( thisFile, rootFrag ){
    var script, src, main, base

    script = document.querySelector('script[src*="' + thisFile + '"]')
    src = script.attributes.src.value
    main = script.attributes['data-main'].value
    base = src.slice(0, src.indexOf(thisFile))
    return [base + rootFrag, main]
}

function load( file ){
    return new Promise(function( resolve, reject ){
        var script
        script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => resolve()
        script.src = file
        document.querySelector('head').appendChild(script)
    })
}

function makeImportMap( path ){
    var script
    script = document.createElement('script')
    script.type = 'systemjs-importmap'
    script.src = `${path}import-maps.json`
    document.querySelector('head').appendChild(script)
}

var paths = getInfo('app/pollon-bootstrap.js', '../')

makeImportMap(paths[0]);

[
    paths[0] + 'node_modules/systemjs/dist/system.js',
    paths[0] + 'node_modules/@pollon/system-js/dist/system-js-plugins/text.js',
    paths[0] + 'node_modules/@pollon/system-js/dist/system-js-plugins/auto-extension.js',
    paths[0] + 'node_modules/systemjs/dist/extras/amd.js',
    paths[0] + 'node_modules/systemjs/dist/extras/named-register.js',
    paths[0] + 'node_modules/systemjs/dist/extras/named-exports.js',
    paths[0] + 'node_modules/systemjs/dist/extras/use-default.js'
]
    .map( file => `${paths[0]}${file}`)
    .reduce(( previous, current ) => previous.then(() => load(current) ), Promise.resolve())
    .then(() => System.import(paths[1]) )
