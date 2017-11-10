const pkg = require('../../package.json');

module.exports = {
    entry: {
        [pkg.name]: `${__dirname}/../../index.js`
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015'
        }],
    }
};