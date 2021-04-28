import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HeaderComponent } from './common/components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { IngredientsComponent } from './common/components/ingredients/ingredients.component';
import { TaquizaComponent } from './common/components/taquiza/taquiza.component';
import { DishesComponent } from './common/components/dishes/dishes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    AboutUsComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    ProductsComponent,
    IngredientsComponent,
    TaquizaComponent,
    DishesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
