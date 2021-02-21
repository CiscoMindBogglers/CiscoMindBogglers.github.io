#!/bin/bash
set -e

echo "🚀 Starting deployment action"


REMOTE_REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git clone $REMOTE_REPO repo
cd repo

echo "⚡️ Installing project dependencies..."
npm install

echo "🏋️ Building website..."
npm run-script prod-build
echo "npm build done"

cd dist/webexteamsapp

echo "☁️ Publishing website"


rm -f README.md

git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .
git commit -m "Github Actions - $(date)"
echo "Build branch ready to go. Pushing to Github..."

git push --force $REMOTE_REPO master:gh-pages

rm -fr .git
cd ..
rm -rf repo
echo "🎉 New version deployed 🎊"