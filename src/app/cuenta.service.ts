import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CuentaService {

  private cuentas: Cuenta[] = [];
  private actualizacionCuentas = new Subject<Cuenta[]>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerCuentas() {
    this.http.get<{ mensaje: string, cuentas: Cuenta[] }>('http://localhost:3000/api/cuentas')
      .subscribe((data) => {
        this.cuentas = data.cuentas;
        this.actualizacionCuentas.next([...this.cuentas]);
      });
    return [...this.cuentas];
  }

  traerObservadorCuentas() {
    return this.actualizacionCuentas.asObservable();
  }

  agregarCuenta(id: null, nombre: string, nro: number, tipo: string, monto: number) {
    const cuenta: Cuenta = { id, nombre, nro, tipo, monto };
    this.http.post<{ mensaje: string }>('http://localhost:3000/api/cuentas', cuenta)
      .subscribe((respuesta) => {
        console.log(respuesta.mensaje);
        this.cuentas.push(cuenta);
        this.actualizacionCuentas.next([...this.cuentas]);
      });
  }
}
