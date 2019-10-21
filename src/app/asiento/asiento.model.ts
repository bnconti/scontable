import { Cuenta } from '../cuenta/cuenta.model';

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
    detalle: string;
    cuenta?: Cuenta;
}

export interface MovMayor {
    monto: number;
    tipo_mov: string;
}

export interface CuentaMayor {
    nombre_cta: string;
    nro_cta: number;
    movimientos: MovMayor[];
}
