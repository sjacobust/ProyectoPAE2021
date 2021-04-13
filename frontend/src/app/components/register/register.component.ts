import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isMobile:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
  }

}
