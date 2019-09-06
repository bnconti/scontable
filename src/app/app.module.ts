import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsientoComponent } from './asiento/asiento.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ResumenComponent } from './resumen/resumen.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsientoComponent,
    CuentaComponent,
    ResumenComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
