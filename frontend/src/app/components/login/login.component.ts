import { Component, OnInit } from '@angular/core';

import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

interface Credentials {
  email:string,
  password:string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isMobile:boolean = false;
  error:boolean = false;
  credentials:Credentials = {
    email: "",
    password: ""
  };

  constructor(private authService:SocialAuthService) { }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
  }

  login() {
    this.error = true;
  }

  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
