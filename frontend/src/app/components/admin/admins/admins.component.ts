import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  @Input() admins: any = [];

  @Output() deleteEvent: any = new EventEmitter();
  @Output() updateEvent: any = new EventEmitter();

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
