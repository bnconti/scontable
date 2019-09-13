/*  user: postgres
 *  pass: root      */

CREATE TABLE cuentas (
    idcuentas SERIAL PRIMARY KEY,
    nro INT NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL UNIQUE,
    tipo VARCHAR(45) NOT NULL
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
    nro_asiento INT NOT NULL,
    fecha DATE NOT NULL,
);

CREATE TABLE movimiento (
    idmovimiento INT NOT NULL,
    idasiento INT NOT NULL REFERENCES asiento(idasiento),
    PRIMARY KEY(idmovimiento, idasiento),
    idcuentas INT NOT NULL REFERENCES cuentas(idcuentas),
    monto NUMERIC NOT NULL,
    tipo VARCHAR(45) NOT NULL
);
