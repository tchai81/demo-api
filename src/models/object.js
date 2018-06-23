import Sequelize from 'sequelize'
import sequelize from '../services/sequelize'

const _object = sequelize.define('objects', {
    key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export default _object