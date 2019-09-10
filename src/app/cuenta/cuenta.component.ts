import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { faSave, faCheck, faDollarSign, faScroll } from '@fortawesome/free-solid-svg-icons';

import { Cuenta } from './cuenta.model';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  // Reemplazar esto por tabla en BD.
  private cuentas: Array<Cuenta> = [
    new Cuenta('Caja chica', 'Activo', 5000),
    new Cuenta('Proveedores', 'Pasivos', 0)
  ];

  constructor() { }

  ngOnInit() {
  }

  faSave = faSave;
  faDollarSign = faDollarSign;
  faScroll = faScroll;
  faCheck = faCheck;

  /* -------------------- */

  agregarCuenta(nombre: string, tipo: string, monto: number = 0) {
    let temp = new Cuenta(nombre, tipo, monto);
    this.cuentas.push(temp);
  }


}
