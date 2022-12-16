module.exports = {
    entry: './src/app/index.js',
    output: {
        path:__dirname + '/src/public',   // al convertir a js guardar en public
        filename : 'bundle.js'
    }
}