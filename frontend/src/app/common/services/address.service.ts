import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  private httpOptions =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: this.authService.getToken() || ''
  });
  private url:string = environment.apiUrl + '/addresses';

  constructor(private httpClient:HttpClient, private authService:AuthService) {

  }

  deleteAddress(address:any):Promise<any> {
    return this.httpClient.delete(this.url + `?address=${address}`, {headers: this.httpOptions}).toPromise();
  }

  updateAddress(oldAddress:any, newAddress:any):Promise<any> {
    return this.httpClient.put(this.url + `?address=${oldAddress}`, newAddress, {headers: this.httpOptions}).toPromise();
  }

  addAddress(address:any):Promise<any> {
    return this.httpClient.post(this.url, address, {headers: this.httpOptions}).toPromise();
    
  }


}
