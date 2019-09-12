module.exports = (sequelize, type) => {
  return sequelize.define('asiento', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: type.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}
