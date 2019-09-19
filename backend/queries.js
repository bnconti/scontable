const { Pool } = require('pg')

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

const crearCuenta = (request, response) => {
    const query = 'INSERT INTO cuenta (nro_cta, nombre, tipo_cta) VALUES ($1, $2, $3)';
    const { nro_cta, nombre, tipo_cta } = request.body;

    // TODO: Buscar cuentas con igual nombre antes de agregar.
    pool.query(query, [nro_cta, nombre, tipo_cta], error => {
        if (error) throw error;
        response.status(201).json({ status: 'success', message: 'Cuenta agregada' });
    });
};


const getAsientos = (request, response) => {
    const query = 
    `SELECT a.nro_asiento, to_json(a.fecha) AS fecha,
        (SELECT json_agg(json_build_object('monto', m.monto, 
        'tipo_mov', m.tipo_mov, 'nombre', c.nombre, 'nro_cta', c.nro_cta))
        FROM movimiento AS m
        INNER JOIN cuenta AS c on m.idcuenta = c.idcuenta
        WHERE m.idasiento = a.idasiento ) AS movimientos
    FROM asiento AS a;`;

    pool.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200).json(results.rows);
        }
    })
}

const crearAsiento = (request, response) => {
    const queryAsiento = 'INSERT INTO asiento (idusuario, fecha) VALUES ($1, $2) RETURNING idasiento';
    const queryMov = 'INSERT INTO movimiento (idasiento, idcuenta, monto, tipo_mov) VALUES ($1, $2, $3, $4)';
    const { idusuario, fecha, movimientos } = request.body;

    pool.query(queryAsiento, [idusuario, fecha], (err, result) => {
        if (err) throw err;
        else {
            const idasiento = result.rows[0].idasiento;
            movimientos.forEach(movimiento => {
                pool.query('SELECT idcuenta FROM cuenta WHERE nro_cta = $1', [movimiento.nro_cta], (err, result) => {
                    if (err) throw err;
                    else {
                        const idcuenta = result.rows[0].idcuenta;
                        pool.query(queryMov, [idasiento, idcuenta, movimiento.monto, movimiento.tipo], err => {
                            if (err) throw err;
                        })
                    }
                })
            });
            response.status(201).json({ status: 'success', message: 'Asiento agregado' });
        }
    });
};


module.exports = { getCuentas, crearCuenta, getAsientos, crearAsiento };
