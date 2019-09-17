import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';

import { Asiento, Movimiento } from './asiento.model';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { CuentaService } from '../cuenta.service';
import { AsientoService } from '../asiento.service';
import { Subscription } from 'rxjs';

import {
  faDollarSign, faCalendar, faSave, faFolderOpen,
  faExclamationCircle, faPlus, faMinus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asiento',
  templateUrl: './asiento.component.html',
  styleUrls: ['./asiento.component.css']
})
export class AsientoComponent implements OnInit {

  faDollarSign = faDollarSign;
  faCalendar = faCalendar;
  faSave = faSave;
  faExclamationCircle = faExclamationCircle;
  faFolderOpen = faFolderOpen;
  faPlus = faPlus;
  faMinus = faMinus;

  fechaHoy = new Date().toISOString().substring(0, 10);
  cuentas: Cuenta[];
  asientos: Asiento[];

  private cuentasSub: Subscription;
  private asientosSub: Subscription;

  tipos = ['Debe', 'Haber'];
  asientoForm: FormGroup;
  movimientos: FormArray;

  /* ------------------------- */

  constructor(public cuentasService: CuentaService, public asientoService: AsientoService, private fb: FormBuilder) { }

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
      });

    this.asientoForm = this.fb.group({
      fecha: [this.fechaHoy, [Validators.required]],
      movimientos: this.fb.array([this.crearMovimiento()], [this.validarTamanhoMovimientos])
    });
  }

  crearMovimiento(): FormGroup {
    return this.fb.group({
      monto: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nro_cta: ['Seleccione', [Validators.required, this.validarValorCuenta]]
    });
  }

  agregarAsiento() {
    this.asientoService.agregarAsiento(1, this.asientoForm.value.fecha, this.asientoForm.value.movimientos);
    this.asientoForm.reset();
  }

  agregarMovimiento() {
    this.movimientos = this.asientoForm.get('movimientos') as FormArray;
    this.movimientos.push(this.crearMovimiento());
  }

  quitarMovimiento(i: number) {
    this.movimientos = this.asientoForm.get('movimientos') as FormArray;
    this.movimientos.removeAt(i);
  }

  get traerMovimientos() {
    return this.asientoForm.get('movimientos') as FormArray;
  }

  validarValorCuenta(control: AbstractControl): { [key: string]: any } | null {
    const invalid = control.value === 'Seleccione';
    return invalid ? { invalid: { valid: false, value: control.value } } : null;
  }

  validarTamanhoMovimientos(control: AbstractControl): { [key: string]: any } | null {
    const invalid = control.value.length === 0;
    return invalid ? { invalid: { valid: false, value: control.value } } : null;
  }
}
