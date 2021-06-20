'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    parkName: DataTypes.STRING,
    city: DataTypes.STRING,
    provinceState: DataTypes.STRING,
    country: DataTypes.STRING,
    opened: DataTypes.DATEONLY,
    size: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Park.associate = function(models) {
    // associations can be defined here
  };
  return Park;
};