const webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: './', // relative to the configuration file

        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],

        files: [
            { pattern: 'test/**/*.test.js', watched: false },
            { pattern: 'src/*.css', watched: false },
            // each file act as entry point for the webpack configuration
        ],

        preprocessors: {
            'test/**/*.test.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only',
            noInfo: true,
        },

        coverageReporter: {
            dir:'tmp/coverage/',
            reporters: [
                { type:'html', subdir: 'report-html' },
                { type:'lcov', subdir: 'report-lcov' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact:true }
            }
        },
    });
};