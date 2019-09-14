import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Asiento, Movimiento } from './asiento/asiento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private asientos: Asiento[];
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
  }

  traerObservadorAsientos() {
    return this.actualizacionAsientos.asObservable();
  }

  agregarAsiento(idusuario: number, fecha: string, movimientos: Movimiento[]) {
    // Creo el asiento y llamo tantas veces 
    // como sea necesario a agregarMovimiento

  }

  agregarMovimiento(idasiento: number, idcuenta: number, monto: number, tipo_mov: string) {
    const movimiento: Movimiento = { idasiento, idcuenta, monto, tipo_mov };
    this.http.post('http://localhost:3000/movimientos', movimiento);
  }
}
