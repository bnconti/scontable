const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'scontable',
    password: 'root',
    port: 5432,
});

const getCuentas = (request, response) => {
    pool.query('SELECT * FROM cuenta', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows)
    });
};

const getCuentaById = (req, res) => {
    const idcuenta = parseInt(req.params.id);

    // Tirar error cuando el ID no existe.
    pool.query('SELECT * FROM cuenta WHERE idcuenta = $1', [idcuenta], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const crearCuenta = (request, response) => {
    const query = 'INSERT INTO cuenta (nro_cta, nombre, tipo_cta) VALUES ($1, $2, $3)';
    const { nro_cta, nombre, tipo_cta } = request.body;

    console.log(request.body);
    console.log(nro_cta, nombre, tipo_cta);
    
    // Buscar cuentas con igual nombre antes de agregar.
    pool.query(query, [nro_cta, nombre, tipo_cta], error => {
        if (error) throw error;
        response.status(201).json({ status: 'success', message: 'Cuenta agregada' });
    });
};

const getAsientos = (request, response) => {
    pool.query('SELECT * FROM asiento', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const getMovimientos = (request, response) => {
    pool.query('SELECT * FROM movimiento', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const crearAsiento = (request, response) => {
    const query = 'INSERT INTO asiento (idusuario, fecha) VALUES ($1, $2)';
    const { idusuario, fecha } = request.body;

    console.log(request.body);
    console.log(idusuario, fecha);

    // Recordar cambiar el 1 del usuario por el ID verdadero!
    pool.query(query, [idusuario, fecha], error => {
        if (error) throw error;
        response.status(201).json({ status: 'success', message: 'Asiento agregado' });
    });
};

const crearMovimiento = (request, response) => {
    const query = 'INSERT INTO movimiento (idasiento, idcuenta, monto, tipo_mov) VALUES ($1, $2, $3, $4)';
    const { idasiento, idcuenta, monto, tipo_mov } = request.body;

    pool.query(query, [idasiento, idcuenta, monto, tipo_mov], error => {
        if (error) throw error;
        response.status(201).json({ status: 'success', message: 'Movimiento agregado' });
    });
};

module.exports = {
    getCuentas, getCuentaById, crearCuenta,
    getAsientos, crearAsiento,
    getMovimientos, crearMovimiento,
};
