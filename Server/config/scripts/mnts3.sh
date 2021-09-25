sudo apt install s3fs
echo AWS_ACCESS_KEY:AWS_SECRET_KEY >~/.passwd-s3fs
sudo s3fs lmssk-useast2:/ /home/ubuntu/s3 -o use_rrs -o allow_other -o use_cache=/tmp -o passwd_file=$HOME/.passwd-s3fs