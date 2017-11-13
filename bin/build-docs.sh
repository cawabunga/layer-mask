#!/usr/bin/env bash

npm run build
rm -rf docs/lib/*
cp src/mask.css docs/lib/mask.css
cp dist/layer-mask.js docs/lib/layer-mask.js