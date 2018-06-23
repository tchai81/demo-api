import Sequelize from 'sequelize'
import sequelize from '../services/sequelize'

const version = sequelize.define('versions', {
    value: Sequelize.STRING
})

export default version