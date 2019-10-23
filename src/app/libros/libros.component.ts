import { Component } from '@angular/core';

@Component({
  selector: 'app-libros',
  template: `
   <div class="tabs is-boxed is-fullwidth is-medium">
        <ul>
            <li [ngClass]="{'is-active': checkTab('diario')}" (click)="setTab('diario')" ><a routerLink='libroDiario'>Libro diario</a></li>
            <li [ngClass]="{'is-active': checkTab('mayor')}" (click)="setTab('mayor')"><a routerLink='libroMayor'>Libro mayor</a></li>
        </ul>
    </div>

    <router-outlet></router-outlet>`,
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {

  // Esta variable guarda el tab seleccionado para aplicarle la clase 'is-active'
  private seleccionado: string;

  constructor() { }

  setTab(opcion: string) {
    this.seleccionado = opcion;
  }

  checkTab(opcion: string): boolean {
    return this.seleccionado === opcion;
  }


}
