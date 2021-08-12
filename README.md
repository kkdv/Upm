# Healthcare Learning Management System Prototype

## Components used:

- React.js
- Node.js
- Express.js
- Mongodb
- Passport.js
- mongoose
- JWT

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

## OR install and use MongDB locally

```
brew update

brew tap mongodb/brew

brew install mongodb-community

mongod --config /usr/local/etc/mongod.conf --fork
```

## for starting backend Server:

```
cd Server

npm start
```

## for starting Frontend UI:

```
cd Frontend

npm start
```
