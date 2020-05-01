const _ = require('lodash');
const merge = require('webpack-merge');

const sharedConfig = require('./shared');
const pkg = require('../../package.json');

module.exports = merge(sharedConfig, {
    mode: 'production',
    output: {
        filename: '[name].js',
        library: _.camelCase(pkg.name),
        libraryTarget: 'umd',
    },
    externals: {
        'lodash/debounce': {
            commonjs: 'lodash/debounce',
            commonjs2: 'lodash/debounce',
            amd: 'lodash/debounce',
            root: ['_', 'debounce'],
        },
    },
});
