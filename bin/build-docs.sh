#!/usr/bin/env bash

npm run build
rm -rf docs/lib/*
cp -r dist/* docs/lib