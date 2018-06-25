var path = require('path')
var dotenv = require('dotenv-safe')
dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
})

module.exports = {
    production: {
        username: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        dialect: 'mysql'
    }
}