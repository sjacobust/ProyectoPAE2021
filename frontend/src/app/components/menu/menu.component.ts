import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../common/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: any[] = [{
    name: "",
    description: "",
    price: "",
    weekly_dish: {
      chosen: false,
      week: 0
    }
  }]
  week: number = 0;
  weeklyMenu:any = [{
    name: "",
    description: "",
    price: "",
    img: "",
  }];


  constructor(private menuService: MenuService) {
    console.log(menuService);
    this.menuService = menuService;
  }

  ngOnInit(): void {

    let date: Date = this.getTodaysDate();
    this.week = this.getWeekOfMonth(date);
    this.menuService.getDishes().then(response => {
      this.menu = response;
      for(let i = 0; i < this.menu.length; i++){
        if(this.menu[i].weekly_dish.chosen)
        this.weeklyMenu[this.menu[i].weekly_dish.week] = this.menu[i];
      }
    });
  }

  getWeekOfMonth(date: Date) {
    let adjustedDate: number = date.getDate() + date.getDay();
    let prefixes: string[] = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]));
  }

  getTodaysDate() {
    let date: Date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    date = new Date(mm + '/' + dd + '/' + yyyy);
    return date;
  }



}
