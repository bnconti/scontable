const Sequelize = require('sequelize');
const UsuarioModel = require('../models/usuario');
const CuentaModel = require('../models/cuenta');
const AsientoModel = require('../models/asiento');
const MovimientoModel = require('../models/movimiento');

const seq = new Sequelize('scontable', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

const Usuario = UsuarioModel(seq, Sequelize);
const Cuenta = CuentaModel(seq, Sequelize);
const Asiento = AsientoModel(seq, Sequelize);
const Movimiento = MovimientoModel(seq, Sequelize);

Cuenta.hasMany(Movimiento);
Asiento.hasMany(Movimiento);
Usuario.hasMany(Asiento);

// Sincroniza las tablas de la BD con los modelos
seq.sync({ force: true })
    .then(() => {
        console.log(`Sync!`)
    });

// Correr 'node database.ts' para ejecutar lo de abajo
// y verificar si funca la conexión con la BD
seq.authenticate().then(() => {
    console.log("Conexión con la BD establecida.");
}).catch((err) => {
    console.log(err);
})
