import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingredients-admin',
  templateUrl: './ingredients-admin.component.html',
  styleUrls: ['./ingredients-admin.component.scss']
})
export class IngredientsAdminComponent implements OnInit {

  @Input() ingredients:any = [];
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
