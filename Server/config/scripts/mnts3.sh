#!/bin/bash

# Install S3FS to mount an S3 folder in an EC2 VM under $HOME/s3
sudo apt install s3fs

#Store AWS credentials in .passwd-s3fs file 
echo AWS_ACCESS_KEY:AWS_SECRET_KEY >~/.passwd-s3fs

# mount S3 folder under $HOME/s3
sudo s3fs lmssk-useast2:/ /home/ubuntu/s3 -o use_rrs -o allow_other -o use_cache=/tmp -o passwd_file=$HOME/.passwd-s3fs