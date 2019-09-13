const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./queries');

app.use(bodyParser.json());

// Desactiva CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

app.get('/cuentas', db.getCuentas);
app.get('/cuentas/:id', db.getCuentaById);
app.post('/cuentas', db.createCuenta);

module.exports = app;