import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isMobile:boolean = false;
  registerInfo:any = {
    name: "",
    lastname: "",
    email: "",
    telephon: ""
  };

  constructor(private userService:UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
  }

  register() {
    this.userService.signUp(this.registerInfo);
  }

}
