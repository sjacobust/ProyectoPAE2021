import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserService } from 'src/app/common/services/user.service';

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
  infoMessage:string = "";
  credentials:Credentials = {
    email: "",
    password: ""
  };

  constructor(private socialAuthService:SocialAuthService, private userService:UserService, private authService:AuthService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
    this.route.queryParams.subscribe(params => {
      if(params.redirected !== undefined && params.redirected === 'true') {
          this.infoMessage = 'Por favor inicia sesión';
      }
    });
  }

  login() {
    this.userService.login(this.credentials).then((value:any) => {
      this.authService.saveToken(value.token);
      this.router.navigate(['products']);
    }).catch(err => {
      this.error = true;
      console.log("Couldn't Log In");
    })

  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

}
