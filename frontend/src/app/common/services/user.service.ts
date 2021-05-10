import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "./../../../environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  url:string = environment.apiUrl;

  constructor(private httpClient:HttpClient) {

  }

  getUserByEmail(email:string):Promise<any> {
    return this.httpClient.get(this.url + `/users?email=${email}`).toPromise();
  }

  getUserByToken(token:any):Promise<any> {
    return this.httpClient.get(this.url + `/users?token=${token}`).toPromise();
  }

  login(credentials:any):Promise<any> {
    return this.httpClient.post(this.url + "/login", credentials).toPromise();
  }

  signUp(user:any):Promise<any> {
    return this.httpClient.post(this.url + `/signup`, user).toPromise();
  }

  logout(token:any):Observable<{}>{
    return this.httpClient.delete(this.url + "/logout/" + token);
  }

}
