const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./queries');

app.use(bodyParser.json());

// Desactiva CORS y otras yerbas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

app.get('/cuentas', db.getCuentas);
app.post('/cuentas', db.crearCuenta);

app.get('/asientos', db.getAsientos);
app.post('/asientos', db.crearAsiento);

app.get('/movimientos', db.getMovimientosPorCuenta);

module.exports = app;