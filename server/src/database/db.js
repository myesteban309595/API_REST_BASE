
const config = require('../config')

const host = config.module.dbHost
const port = config.module.dbPort
const user = config.module.dbUser
const password = config.module.dbPassword
const database = config.module.myBaseApi

console.log("db =>", host);

    const dbOptions = {
        host: config.module.dbHost,
        port: port,
        user: user,
        password: password,
        database: database
    }
    
    module.exports = dbOptions
