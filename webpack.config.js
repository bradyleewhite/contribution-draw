
var path = require('path');

module.exports = {
    entry: './app/components/Main.jsx',
    output: {
        filename: 'build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    }
};