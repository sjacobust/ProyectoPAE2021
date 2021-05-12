import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url:string = environment.apiUrl + "/menu";

  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.authService.getToken() || ''
  });

  constructor(private httpClient:HttpClient, private authService:AuthService) {

  }

  getDishes():Promise<any> {
    return this.httpClient.get(this.url).toPromise();
  }

  saveDish(dish:any):Promise<any>{
    return this.httpClient.post(this.url, dish, { headers: this.httpOptions }).toPromise();
  }

  deleteDish(dish:any):Promise<any> {
    return this.httpClient.delete(this.url + `?dish=${dish}`, { headers: this.httpOptions }).toPromise();
  }

 
}
