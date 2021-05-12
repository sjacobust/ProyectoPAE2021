import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  userLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private userService:UserService, private router: Router) {
    this.authService.loginStatus.subscribe(flag => {
      this.userLoggedIn = flag;
    });
    this.userService.isAdmin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userLoggedIn && (route.url[0].path === 'login' || route.url[0].path === 'register')) {
      this.router.navigate(['profile']);
      return false;
    } else if (!this.userLoggedIn && route.url[0].path === 'profile') {
      this.router.navigate(['login']);
      return false;
    } else if (route.url[0].path === 'admin') {
      this.userService.getUserByToken(this.authService.getToken()).then(result => {
        if(result) {
          if(result[0].isAdmin) {
            return true;
          }
          else {
            this.router.navigate(['no-auth']);
            return false;
          }
        }
        this.router.navigate(['no-auth']);
        return false;
      }).catch(err => {
        this.router.navigate(['no-auth']);
        return false;
      })
    }
    return true;
  }

}
