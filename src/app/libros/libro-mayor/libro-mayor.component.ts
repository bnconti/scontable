import { Component, OnInit, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';

import { Subscription } from 'rxjs';
import { AsientoService } from 'src/app/asiento.service';
import { CuentaMayor } from 'src/app/asiento/asiento.model';
// Se importa el modulo de cuentas para buscar con Nro y nombre

import { formatCurrency } from '@angular/common';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.css']
})
export class LibroMayorComponent implements OnInit, AfterViewInit {
  @ViewChildren('dataPdf') dataPdf !: QueryList<ElementRef>;

  private movimientos: CuentaMayor[];
  private movimientosSub: Subscription;

  private debe = 0;
  private haber = 0;
  private total = 0;

  cta: string;

  faFilePdf = faFilePdf;

  doc = new jsPDF();

  data = [];

  /* ------------------------- */

  constructor(public asientoService: AsientoService) { }

  ngOnInit() {
    this.asientoService.traerMovimientos();
    this.movimientosSub = this.asientoService.traerObservadorMovimientos()
      .subscribe((movimientos: CuentaMayor[]) => {
        this.movimientos = movimientos;
      });

    this.doc.setFontSize(12);
    this.doc.setFontStyle('bold');

    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-AR', opciones);

    this.doc.text(`LIBRO MAYOR - ${fechaFormateada}`, 14, 16);
  }

  ngAfterViewInit() {
    this.dataPdf.changes.subscribe(() => {
      this.dataPdf.toArray().forEach((elem) => {
        this.data.push(elem.nativeElement);
      });
    });
  }

  /* ------------------------- */

  public getMovimientos(): CuentaMayor[] {
    return this.movimientos;
  }

  public convertirEnString(obj) {
    return JSON.stringify(obj);
  }

  public formatearMoneda(valor: number) {
    return formatCurrency(valor, 'esAR', '$', 'ARS');
  }

  calcularSubtotales(movimientos) {
    this.debe = 0;
    this.haber = 0;

    movimientos.forEach(movi => {
      if (movi.tipo_mov === 'Debe') {
        this.debe += movi.monto;
      } else if (movi.tipo_mov === 'Haber') {
        this.haber += movi.monto;
      }
    });

    this.total = this.debe - this.haber;
  }

  getDebe(): string {
    return this.formatearMoneda(this.debe);
  }

  getHaber(): string {
    return this.formatearMoneda(this.haber);
  }

  getTotal(): string {
    return this.formatearMoneda(this.total);
  }

  setCta(cta) {
    this.cta = cta;
  }

  getCta() {
    return this.cta;
  }

  agregarTabla(tabla) {
    this.doc.autoTable({
      html: tabla,
      theme: 'striped',
      startY: 20
    });

    this.doc.addPage();
  }

  generarPdf() {
    this.data.forEach(tabla => {
      console.log(tabla);

      this.agregarTabla(tabla);
    });

    this.doc.save('lmayor.pdf');
  }
}
