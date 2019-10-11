import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AsientoService } from 'src/app/asiento.service';
import { CuentaMayor } from 'src/app/asiento/asiento.model';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { CuentaService } from 'src/app/cuenta.service';
//Se importa el modulo de cuentas para buscar con Nro y nombre
@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.css']
})
export class LibroMayorComponent implements OnInit {
  private movimientos: CuentaMayor[];
  private movimientosSub: Subscription;

  private cuentas: Cuenta[];
  private cuentasSub: Subscription;

  /* ------------------------- */

  constructor(public asientoService: AsientoService, public cuentasService: CuentaService) { }

  ngOnInit() {
    this.asientoService.traerMovimientos();
    this.movimientosSub = this.asientoService.traerObservadorMovimientos()
      .subscribe((movimientos: CuentaMayor[]) => {
        this.movimientos = movimientos;
      });

    this.cuentasService.traerCuentas();
    this.cuentasSub = this.cuentasService.traerObservadorCuentas()
      .subscribe((cuentas: Cuenta[]) => {
        this.cuentas = cuentas;
      });
  }

  /* ------------------------- */

  public getMovimientos(): CuentaMayor[] {
    return this.movimientos;
  }

  public convertirEnString(obj) {
    return JSON.stringify(obj);
  }
  
  public getCuentas(): Cuenta[]{
    return this.cuentas;
  }
}
