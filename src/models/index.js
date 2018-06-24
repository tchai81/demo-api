'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var db = {}

var sequelize = new Sequelize({
    database: process.env.SQL_DATABASE,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    timezone: process.env.SQL_TIMEZONE,
    port: process.env.SQL_PORT
})

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db