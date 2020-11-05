'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'ID que representa aquele restaurante no banco de dados'
      },
      email: {
        type: Sequelize.STRING,
        comment: 'Email do restaurante',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        comment: 'Nome do restaurante',
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        comment: 'String que guarda o endereço do restaurante',
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        comment: 'Número de telefone caso o cliente queira entrar em contato com o restaurante',
        allowNull: false,
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
    await queryInterface.dropTable('Restaurants');
  }
};
