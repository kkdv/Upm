# Healthcare Learning Management System Prototype

## Development components :

- React.js
- Node.js
- Express.js
- Mongodb
- Passport.js
- mongoose
- JWT

# Deployment components

- PM2
- Let's Encrypt
- NGINX
- AWS EC2 +IAM
- AWS S3
- AWS CodePipeline and CodeBuild

## Install package

```
npm install
```

## if you prefer to use the Mongo Atlas Cloud by providing the following in file ./Server/config/.env

## Sign up for a free Cloud Account, create a Collection (DB Name) and use Mongo Compass tool to upload data

```
DB_DRIVER="mongodb+srv"
DB_HOST="cluster_host_name"
DB_NAME="DB_Name"
DB_KEY="secret key"
DB_USER_PWD="userid:token"
```

## OR install and use MongoDB locally

```
brew update

brew tap mongodb/brew

brew install mongodb-community

mongod --config /usr/local/etc/mongod.conf --fork
```

## for starting backend Server:

```
# Start MongoDB

brew services start mongodb

#Start backend Express server
cd Server
npm start
```

## for starting Frontend UI:

```
cd Frontend

npm start
```

# Hosting on an AWS EC2 for production

```
1. FrontEnd: Static HTML/JS files are stored on an S3 bucket with IAM permissions restricted to the EC2 VM and AWS CodeBuild
2. AWS CodePipeline integrated with GitHub  --> AWS CodeBuild (buildspec.yml) --> S3
3. Server: code in $HOME/lms/Server
4. User --> NGINX --> Static HTML/ReactJS in S3 ---> Node.js Server.js (local) --> MongoDB (local on port 27017)
5. SSL certificate using Let's Encrypt  {https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal}

```

# Production deployment steps (Server and FrontEnd)

Provision a EC2 (t3.micro) Ubuntu VM with default EBS root drive

#Install NGINX

```
sudo apt update
sudo apt install nginx -y
cd /var/www                  ## Setup a symlink to frontend code repo
ln -s /home/ubuntu/s3  lms   ## lms -> /home/ubuntu/s3
```

# Start NGINX and enable it to run at boot

```
sudo systemctl start nginx
sudo systemctl enable nginx

```

# Provision a DNS domain using namecheap.com

```
A Record @ ---->IP address of EC2 VM
CNAME <dns_name> ---> public hostname of EC2 VM
CNAME www ----> public hostname of EC2 VM    (to redirect www.dns_name)
```

# Provision an SSL certificate using Lets Encrypt and configure NGINX

https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

# Install PM2 (process monitor for Node.js applications)

```
sudo npm install pm2 -g
pm2 start server.js
```

# CI/CD Setup by setting up a code pipeline

```
1. Create an S3 bucket (called lmssk) using AWS console
2. Setup AWS CodePipeline { source : integrate with GitHub ; build destination is the S3 bucket; refer to buildspec.yml }
3. Setup AWS CodeBuild
cd Frontend && npm run build-prod   ## Source is in a container, app is in 2 folders (FrontEnd and Server)
build-prod  : build it with .env.production dotenv configuration

```
