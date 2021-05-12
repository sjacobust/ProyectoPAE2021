import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-monthly-menu',
  templateUrl: './monthly-menu.component.html',
  styleUrls: ['./monthly-menu.component.scss']
})
export class MonthlyMenuComponent implements OnInit, OnChanges {

  @Input() dishes: any = [];
  @Output() updateEvent:any = new EventEmitter();

  weeklyMenu: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const menu = changes[propName]
      for (let i = 0; i < menu.currentValue.length; i++) {
        if (menu.currentValue[i].weekly_dish.chosen) {
          this.weeklyMenu.splice(menu.currentValue[i].weekly_dish.week, 0, menu.currentValue[i]);
        }
      }
    }
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
