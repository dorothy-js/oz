const fs = require('fs')
const path = require('path')

// code taken from 
// https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
const render = function( html, options ){
    var re = /{%([^%}]+)?%}/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match
    var add = function( line, js ){
        js? (code += line.match(reExp) ? line + '\n' : `r.push(${line});\n`) :
            (code += line != '' ? `r.push(\`${line.replace(/`/g, '\\\\`')}\`);\n` : '')
        return add
    }
    match = re.exec(html)
    while( match ){
        add(html.slice(cursor, match.index))(match[1], true)
        cursor = match.index + match[0].length
        match = re.exec(html)
    }
    add(html.substr(cursor, html.length - cursor))
    code += 'return r.join("");'
    return new Function(code).apply(options)
}

module.exports.render = render

const listDir = (dir, fileList = []) => {

    let files = fs.readdirSync(dir)

    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = listDir(path.join(dir, file), fileList)
        } else {
            fileList.push(path.join(dir, file))
        }
    })

    return fileList
}

module.exports.renderDir = async function( from, to, data ){
    const files = listDir(from)
    
    if( !fs.existsSync(to) ){
        fs.mkdirSync(to)
    }

    await files.forEach(async (file) => {
        let p1 = file
        let p2 = path.join(to, path.relative(from, file))
        
        if( !fs.existsSync(p2) ){
            fs.mkdirSync(path.dirname(p2), { recursive: true })
        }

        let ext = path.extname(p1)
        if( '.tpl' == ext ){
            let template = fs.readFileSync(p1, 'utf8')
            let rendered = render(template, data)
            let destination = p2.slice(0, -4)
            await fs.writeFileSync(destination, rendered)
            return
        }

        await fs.writeFileSync(p2, fs.readFileSync(p1))
    })
}