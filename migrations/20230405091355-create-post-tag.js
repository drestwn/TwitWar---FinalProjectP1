'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('PostTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      TagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('PostTags');
  }
};