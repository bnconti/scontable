import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Asiento, Movimiento } from './asiento/asiento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  asientos: Asiento[];
  private actualizacionAsientos = new Subject<Asiento[]>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerAsientos() {
    this.http.get<Asiento[]>('http://localhost:3000/asientos')
      .subscribe((res) => {
        this.asientos = res;
        this.actualizacionAsientos.next([...this.asientos]);
      });
    return this.asientos;
  };

  traerObservadorAsientos() {
    return this.actualizacionAsientos.asObservable();
  };

  agregarAsiento(idusuario: number, fecha: string, movimientos: Movimiento[]) {
    const asiento: Asiento = { idasiento: this.nuevoId(), nro_asiento: this.nuevoId(), fecha, idusuario, movimientos };
    this.http.post<{ asientoNuevo: Asiento }>('http://localhost:3000/asientos', asiento)
      .subscribe(() => {
        asiento.movimientos.forEach(movimiento => {
          movimiento.nombre = movimiento.cuenta.nombre;
          movimiento.nro_cta = movimiento.cuenta.nro_cta;
          delete movimiento.cuenta;
        });
        this.asientos.push(asiento);
        this.actualizacionAsientos.next([...this.asientos]);
      });
  };

  nuevoId(): number {
    return this.asientos[this.asientos.length - 1].idasiento + 1;
  };
};
