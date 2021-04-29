import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token:string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token') || false;
  }

  getToken():string|null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
