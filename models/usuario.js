module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
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
    password: {
      type: type.STRING,
      allowNull: false,
    },
    es_admin: {
      type: type.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}
