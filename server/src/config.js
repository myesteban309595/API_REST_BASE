const {config} = require('dotenv');
config();

exports.module = {

    PORT: process.env.PORT,
    dbHost: process.env.dbHost,
    dbPort: process.env.dbPort,
    dbUser: process.env.dbUser,
    dbPassword: process.env.dbPassword,
    myBaseApi : process.env.myBaseApi,

}