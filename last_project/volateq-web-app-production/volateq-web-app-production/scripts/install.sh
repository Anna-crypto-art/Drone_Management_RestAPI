#!/bin/bash

rm -rf /var/www/app.volateq.de/*
cp -rf /home/vqonaws/volateq-web-app/dist/* /var/www/app.volateq.de

chown -R vqonaws:vqonaws /home/vqonaws/volateq-web-app
chown -R www-data:www-data /var/www/app.volateq.de
