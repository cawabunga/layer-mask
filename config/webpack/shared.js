const pkg = require('../../package.json');

module.exports = {
    entry: {
        [pkg.name]: `${__dirname}/../../src/index.ts`,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
};
