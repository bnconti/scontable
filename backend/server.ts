const express = require('express');
const bodyParser = require('body-parser');

const { AsientoSeq, CuentaSeq, MovimientoSeq, UsuarioSeq } = require('sequelize');

const hostname = 'localhost';
const port = 3000;
const server = express();
server.use(bodyParser.json());

server.get('/api/', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server OK');
});

server.listen(port, hostname, () => {
  console.log(`Server ejecutándose en http://${hostname}:${port}/`);
});

server.post('/api/cuenta', (req, res) => {
  console.log('/api/cuenta');
  CuentaSeq.create(req.body)
    .then(cuenta => res.json(cuenta))
})

server.get('/api/cuenta', (req, res) => {
  console.log('/api/cuenta');
  Cuenta.findAll().then(cuentas => res.json(cuentas))
})