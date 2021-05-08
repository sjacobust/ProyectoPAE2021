import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  description:string = "";
  infoMessage:string = "";

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Arrived at Home");
    this.route.queryParams.subscribe(params => {
      if(params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Gracias por unirte a Casa Amet! Por Favor Inicia Sesión!';
      }
    });
  }

}
