import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { Asiento, Movimiento } from './asiento.model';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { CuentaService } from '../cuenta.service';
import { Subscription } from 'rxjs';

import { faDollarSign, faCalendar, faSave, faCheck, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asiento',
  templateUrl: './asiento.component.html',
  styleUrls: ['./asiento.component.css']
})
export class AsientoComponent implements OnInit {

  faDollarSign = faDollarSign;
  faCalendar = faCalendar;
  faSave = faSave;
  faCheck = faCheck;
  faFolderOpen = faFolderOpen;

  fechaHoy = new Date().toISOString().substring(0, 10);
  cuentas: Cuenta[];

  private cuentasSub: Subscription;

  asientoForm: FormGroup;

  /* ------------------------- */

  constructor(public cuentasService: CuentaService, private fb: FormBuilder) { }

  ngOnInit() {
    this.cuentasService.traerCuentas();
    this.cuentasSub = this.cuentasService.traerObservadorCuentas()
      .subscribe((cuentas: Cuenta[]) => {
        this.cuentas = cuentas;
      });

    this.asientoForm = this.fb.group({
      titulo: [],
      movimientos: this.fb.array([this.fb.group({ point:'' })])
    })
  }

  get movimientos() {
    return this.asientoForm.get('movimientos') as FormArray;
  }
}
