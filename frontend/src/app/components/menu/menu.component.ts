import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuService } from '../../common/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() menu: any;
  week: number = 0;
  weeklyMenu: any = [];


  constructor(private menuService: MenuService) {
    this.menuService = menuService;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);

    // if (this.parentMenu) {
    //   console.log(this.parentMenu)
    //   let menu = this.parentMenu;
    //   let date: Date = this.getTodaysDate();
    //   this.week = this.getWeekOfMonth(date);
    //   for (let i = 0; i < menu.length; i++) {
    //     if (menu[i].weekly_dish.chosen)
    //       this.weeklyMenu[menu[i].weekly_dish.week] = menu[i];
    //   }
    // }
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
