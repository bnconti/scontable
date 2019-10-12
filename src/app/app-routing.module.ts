import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroDiarioComponent } from './libros/libro-diario/libro-diario.component';
import { LibroMayorComponent } from './libros/libro-mayor/libro-mayor.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: 'libroDiario', component: LibroDiarioComponent},
  { path: 'libroMayor', component: LibroMayorComponent},
  { path: '', redirectTo: '/libroDiario', pathMatch: 'full' },
  { path: '**', component: Error404Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
