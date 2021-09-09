const env_file = process.env.NODE_ENV ? ".env" + process.env.NODE_ENV :
    ".env.development"

require('dotenv').config({
    path: __dirname + `/../../${env_file}`
});

mURL =
    process.env.DB_DRIVER + "://" +
    process.env.DB_USER_PWD + "@" +
    process.env.DB_HOST + "/" +
    process.env.DB_NAME +
    "?authSource=admin&retryWrites=true&w=majority";

console.log("Using environment config file:" + __dirname +
    `/../../${env_file}`);

console.log("Connecting to " + process.env.DB_HOST + "@" + process.env.DB_NAME +
    " database")
module.exports = {
    mongoURL: mURL,
    secretKey: process.env.DB_KEY,
};
