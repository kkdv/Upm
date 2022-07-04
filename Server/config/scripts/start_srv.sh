#!/bin/bash
# Create a symlink in the home directory ln -s ~/lms/Server/config/scripts/start_srv.sh .

cd Server

#change dir to Server directory
pm2 start server.js

#start NGINX webserver
sudo systemctl start nginx
