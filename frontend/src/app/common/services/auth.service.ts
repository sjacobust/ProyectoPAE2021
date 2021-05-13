import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<any> = new BehaviorSubject(false);

  url:string = environment.apiUrl;

  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.getToken() || ''
  });

  constructor(private httpClient:HttpClient) {
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

  getProfilePicture() {
    return this.httpClient.get(this.url + '/users/image', {headers: this.httpOptions, responseType: "blob"});
  }
}
