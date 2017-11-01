const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: './', // relative to the configuration file

        browsers: ['Chrome'],
        frameworks: ['jasmine'],

        files: [
            { pattern: 'test/**/*.test.js', watched: false },
            // each file act as entry point for the webpack configuration
        ],

        preprocessors: {
            'test/**/*.test.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only',
            noInfo: true,
        }
    });
};