'use strict';
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const pkg = require('./package.json');
const libraryName = pkg.name;

module.exports = {
  entry: {
    [libraryName]: `${__dirname}/index.js`
  },
  output: {
    filename: 'dist/[name].js',
    library: _.camelCase(libraryName),
    libraryTarget: 'umd'
  },
  externals: [{
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: 'jQuery',
    },
    underscore: '_',
  }],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ],
  }
};