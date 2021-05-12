import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "./../../../environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  url:string = environment.apiUrl;
  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.authService.getToken() || ''
  });

  constructor(private httpClient:HttpClient, private authService:AuthService) {

  }

  getUserByEmail(email:string):Promise<any> {
    return this.httpClient.get(this.url + `/users?email=${email}`).toPromise();
  }

  getUserByToken(token:any):Promise<any> {
    return this.httpClient.get(this.url + `/users?token=${token}`, {headers: this.httpOptions}).toPromise();
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

  isAdmin():Promise<boolean>{
    const token = this.authService.getToken();
    return this.getUserByToken(token).then(result => {
      if(result) {
        if(result[0].isAdmin) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }).catch(err => {
      return false;
    });
  }

  updateUser(email:string) {

  }
}
