import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  user:any = {};
  userIsLoggedIn:boolean = false;
  username:string = "";
  isAdmin:boolean = false;

  constructor(private authService:AuthService, private router:Router, private userService:UserService) {
    this.authService.loginStatus.subscribe(flag => {
      this.userIsLoggedIn = flag;
      if(flag){
        const token = this.authService.getToken();
        this.userService.getUserByToken(token).then(result => {
          this.user = result[0];

        }).catch(err => {
          console.log("No Token, logging out", err);
          this.logout();
        });
      }      
    });
  }

  ngOnInit(): void {
    
  }

  logout() {
    const token = this.authService.getToken();
    this.userService.logout(token).subscribe(data => {
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }

}
