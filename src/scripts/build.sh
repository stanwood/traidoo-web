#!/bin/bash

sed -i -e "s/__PAGE_TITLE__/$REACT_APP_CLIENT_NAME/g" public/index.html
sed -i -e "s/__PAGE_DESCRIPTION__/$REACT_APP_CLIENT_NAME/g" public/index.html
wget $FAVICON_URL -O public/favicon.png
node src/scripts/generate_favicons.js
sed -i -e "s|__FAVICONS__|$(tr -d '\n' < public/favicons.html)|g" public/index.html
npm run build
