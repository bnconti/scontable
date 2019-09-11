const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = (sequelize, type) => {
  return sequelize.define('asiento', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}
