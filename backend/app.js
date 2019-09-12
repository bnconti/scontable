const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Desactiva CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

app.get("/api/cuentas/", (req, res) => {
    const cuentas = [
        {
            id: "1",
            nombre: "Caja chica",
            nro: 8001,
            tipo: "Activo",
            monto: 4500  
        },
        {
            id: "2",
            nombre: "Proveedores",
            nro: 8015,
            tipo: "Pasivo",
            monto: 200000  
        },
    ];
    res.status(200).json({
        mensaje: "Desde acá se accede a las cuentas",
        cuentas: cuentas
    })
})

app.post("/api/cuentas", (req, res, next) => {
    const cuenta = req.body;
    console.log(cuenta);
    res.status(201).json({
        mensaje: 'Cuenta agregada exitosamente'
    });
})

module.exports = app;