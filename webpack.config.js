const { env } = require('process');
const configName = env.NODE_ENV || 'development';

const configurations = {
    development: require('./config/webpack/development'),
    production: require('./config/webpack/production'),
    test: require('./config/webpack/test'),
};

module.exports = configurations[configName];