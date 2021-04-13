import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isMobile:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
  }

}
