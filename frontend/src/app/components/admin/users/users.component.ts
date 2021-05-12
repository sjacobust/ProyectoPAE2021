import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users:any = [];
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
