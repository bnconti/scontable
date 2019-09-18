export interface Asiento {
    idasiento?: number;
    idusuario?: number;
    fecha: string;
    nro_asiento?: number;
    movimientos?: Movimiento[];
}

export interface Movimiento {
    nro_cta: number;
    nombre: string;
    monto: number;
    tipo_mov: string;
}
