var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './public/vue/index.js',
    output: {
        path: __dirname,
        publicPath: '/vue/',
        filename: 'dist.js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                  loader: "babel-loader"
                }]
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};