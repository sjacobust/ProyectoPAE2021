import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url:string = environment.apiUrl;

  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.authService.getToken() || ''
  });

  constructor(private httpClient:HttpClient, private authService:AuthService) {

    
  }

  getAllUsers():Promise<any> {
    return this.httpClient.get(this.url + `/users`, {headers: this.httpOptions}).toPromise();
  }

  getAllAdmins():Promise<any> {
    return this.httpClient.get(this.url + `/users?admins=true`, {headers: this.httpOptions}).toPromise();
  }

  deleteUser(email:string):Promise<any> {
    return this.httpClient.delete(this.url + `/users?email=${email}`, {headers: this.httpOptions}).toPromise();
  }

  addAdmin(user:any):Promise<any> {
    return this.httpClient.post(this.url + `/admin`, user, {headers: this.httpOptions}).toPromise();
  }

}
