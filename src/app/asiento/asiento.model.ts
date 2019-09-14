export interface Asiento {
    fecha: string;
    nro_asiento: number;
    movimientos: Movimiento[];
}

export interface Movimiento {
    idcuenta: number;
    monto: number;
    tipo: string;
}