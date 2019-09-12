import { Component } from '@angular/core';
import { CuentaService } from '../cuenta.service';
import { NgForm } from '@angular/forms';
import {
  faSave,
  faCheck,
  faDollarSign,
  faScroll,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

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

  constructor(public cuentaService: CuentaService) { }

  /* ------------------------- */

  agregarCuenta(form: NgForm) {
    if (form.invalid) { return; }
    this.cuentaService.agregarCuenta(form.value.nombre, form.value.monto, form.value.tipo, form.value.monto);
  }

}
