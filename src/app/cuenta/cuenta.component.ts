import { Component, OnInit } from '@angular/core';
import { faSave, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faSave = faSave;

}
