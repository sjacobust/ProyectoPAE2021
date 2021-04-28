import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../common/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu:any[] = []
  week:number = 0;


  constructor(private menuService:MenuService) { 
    console.log(menuService);
    this.menuService = menuService;
  }

  ngOnInit(): void {
    
    let date:Date = this.getTodaysDate();
    this.week = this.getWeekOfMonth(date);
    console.log(this.week);
    this.menuService.getDishes().then(response => {
      this.menu = response;
    });
  }

  getWeekOfMonth(date: Date) {
    let adjustedDate: number = date.getDate() + date.getDay();
    let prefixes: string[] = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]));
  }

  getTodaysDate() {
    let date:Date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    date = new Date(mm + '/' + dd + '/' + yyyy);
    return date;
  }

  

}
