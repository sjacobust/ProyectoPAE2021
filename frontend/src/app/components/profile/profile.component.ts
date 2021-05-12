import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/common/services/address.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { GeographyService } from 'src/app/common/services/geography.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  deleted:any;
  added:any;
  updated:any;

  user: any = {addresses: []};
  states: any;
  address: any = {};

  oldAddress: any = {};


  constructor(private userService: UserService, private authService: AuthService, private geographyService: GeographyService, private addressService: AddressService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    const token = this.authService.getToken();
    this.userService.getUserByToken(token).then(result => { 
      this.user = result[0];
    });
    this.geographyService.getMexicosStates().then(result => {
      this.states = result.data.states;
    });
    this.route.queryParams.subscribe(params => {
      this.deleted = params['deleted'];
      this.added = params['added'];
      this.updated = params['updated'];
    });
  }

  addAddress() {
    const fullAddress = `${this.address.dir1} ${this.address.dir2} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    const payload = {
      address: fullAddress,
      token: this.authService.getToken()
    }
    this.addressService.addAddress(payload).then(result => {
      location.replace('/profile?added=true');
    }).catch(err => {
      console.error("No se pudo agregar la dirección");
    });
    
  }
  
  getAddress(event: any) {
    this.oldAddress = event;
  }

  deleteAddress() {
    this.addressService.deleteAddress(this.oldAddress, this.authService.getToken()).then(result => {
      location.replace('/profile?deleted=true');
    }).catch(err => {
      console.log('No se pudo borrar la Dirección');
      console.log(err);
    });

  }

  updateAddress() {
    let fullAddress = '';
    if(this.address.dir2) {
      fullAddress = `${this.address.dir1} ${this.address.dir2} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    } else {
      fullAddress = `${this.address.dir1} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    }
    

    const payload = {
      address: fullAddress
    }
    this.addressService.updateAddress(this.oldAddress, payload, this.authService.getToken()).then(result => {
      location.replace('/profile?updated=true');
    });
  }

}
