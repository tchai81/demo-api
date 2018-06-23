'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('versions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            objectId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'objects',
                    key: 'id'
                }
            },
            value: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('versions')
    }
}