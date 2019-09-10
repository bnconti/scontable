export class Cuenta {
    private nombre: string;
    private tipo: string;
    private monto: number;

    constructor(nombre: string, tipo: string, monto: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.monto = monto;
    }
}