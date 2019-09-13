import { Component, OnInit } from '@angular/core';

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
