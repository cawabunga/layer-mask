const pkg = require('../../package.json');

module.exports = {
    entry: {
        [pkg.name]: `${__dirname}/../../src/index.js`,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
