import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from 'app/app.routing';
import { HomeComponent } from 'app/home/home.component';
import { PratosComponent } from 'app/pratos/pratos.component';
import { RestaurantesComponent } from 'app/restaurantes/restaurantes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PratosComponent,
    RestaurantesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
