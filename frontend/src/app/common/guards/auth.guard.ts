import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  userLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loginStatus.subscribe(flag => {
      this.userLoggedIn = flag;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.userLoggedIn) {
      this.router.navigate(['login'], { queryParams: { redirected: 'true' } });
      return false;
    }

    if(this.userLoggedIn) {
      this.router.navigate(['profile']);
      return false;
    }

    return true;
  }

}
