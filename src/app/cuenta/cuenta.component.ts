import { Component } from '@angular/core';
import { CuentaService } from '../cuenta.service';
import { NgForm, NgModel } from '@angular/forms';

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

  tipos = ['Activo', 'Pasivo'];

  nombreEnUso = false;
  nroEnUso = false;

  constructor(public cuentaService: CuentaService) { }

  /* ------------------------- */

  agregarCuenta(form: NgForm) {
    this.cuentaService.agregarCuenta(form.value.nro, form.value.nombre, form.value.tipo);
    form.resetForm();
  }

  modelInvalido(model: NgModel) {
    const modelVacio = model.invalid && (model.dirty || model.touched);
    return modelVacio;
  }

  formInvalido(form: NgForm) {
    // Retorna verdadero si el formulario está incompleto, el nombre está en uso
    // o el nro. de cuenta está en uso.
    return form.invalid || this.getNombreEnUso() || this.getNroEnUso();
  }

  chequearNombreEnUso(nombre: string) {
    const nombreEnUso = this.cuentaService.valorEnUso(nombre, 'nombre');
    this.nombreEnUso = nombreEnUso;
  }

  chequearNroEnUso(nro: string) {
    const nroEnUso = this.cuentaService.valorEnUso(nro, 'nro_cta');
    this.nroEnUso = nroEnUso;
  }

  getNroEnUso(): boolean {
    return this.nroEnUso;
  }

  getNombreEnUso(): boolean {
    return this.nombreEnUso;
  }
}
