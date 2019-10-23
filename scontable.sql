CREATE TABLE cuenta (
    idcuenta SERIAL PRIMARY KEY,
    nro_cta INT NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL UNIQUE,
    tipo_cta VARCHAR(45) NOT NULL
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
    nro_asiento SERIAL NOT NULL UNIQUE,
    fecha DATE NOT NULL
);

CREATE TABLE movimiento (
    idasiento INT REFERENCES asiento(idasiento),
    idmovimiento SERIAL,
    PRIMARY KEY(idmovimiento, idasiento),
    idcuenta INT NOT NULL REFERENCES cuenta(idcuenta),
    monto NUMERIC NOT NULL,
    tipo_mov VARCHAR(45) NOT NULL,
	detalle VARCHAR NULL
);

INSERT INTO usuario(
	nombre, password, es_admin)
	VALUES ('bnconti', 'contra', true);

INSERT INTO cuenta(
	nro_cta, nombre, tipo_cta)
	VALUES (1001, 'Caja chica', 'Activo');

INSERT INTO cuenta(
	nro_cta, nombre, tipo_cta)
	VALUES (2002, 'Gastos administrativos', 'Pasivo');

INSERT INTO cuenta(
	nro_cta, nombre, tipo_cta)
	VALUES (1002, 'Banco Nación', 'Activo');

INSERT INTO cuenta(
	nro_cta, nombre, tipo_cta)  
	VALUES (2003, 'Deudores', 'Activo');

INSERT INTO asiento(
	idusuario, fecha)
	VALUES (1, '11-09-2019');

INSERT INTO asiento(
	idusuario, fecha)
	VALUES (1, '14-09-2019');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (1, 1, 2300, 'Debe', 'Test mov. debe Caja Chica');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (1, 2, 1000, 'Haber', 'Test mov. haber Gastos Administrativos');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (1, 3, 1300, 'Haber', 'Test mov. haber Banco Nación');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (2, 1, 2000, 'Haber', 'Test mov. haber Caja Chica');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (2, 2, 1200, 'Haber', 'Test mov. haber Gastos Administrativos');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (2, 3, 1200, 'Debe', 'Test mov. debe Banco Nación');

INSERT INTO movimiento(
	idasiento, idcuenta, monto, tipo_mov, detalle)
	VALUES (2, 4, 2000, 'Debe', 'Test mov. debe Deudores');