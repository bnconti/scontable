import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsientoComponent } from './asiento/asiento.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { LibrosComponent } from './libros/libros.component';
import { LibroDiarioComponent } from './libros/libro-diario/libro-diario.component';
import { LibroMayorComponent } from './libros/libro-mayor/libro-mayor.component';
import { Error404Component } from './error404/error404.component';

import { registerLocaleData } from '@angular/common';
import esAR from '@angular/common/locales/es-AR';

registerLocaleData(esAR, 'esAR');

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsientoComponent,
    CuentaComponent,
    LibrosComponent,
    LibroDiarioComponent,
    LibroMayorComponent,
    Error404Component,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- Poner en true para loguear el trace en consola
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
