import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Cuenta } from 'src/app/cuenta/cuenta.model';

@Injectable({ providedIn: 'root' })
export class CuentaService {

  private cuentas: Cuenta[] = [];
  private actualizacionCuentas = new Subject<Cuenta[]>();

  /* ------------------------- */

  traerCuentas() {
    return [...this.cuentas];
  }

  traerObservadorCuentas() {
    return this.actualizacionCuentas.asObservable();
  }

  agregarCuenta(nombre: string, nro: number, tipo: string, monto: number) {
    const cuenta: Cuenta = {nombre, nro, tipo, monto};
    this.cuentas.push(cuenta);
    this.actualizacionCuentas.next([...this.cuentas]);
  }
}
