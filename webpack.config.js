
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

var pathToSassLoader = path.resolve(__dirname, '../../index.js');


function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}


module.exports = {
    entry: {
        index: getEntrySources([
            './src/index.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/[name].js'
    },
    watch: true,
    module: {



        loaders: [
            { 
                test: /\.js$/, 
                loaders: ['react-hot', 'jsx', 'babel'], 
                exclude: /node_modules/ 
            },
            {
                test   : /\.css$/,
                loaders: ['style', 'css', 'resolve-url']
            }, {
                test   : /\.scss$/,
                // loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
                loaders: ['style', 'css', 'resolve-url', 'sass?outputStyle=expanded&' +
                    'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, "./sass"))
                ]
            }
        ]
        // loaders: [
        //     { 
        //         test: /\.js$/, 
        //         loaders: ['react-hot', 'jsx', 'babel'], 
        //         exclude: /node_modules/ 
        //     },
        //     { 
        //         test: /\.scss$/, 
        //         loader: ExtractTextPlugin.extract('css!sass')
        //     }
        // ]
    }//,
    // plugins: [
    //     new ExtractTextPlugin('public/style.css', {
    //         allChunks: true
    //     })
    // ]
};