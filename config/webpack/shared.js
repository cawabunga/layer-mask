const pkg = require('../../package.json');

module.exports = {
    target: 'web',
    entry: {
        [pkg.name]: `${__dirname}/../../src/index.ts`,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
