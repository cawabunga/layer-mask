const _ = require('lodash');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const sharedConfig = require('./shared');
const pkg = require('../../package.json');

module.exports = merge(sharedConfig, {
    mode: 'development',
    output: {
        filename: 'serve/[name].js',
        library: _.camelCase(pkg.name),
        libraryTarget: 'umd',
    },
    plugins: [new BundleAnalyzerPlugin()],
});
