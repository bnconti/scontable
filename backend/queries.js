const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'scontable',
    password: 'root',
    port: 5432,
})

const getCuentas = (request, response) => {
    pool.query('SELECT * FROM cuentas', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCuentaById = (req, res) => {
    const idcuentas = parseInt(req.params.idcuentas)

    pool.query('SELECT * FROM users WHERE idcuentas = $1', [idcuentas], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const createCuenta = (request, response) => {

    const query = 'INSERT INTO cuentas (nro, nombre, tipo) VALUES ($1, $2, $3)';
    const { nro, nombre, tipo } = request.body;

    // Buscar cuentas con igual nombre antes de agregar.
    pool.query(query, [nro, nombre, tipo], error => {
        if (error) {
            console.log(error.stack);
        }
        response.status(201).json({status: 'success', message: 'Cuenta agregada'});
    })
}

module.exports = { getCuentas, getCuentaById, createCuenta };
