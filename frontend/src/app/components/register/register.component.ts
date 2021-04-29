import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketIoService } from 'src/app/common/services/socket-io.service';
import { UserService } from 'src/app/common/services/user.service';

import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isMobile: boolean = false;
  passwordConfirmed: boolean = true;
  error: boolean = false;
  registerInfo: any = {
    name: "",
    lastname: "",
    email: "",
    telephone: ""
  };

  form: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private socketIoService: SocketIoService, private router: Router, private authService: SocialAuthService
  ) {
    this.userService = userService;
  }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telephone: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
    }, {
      validators: [
        () => {
          if (!this.form) return;
          if (this.form.controls.password.value == this.form.controls.confirmPassword.value) {
            this.passwordConfirmed = true;
            return null;
          } else {
            this.passwordConfirmed = false;
            return {
              confirmPasswords: true
            }
          }
        },
      ]
    });
  }

  register() {
    if (this.form.valid) {
      console.log("Registering!");
      this.registerInfo = {
        name: this.form.controls.name.value + " " + this.form.controls.lastname.value,
        email: this.form.controls.email.value,
        telephone: this.form.controls.telephone.value,
        password: this.form.controls.password.value
      }
      this.userService.signUp(this.registerInfo).then((resolve) => {
        this.router.navigate(['home'], { queryParams: { registered: 'true' } });
      });
    } else {
      this.error = true;
    }
  }



  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
