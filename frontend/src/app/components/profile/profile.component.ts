import { Component, Input, OnInit } from '@angular/core';
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


  user: any = "";
  states: any;
  addressToDelete: any;
  address:any = {
    token: "",
    dir1: "",
    dir2: "",
    zipCode: null,
    city: "",
    state: ""
  };

  constructor(private userService: UserService, private authService: AuthService, private geographyService:GeographyService, private addressService:AddressService) { }


  ngOnInit(): void {
    const token = this.authService.getToken();
    this.userService.getUserByToken(token).then(result => {
      this.user = result[0];
    });
    this.geographyService.getMexicosStates().then(result => {
      this.states = result.data.states;
    });
  }

  addAddress() {
    const fullAddress = `${this.address.dir1} ${this.address.dir2} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    const payload = {
      address: fullAddress,
      token: this.authService.getToken()
    }
    console.log(payload);
    this.addressService.addAddress(payload).then(result => {
      console.log(result);
    });
  }

  deleteAddress() {

  }

  editAddress() {

  }

}
