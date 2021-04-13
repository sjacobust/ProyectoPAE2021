import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  menu:any = {
    "dish": "Seitán Asado",
    "description": "Cortes de nuestro seitán artesanal, marinados y puestos al asador. Ideal para un domingo con amigxs.",
    "price": 150,
    "img": "./assets/images/carne_asada.jpg"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
