import { Component, OnInit, Output } from '@angular/core';
import { MenuService } from 'src/app/common/services/menu.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  menu: any = [];

  constructor(private menuService: MenuService) {
    
  }

  ngOnInit(): void {
    this.menuService.getDishes().then(result => {
      console.log(result)
      this.menu = result;
    });
  }

}
