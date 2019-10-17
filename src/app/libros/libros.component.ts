import { Component } from '@angular/core';

@Component({
  selector: 'app-libros',
  template: `
    <h1 class="title">Sistema Contable v1.0</h1>

    <hr>

    <div class="tabs is-boxed">
        <nav>
        <ul>
            <li><a routerLink='libroDiario'>Libro diario</a></li>
            <li><a routerLink='libroMayor'>Libro mayor</a></li>
        </ul>
        </nav>
    </div>

    <router-outlet></router-outlet>`,
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {

  constructor() { }

}
