import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AsientoService } from 'src/app/asiento.service';
import { CuentaMayor } from 'src/app/asiento/asiento.model';
//Se importa el modulo de cuentas para buscar con Nro y nombre
@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.css']
})
export class LibroMayorComponent implements OnInit {
  private movimientos: CuentaMayor[];
  private movimientosSub: Subscription;


  /* ------------------------- */

  constructor(public asientoService: AsientoService) { }

  ngOnInit() {
    this.asientoService.traerMovimientos();
    this.movimientosSub = this.asientoService.traerObservadorMovimientos()
      .subscribe((movimientos: CuentaMayor[]) => {
        this.movimientos = movimientos;
      });
  }

  /* ------------------------- */

  public getMovimientos(): CuentaMayor[] {
    return this.movimientos;
  }

  public convertirEnString(obj) {
    return JSON.stringify(obj);
  }
  
}
