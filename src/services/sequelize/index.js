import Sequelize from 'Sequelize'

const sequelize = new Sequelize({
    database: 'demo-api',
    username: 'homestead',
    password: 'secret',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: 'utc',
    port: '33060'
})

export default sequelize