const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = (sequelize, type) => {
  return sequelize.define('cuenta', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: type.STRING,
      unique: true,
      allowNull: false,
    },
    nro: {
      type: type.INTEGER,
      unique: true,
      allowNull: false,
    },
    tipo: {
      type: type.STRING,
      allowNull: false,
    },
    monto: {
      type: type.REAL,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
}