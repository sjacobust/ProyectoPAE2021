import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dishes-admin',
  templateUrl: './dishes-admin.component.html',
  styleUrls: ['./dishes-admin.component.scss']
})
export class DishesAdminComponent implements OnInit {


  @Input() dishes:any = [];
  @Output() deleteEvent:any = new EventEmitter();
  @Output() updateEvent:any = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteClick(event:any, entity:any) {
    const payload = {
      docObject: event,
      entity: entity
    }
    this.deleteEvent.emit(payload);
  }

}
