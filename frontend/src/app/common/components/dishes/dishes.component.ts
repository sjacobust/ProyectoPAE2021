import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  menu:any = [];
  menuLength:any = 0;

  constructor(private menuService:MenuService) {
    this.menuService.getDishes().then(result => {
      this.menu = result;
    });
  }

  ngOnInit(): void {
    
  }

}
