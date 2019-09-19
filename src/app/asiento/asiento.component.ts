import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';

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
  private cuentasSub: Subscription;

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

    this.asientoForm = this.fb.group({
      fecha: [this.fechaHoy, [Validators.required]],
      movimientos: this.fb.array([this.crearMovimiento(), this.crearMovimiento()], [this.validarBalanceoMovimientos])
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
    // TODO: si se hace el usuario, cambiar el 1 por su ID.
    const idusuario = 1;
    const fecha: string = this.asientoForm.value.fecha;
    const movimientos: Movimiento[] = this.asientoForm.value.movimientos;

    this.asientoService.agregarAsiento(idusuario, fecha, movimientos);
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

  validarValorCuenta(control: AbstractControl): { [key: string]: boolean } | null {
    /* Verifica si el usuario seleccionó una cuenta */
    const invalid = control.value === 'Seleccione';
    return invalid ? { cuentaInvalida: true } : null;
  }

  validarBalanceoMovimientos(control: AbstractControl): { [key: string]: boolean } | null {
    /* Para que esté balanceado, la diferencia entre debe y haber debe ser 0 */
    let total = 0;
    for (const movimiento of control.value) {
      if (movimiento.tipo === 'Debe') {
        total += Number(movimiento.monto);
      } else if (movimiento.tipo === 'Haber') {
        total -= Number(movimiento.monto);
      }
    }
    return total !== 0 ? { asientoDesbalanceado: true } : null;
  }

}
