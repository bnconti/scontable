import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroDiarioComponent } from './libros/libro-diario/libro-diario.component';
import { LibroMayorComponent } from './libros/libro-mayor/libro-mayor.component';

const routes: Routes = [
  { path: 'libroDiarioRoute', component: LibroDiarioComponent},
  { path: 'libroMayorRoute', component: LibroMayorComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
