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

  movimientos: Movimiento[];
  private actualizacionMovimientos = new Subject<Movimiento[]>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerAsientos() {
    this.http.get<Asiento[]>('http://localhost:3000/asientos').subscribe((res) => {
      this.asientos = res;
      this.actualizacionAsientos.next([...this.asientos]);
    });
    return this.asientos;
  }

  traerMovimientos() {
    this.http.get<Movimiento[]>('http://localhost:3000/movimientos').subscribe((res) => {
      this.movimientos = res;
      this.actualizacionMovimientos.next([...this.movimientos]);
    });
    return this.movimientos;
  }

  traerObservadorAsientos() {
    return this.actualizacionAsientos.asObservable();
  }

  agregarAsiento(idusuario: number = 1, fecha: string, movimientos: []) {
    const request = { idusuario, fecha, movimientos };
    this.http.post<{ mensaje: string }>('http://localhost:3000/asientos', request).subscribe(() => {
      this.asientos.push({ idusuario, fecha });
      this.actualizacionAsientos.next([...this.asientos]);
    });
  }
}
