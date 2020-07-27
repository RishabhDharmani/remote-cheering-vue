#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git config --global user.email "rishabhdharmani08@gmail.com"
git config --global user.name "RishabhDharmani"
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:RishabhDharmani/remote-cheering-vue.git master:gh-pages

cd -