require('dotenv').config({
    path: './config/.env'
});

mURL =
    process.env.DB_DRIVER + "://" +
    process.env.DB_USER_PWD + "@" +
    process.env.DB_HOST + "/" +
    process.env.DB_NAME +
    "?authSource=admin&retryWrites=true&w=majority";

console.log("Connecting to " + process.env.DB_HOST + "@" + process.env.DB_NAME +
    " database")
module.exports = {
    mongoURL: mURL,
    secretKey: process.env.DB_KEY,
};
