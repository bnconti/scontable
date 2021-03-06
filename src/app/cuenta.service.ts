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
    const cuenta: Cuenta = { idcuenta: this.nuevoId(), nro_cta: nro, nombre, tipo_cta: tipo };
    this.http.post<{ mensaje: string }>('http://localhost:3000/cuentas', cuenta)
      .subscribe(() => {
        this.cuentas.push(cuenta);
        this.actualizacionCuentas.next([...this.cuentas]);
      });
  }

  nuevoId(): number {
    return this.cuentas[this.cuentas.length - 1].idcuenta + 1;
  }

  valorEnUso(valor: string, prop: string) {
    // Verifica si alguna 'prop' de las cuentas (p. ej. 'nombre') contiene a 'valor'.
    if (this.cuentas !== undefined) {
      const valores = this.cuentas.map(cuenta => cuenta[prop]);
      if (valores.includes(valor)) {
        return true;
      }
      return false;
    }
  }
}
