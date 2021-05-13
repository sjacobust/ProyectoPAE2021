import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/common/services/admin.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { IngredientService } from 'src/app/common/services/ingredient.service';
import { MenuService } from 'src/app/common/services/menu.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // Arrays Getters
  users:any = [];
  admins:any = [];
  dishes:any = [];
  ingredients:any = [];

  // Query Params
  deleted:any;
  updated:any;
  added:any;

  // Instances for DELETE or UPDATE
  entity:any = {};
  instanceName:string = "";

  constructor(private route:ActivatedRoute, private adminService:AdminService, private userService:UserService, private menuService:MenuService, private ingredientService:IngredientService, private authService:AuthService) {
    this.adminService.getAllUsers().then(users => {
      this.users = users
    });
    this.menuService.getDishes().then(dishes => {
      this.dishes = dishes;
    });
    this.adminService.getAllAdmins().then(admins => {
      this.admins = admins;
    });
    this.ingredientService.getIngredients(0).then(ingredients => {
      this.ingredients = ingredients;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.deleted = params['deleted'];
      this.added = params['added'];
      this.updated = params['updated'];
    });
    
  }

  deleteClick(event:any) {
    console.log(event);
    this.entity = event;
    this.instanceName = event.docObject.name;
  }

  editClick(event:any) {
    console.log(event);
    this.entity = event.docObject;
  }

  addClick(event:any) {
    console.log(event);
    this.entity = event;
  }

  deleteDocument(){
    const collection = this.entity.entity;
    if(collection == 'admin' || collection == 'user') {
      this.adminService.deleteUser(this.entity.docObject.email).then(result => {
        location.replace('/admin?deleted=true');
      }).catch(err => {
        console.log("No se pudo borrar el usuario", err);
      });
    } else if(collection == 'ingredients'){
      this.ingredientService.deleteIngredient(this.entity.docObject.name).then(result => {
        location.replace('/admin?deleted=true');
      }).catch(err => {
        console.log("No se pudo borrar el ingrediente", err);
      });
    } else if(collection == 'dishes') {
      this.menuService.deleteDish(this.entity.docObject.name).then(result => {
        location.replace('/admin?deleted=true');
      }).catch(err => {
        console.log("No se pudo borrar el platillo", err);
      });
    }
  }

  addDocument(){
    const collection = this.entity.entity || '';
    if(collection === 'admin' || collection === 'users') {
      this.adminService.deleteUser(this.entity.docObject.email).then(result => {
        console.log(result);
      }).catch(err => {
        console.log("No se pudo añadir el usuario", err);
      });
    } else if(collection === 'ingredients'){
      this.ingredientService.deleteIngredient(this.entity.docObject.name).then(result => {

      }).catch(err => {
        console.log("No se pudo añadir el insumo", err);
      });
    } else if(collection === 'dishes') {
      this.menuService.deleteDish(this.entity.docObject.name).then(result => {

      }).catch(err => {
        console.log("No se pudo añadir el platillo", err);
      });
    }
  }

}
