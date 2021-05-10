import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  @Input() menu:any;
  menuLength:any = 0;

  constructor(private menuService:MenuService) {
    this.menuService.getDishes().then(result => {
      console.log(result)
      this.menu = result;
    });
  }

  ngOnInit(): void {
    
  }

}
