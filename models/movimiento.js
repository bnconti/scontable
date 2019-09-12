module.exports = (sequelize, type) => {
  return sequelize.define('movimiento', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    /*
    id_asiento: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: asiento,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    id_cuenta: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: cuenta,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    */
    comentario: {
      type: type.TEXT,
      allowNull: false,
    },
    tipo: {
      type: type.TEXT,
      allowNull: false,
    },
    monto: {
      type: type.REAL,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}