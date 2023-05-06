'use strict';
const fs=require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data=JSON.parse(fs.readFileSync('./data/dummy.JSON','UTF-8')).map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Posts',data)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts',null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
