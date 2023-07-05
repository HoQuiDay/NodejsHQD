"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class smarkdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  smarkdown.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyid: DataTypes.INTEGER,
      contentHTML: DataTypes.STRING,
      contentMarkdown: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "smarkdown"
    }
  )
  return smarkdown
}
