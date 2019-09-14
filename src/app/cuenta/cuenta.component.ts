import { Component } from '@angular/core';
import { CuentaService } from '../cuenta.service';
import { NgForm } from '@angular/forms';

import { faSave, faCheck, faDollarSign, faScroll, faExclamationCircle, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  faSave = faSave;
  faDollarSign = faDollarSign;
  faScroll = faScroll;
  faCheck = faCheck;
  faExclamationCircle = faExclamationCircle;
  faPen = faPen;

  constructor(public cuentaService: CuentaService) { }

  /* ------------------------- */

  agregarCuenta(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.cuentaService.agregarCuenta(form.value.nro, form.value.nombre, form.value.tipo);
    form.resetForm();
  }

}
