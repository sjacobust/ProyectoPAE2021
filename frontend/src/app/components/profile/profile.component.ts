import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/common/services/address.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { GeographyService } from 'src/app/common/services/geography.service';
import { UserService } from 'src/app/common/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  deleted: any;
  added: any;
  updated: any;

  user: any = { addresses: [], img: { path: ''} };
  states: any;
  address: any = {};
  image: any;
  imageToShow:any;

  oldAddress: any = {};

  form!: FormGroup;
  passwordConfirmed: boolean = false;
  newPasswordCheck: boolean = false;

  urlImg:string = '';


  constructor(private sanitizer:DomSanitizer, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private geographyService: GeographyService, private addressService: AddressService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit(): void {
    const token = this.authService.getToken();
    this.userService.getUserByToken(token).then(result => {
      this.user = result[0];
      if (this.user.img) {
        const imgDestination = this.user.img.destination.replace("dist/assets", '') || '';
        this.urlImg = `${environment.apiUrl}/${imgDestination}/${this.user.img.filename}`;
      }
    });
    this.geographyService.getMexicosStates().then(result => {
      this.states = result.data.states;
    });
    this.route.queryParams.subscribe(params => {
      this.deleted = params['deleted'];
      this.added = params['added'];
      this.updated = params['updated'];
    });
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telephone: ["", Validators.required],
      oldPassword: ["", [Validators.required, Validators.minLength(8)]],
      newPassword: [{ value: '', disabled: !this.newPasswordCheck }, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [{ value: '', disabled: !this.newPasswordCheck }, [Validators.required, Validators.minLength(8)]],
      profilePic: [null]
    }, {
      validators: [
        () => {
          if (!this.form) return;
          if (this.newPasswordCheck) {
            if (this.form.controls.newPassword.value == this.form.controls.confirmPassword.value && this.form.controls.oldPassword == this.user.password) {
              this.passwordConfirmed = true;
              return null;
            } else {
              this.passwordConfirmed = false;
              return {
                confirmPasswords: true
              }
            }
          } else {
            return null;
          }

        },
      ]
    });
  }

  addAddress() {
    let fullAddress = '';
    if (this.address.dir2) {
      fullAddress = `${this.address.dir1} ${this.address.dir2} ${this.address.zipCode} ${this.address.city} ${this.address.state}`;
    } else {
      fullAddress = `${this.address.dir1} ${this.address.zipCode} ${this.address.city} ${this.address.state}`;
    }
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
    this.addressService.deleteAddress(this.oldAddress).then(result => {
      location.replace('/profile?deleted=true');
    }).catch(err => {
      console.log('No se pudo borrar la Dirección');
      console.log(err);
    });

  }

  updateAddress() {
    let fullAddress = '';
    if (this.address.dir2) {
      fullAddress = `${this.address.dir1} ${this.address.dir2} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    } else {
      fullAddress = `${this.address.dir1} ${this.address.zipCode} ${this.address.city} ${this.address.state}`
    }
    const payload = {
      address: fullAddress
    }
    this.addressService.updateAddress(this.oldAddress, payload).then(result => {
      location.replace('/profile?updated=address');
    });
  }

  imageAdded(event: any) {
    this.image = <HTMLInputElement>event.target.files[0];
    this.form.patchValue({
      profilePic: this.image
    })
  }

  updateUser() {
    const formData = new FormData();


    const userUpdate = {
      name: this.form.controls.name.value || this.user.name,
      email: this.form.controls.email.value || this.user.email,
      telephone: this.form.controls.telephone.value || this.user.telephone,
      newPassword: this.form.controls.newPassword.value,
      profilePic: this.image || {}
    }

    formData.append('name', userUpdate.name);
    formData.append('email', userUpdate.email);
    formData.append('telephone', userUpdate.telephone);
    formData.append('newPassword', userUpdate.newPassword);
    formData.append('profilePic', userUpdate.profilePic);

    this.userService.updateUser(formData).then(result => {
      location.replace('/profile?updated=user');
    }).catch(err => {
      console.log('Cambios no guardados', err);
    });
  }


  newPassword(event: any) {
    this.newPasswordCheck = event.target.checked;
    if (this.newPasswordCheck) {
      this.form.get('newPassword')?.enable();
      this.form.get('confirmPassword')?.enable();
    } else {
      this.form.get('newPassword')?.disable();
      this.form.get('confirmPassword')?.disable();
    }

  }

}
