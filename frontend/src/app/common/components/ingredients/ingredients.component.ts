import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  measurementOption:any= 0;
  quantityOption:any = 0;
  ingredients:any = [];

  constructor(private ingredientService:IngredientService) {
    this.ingredientService.getIngredients(0).then(ingredients => {
      this.ingredients = ingredients;
    })
   }

  ngOnInit(): void {
  }

  chosenMeasurement(event:any){
    this.measurementOption = parseInt(event.target.value);
  }

  changedQuantity(event:any) {
    this.quantityOption = parseInt(event.target.value); 
  }

}
