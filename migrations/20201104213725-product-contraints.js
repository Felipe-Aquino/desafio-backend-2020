'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Products', {
      fields: ['restaurant_id', 'name'],
      type: 'unique',
      name: 'product_constraint1'
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Products', 'product_constraint1');
  }
};
