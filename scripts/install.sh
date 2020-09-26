#!/bin/bash

cd /home/ubuntu/volateq-web-app

rm -rf ./node_modules
npm ci

rm -f ./.env
cp ./.env.procuction ./.env

rm -rf ./dist
npm run build

chown -R ubuntu:ubuntu /home/ubuntu/volateq-web-app

cd -