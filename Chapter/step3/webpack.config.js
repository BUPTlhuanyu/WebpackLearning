debugger
module.exports = {
    mode: 'development',
    entry: {
        boundle: __dirname + '/main.js'
    },
    output: {
        filename: 'boundle.js',
        path: __dirname + '/dist'
    }
}