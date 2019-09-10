import { Component, OnInit } from '@angular/core';

import { faDollarSign, faCalendar, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';

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

  fechaHoy = new Date().toISOString().substring(0, 10);

  /* -------------------- */

  constructor() { }

  ngOnInit() {
  }
 

}
