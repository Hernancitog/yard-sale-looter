const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Dotenv()
        // new webpack.DefinePlugin({
        //     'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
        // })
    ]
};