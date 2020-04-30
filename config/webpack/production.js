const _ = require('lodash');
const merge = require('webpack-merge');

const sharedConfig = require('./shared');
const pkg = require('../../package.json');

module.exports = merge(sharedConfig, {
    output: {
        filename: 'dist/[name].js',
        library: _.camelCase(pkg.name),
        libraryTarget: 'umd',
    },
});
