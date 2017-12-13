import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantesComponent } from 'app/restaurantes/restaurantes.component';
import { PratosComponent } from 'app/pratos/pratos.component';
import { HomeComponent } from 'app/home/home.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'restaurantes', component: RestaurantesComponent },
    { path: 'pratos', component: PratosComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);