'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Parks', [
      {
        parkName: 'testparkname',
        city: 'testcity',
        provinceState: 'testprovince',
        country: 'testcountry',
        opened: new Date(),
        size: 'testsize',
        description: 'testdescription',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Parks', null, {});

  }
};


