import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Asiento, Movimiento, CuentaMayor } from './asiento/asiento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  asientos: Asiento[];
  private actualizacionAsientos = new Subject<Asiento[]>();

  movimientos: CuentaMayor[];
  private actualizacionMovimientos = new Subject<CuentaMayor[]>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerAsientos() {
    this.http.get<Asiento[]>('http://localhost:3000/asientos')
      .subscribe((res) => {
        this.asientos = res;
        this.actualizacionAsientos.next([...this.asientos]);
        console.log(this.asientos);
      });
    return this.asientos;
  }

  traerObservadorAsientos() {
    return this.actualizacionAsientos.asObservable();
  }

  traerMovimientos() {
    this.http.get<CuentaMayor[]>('http://localhost:3000/movimientos')
      .subscribe((res) => {
        this.movimientos = res;
        this.actualizacionMovimientos.next([...this.movimientos]);
      });
    return this.movimientos;
  }

  traerObservadorMovimientos() {
    return this.actualizacionMovimientos;
  }

  agregarAsiento(idusuario: number, fecha: string, movimientos: Movimiento[]) {
    const asiento: Asiento = { idasiento: this.nuevoId(), nro_asiento: this.nuevoId(), fecha, idusuario, movimientos };
    this.http.post<{ asientoNuevo: Asiento }>('http://localhost:3000/asientos', asiento)
      .subscribe(() => {
        asiento.movimientos.forEach(movimiento => {
          console.log(movimiento);
          movimiento.nombre = movimiento.cuenta.nombre;
          movimiento.nro_cta = movimiento.cuenta.nro_cta;
          // movimiento.detalle = movimiento.cuenta.detalle;
          delete movimiento.cuenta;
        });
        this.asientos.push(asiento);
        // TODO: this.movimientos.push(movimientos);
        this.actualizacionAsientos.next([...this.asientos]);
      });
  }

  nuevoId(): number {
    console.log(this.asientos, this.asientos.length);

    return this.asientos[this.asientos.length - 1].idasiento + 1;
  }
}
