'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        id: 'ID que representa aquele produto no banco de dados'
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        comment: 'ID do restaurante ao qual aquele produto pertence. Deve fazer relação à tabela de restaurantes'
      },
      name: {
        type: Sequelize.STRING,
        comment: 'Nome do produto',
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        comment: 'Descrição do produto'
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: 'Preço do produto'
      },
      complements: {
        type: Sequelize.STRING,
        comment: 'String que descreve os complementos daquele produto'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
