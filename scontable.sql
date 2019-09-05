/*  user: postgres
 *  pass: root      */

CREATE TABLE cuenta (
    idcuenta SERIAL PRIMARY KEY,
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
    idcuenta INT NOT NULL REFERENCES cuenta(idcuenta),
    idusuario INT NOT NULL REFERENCES usuario(idusuario),
    tipo VARCHAR(45) NOT NULL CHECK (tipo IN('Debe', 'Haber')),
    monto NUMERIC NOT NULL,
    fecha_transaccion DATE NOT NULL
);