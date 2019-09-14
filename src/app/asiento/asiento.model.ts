export interface Asiento {
    idasiento?: number;
    idusuario: number;
    fecha: string;
    nro_asiento: number;
    movimientos?: Movimiento[];
}

export interface Movimiento {
    idasiento: number;
    idmovimiento?: number;
    idcuenta: number;
    monto: number;
    tipo_mov: string;
}
