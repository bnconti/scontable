import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Asiento, Movimiento } from './asiento/asiento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  asientos: Asiento[];
  private actualizacionAsientos = new Subject<void>();

  /* ------------------------- */

  constructor(private http: HttpClient) { }

  traerAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>('http://localhost:3000/asientos');
  }

  traerObservadorAsientos() {
    return this.actualizacionAsientos.asObservable();
  }

  agregarAsiento(idusuario: number, fecha: string, movimientos: Movimiento[]) {
    const asiento: Asiento = { idusuario, fecha, movimientos };
    this.http.post<{ message: string }>('http://localhost:3000/asientos', asiento).subscribe(() => {
      this.actualizacionAsientos.next();
    });
  }
}
