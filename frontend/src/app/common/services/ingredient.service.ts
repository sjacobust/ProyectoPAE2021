import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {


  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.authService.getToken() || ''
  });

  private url:string = environment.apiUrl + '/ingredients';

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getIngredients(limit:any):Promise<any> {
    return this.httpClient.get(this.url+ '?limit=0').toPromise();
  }

  saveIngredient(ingredient:any):Promise<any>{
    return this.httpClient.post(this.url, ingredient, { headers: this.httpOptions }).toPromise();
  }

  deleteIngredient(ingredient:any):Promise<any> {
    return this.httpClient.delete(this.url + `?ingredient=${ingredient}`, { headers: this.httpOptions }).toPromise();
  }
}
