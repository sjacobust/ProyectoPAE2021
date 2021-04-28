import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getUser(email:string):Promise<any> {
    return this.httpClient.get(this.url + `/users?email=${email}`).toPromise();
  }

  signUp(user:any):Promise<any> {
    return this.httpClient.post(this.url + `/signup`, user).toPromise();
  }


}
