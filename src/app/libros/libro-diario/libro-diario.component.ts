import { Component, OnInit } from '@angular/core';

import { CuentaService } from '../../cuenta.service';
import { Subscription } from 'rxjs';
import { AsientoService } from '../../asiento.service';
import { Asiento, Movimiento } from '../../asiento/asiento.model';
import { Cuenta } from '../../cuenta/cuenta.model';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.component.html',
  styleUrls: ['./libro-diario.component.css']
})
export class LibroDiarioComponent implements OnInit {
  private asientos: Asiento[];
  private asientosSub: Subscription;

  private cuentas: Cuenta[];
  private cuentasSub: Subscription;

  /* ------------------------- */

  constructor(public asientoService: AsientoService, public cuentasService: CuentaService) { }

  ngOnInit() {
    this.cuentasService.traerCuentas();
    this.cuentasSub = this.cuentasService.traerObservadorCuentas()
      .subscribe((cuentas: Cuenta[]) => {
        this.cuentas = cuentas;
      });

    this.asientoService.traerAsientos();
    this.asientosSub = this.asientoService.traerObservadorAsientos()
      .subscribe((asientos: Asiento[]) => {
        this.asientos = asientos;
      })
  }

  public getAsientos(): Asiento[] {
    return this.asientos;
  }

  public getCuentas(): Cuenta[] {
    return this.cuentas;
  }

  public tamanhoFilas(i: number): number {
    return this.asientos[i].movimientos.length;
  }

  public sliceMovimientos(i: number): Movimiento[] {
    return this.asientos[i].movimientos.slice(1);
  }

  public convertirEnString(obj) {
    return JSON.stringify(obj);
  }
}
