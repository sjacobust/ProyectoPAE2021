import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url:string = environment.apiUrl + '/addresses';

  constructor(private httpClient:HttpClient) {

  }

  deleteAddress(address:any, token:any):Promise<any> {
    return this.httpClient.delete(this.url + `?address=${address}&token=${token}`).toPromise();
  }

  updateAddress(address:any, token:any):Promise<any> {
    return this.httpClient.put(this.url + `?address=${address}&token=${token}`, address).toPromise();
  }

  addAddress(address:any):Promise<any> {
    return this.httpClient.post(this.url, address).toPromise();
    
  }


}
