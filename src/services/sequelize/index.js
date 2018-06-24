import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    database: process.env.SQL_DATABASE,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    timezone: process.env.SQL_TIMEZONE,
    port: process.env.SQL_PORT
})

export default sequelize