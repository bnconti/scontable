import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CuentaService } from 'src/app/cuenta.service';
import { Subscription } from 'rxjs';
import { AsientoService } from 'src/app/asiento.service';
import { Asiento, Movimiento } from 'src/app/asiento/asiento.model';
import { Cuenta } from 'src/app/cuenta/cuenta.model';
import { formatCurrency } from '@angular/common';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

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

  faFilePdf = faFilePdf;

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
      });
  }

  generarPdf(ldiario) {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setFontStyle('bold');

    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-AR', opciones);

    doc.text(`LIBRO DIARIO - ${fechaFormateada}`, 14, 16);
    doc.autoTable({
      html: ldiario,
      theme: 'grid',
      startY: 20
    });
    doc.save('ldiario.pdf');
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

  public convertirEnString(obj: any) {
    return JSON.stringify(obj);
  }

  public formatearMoneda(valor: number) {
    return formatCurrency(valor, 'esAR', '$', 'ARS');
  }

}
