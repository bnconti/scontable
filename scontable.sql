/*  user: postgres
 *  pass: root      */

CREATE TABLE cuenta (
    idcuenta SERIAL PRIMARY KEY,
    nro INT NOT NULL,
    nombre VARCHAR(45) NOT NULL UNIQUE,
    tipo VARCHAR(45) NOT NULL CHECK (tipo IN('Activo', 'Pasivo'))
);

CREATE TABLE usuario (
    idusuario SERIAL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    es_admin BOOLEAN NOT NULL
);

CREATE TABLE asiento (
    idasiento SERIAL PRIMARY KEY,
    idusuario INT NOT NULL REFERENCES usuario(idusuario),    
    fecha DATE NOT NULL,
    detalle VARCHAR NULL
);

CREATE TABLE movimiento (
    idmovimiento INT NOT NULL,
    idasiento INT NOT NULL REFERENCES asiento(idasiento),
    PRIMARY KEY(idmovimiento, idasiento),
    idcuenta INT NOT NULL REFERENCES cuenta(idcuenta),
    monto NUMERIC NOT NULL,
    tipo VARCHAR(45) NOT NULL CHECK (tipo IN('Debe', 'Haber'))
);
