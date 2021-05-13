import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishes-admin',
  templateUrl: './dishes-admin.component.html',
  styleUrls: ['./dishes-admin.component.scss']
})
export class DishesAdminComponent implements OnInit {


  @Input() dishes:any = [];
  @Output() deleteEvent:any = new EventEmitter();
  @Output() updateEvent:any = new EventEmitter();

  form!: FormGroup

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", [Validators.required, Validators.email]]
    })
  }

  deleteClick(event:any, entity:any) {
    const payload = {
      docObject: event,
      entity: entity
    }
    this.deleteEvent.emit(payload);
  }

  editClick(event:any, entity:any) {
    const payload = {
      docObject: event,
      entity: entity
    }
    this.updateEvent.emit(payload);
  }

  addDish() {

  }


}
