import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  cuentas: Cuenta[];
  private actualizacionCuentas = new Subject<Cuenta[]>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerCuentas() {
    this.http.get<Cuenta[]>('http://localhost:3000/cuentas')
      .subscribe((res) => {
        this.cuentas = res;
        this.actualizacionCuentas.next([...this.cuentas]);
      });
    return this.cuentas;
  }

  traerObservadorCuentas() {
    return this.actualizacionCuentas.asObservable();
  }

  agregarCuenta(nro: number, nombre: string, tipo: string) {
    const cuenta: Cuenta = { nro_cta: nro, nombre, tipo_cta: tipo };
    this.http.post<{ mensaje: string }>('http://localhost:3000/cuentas', cuenta)
      .subscribe((respuesta) => {
        this.cuentas.push(cuenta);
        this.actualizacionCuentas.next([...this.cuentas]);
      });
  }
}
