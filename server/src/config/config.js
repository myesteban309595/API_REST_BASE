const {config} = require('dotenv');
config();

exports.module = {
    PORT: process.env.PORT,
    DB_CREDENTIALS_USER: process.env.DB_CREDENTIALS_USER,
    DB_CREDENTIALS_PASSWORD: process.env.DB_CREDENTIALS_PASSWORD,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,

}