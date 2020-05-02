#!/usr/bin/env bash

rm -rf dist
mkdir dist
cp src/*.css dist
NODE_ENV=production ./node_modules/.bin/webpack
yarn run build:types