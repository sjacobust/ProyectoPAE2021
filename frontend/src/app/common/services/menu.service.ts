import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url:string = environment.apiUrl + "/menu";

  constructor(private httpClient:HttpClient) {

  }

  getDishes():Promise<any> {
    return this.httpClient.get(this.url).toPromise();
  }
}
