"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctor_infors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      doctorId: {
        type: Sequelize.INTEGER
      },
      priceId: {
        type: Sequelize.STRING
      },
      provinceId: {
        type: Sequelize.STRING
      },
      addressClinic: {
        type: Sequelize.STRING
      },
      nameClinic: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      count: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctor_infors")
  }
}
