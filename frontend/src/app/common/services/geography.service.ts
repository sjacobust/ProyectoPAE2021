import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  url:string = "https://countriesnow.space/api/v0.1/countries/states";

  constructor(private httpClient:HttpClient) { }

  getMexicosStates():Promise<any>{
    const mexico = {
      "country": "Mexico"
  }
    return this.httpClient.post(this.url, mexico).toPromise();
  }
}
