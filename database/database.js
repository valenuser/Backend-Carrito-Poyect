const mysql = require('mysql2')

const env = require('dotenv')

const pool =  mysql.createPool({
    host:env.config().parsed.host,
    user:env.config().parsed.user,
    password:env.config().parsed.password,
    database:env.config().parsed.database,
})


module.exports = pool