import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<any> = new BehaviorSubject(false);

  tokenUrl:string = environment.apiUrl + "/auth";

  constructor() {
    this.loginStatus.next(this.isLoggedIn());

  }

  saveToken(token:string) {
    localStorage.setItem('token', token);
    this.loginStatus.next(true);

  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken():string|null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.loginStatus.next(false);
  }
}
