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

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotAuthorizedComponent } from './common/components/not-authorized/not-authorized.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { DishesAdminComponent } from './components/admin/dishes-admin/dishes-admin.component';
import { IngredientsAdminComponent } from './components/admin/ingredients-admin/ingredients-admin.component';
import { MonthlyMenuComponent } from './components/admin/monthly-menu/monthly-menu.component';

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
    ProfileComponent,
    AdminComponent,
    NotAuthorizedComponent,
    UsersComponent,
    AdminsComponent,
    DishesAdminComponent,
    IngredientsAdminComponent,
    MonthlyMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
