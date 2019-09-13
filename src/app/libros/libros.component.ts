import { Component, OnInit } from '@angular/core';

import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { CuentaService } from '../cuenta.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  cuentas: Cuenta[];
  private cuentasSub: Subscription;

  /* ------------------------- */

  constructor(public cuentasService: CuentaService) { }

  ngOnInit() {
    this.cuentasService.traerCuentas();
    this.cuentasSub = this.cuentasService.traerObservadorCuentas()
      .subscribe((cuentas: Cuenta[]) => {
        this.cuentas = cuentas;
      });
  }

}
