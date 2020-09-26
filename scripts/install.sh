#!/bin/bash

rm -rf /var/www/app.volateq.de/*
cp -rf /home/ubuntu/volateq-web-app/dist/* /var/www/app.volateq.de

chown -R ubuntu:ubuntu /home/ubuntu/volateq-web-app
chown -R www-data:www-data /var/www/app.volateq.de
