import { Routes } from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {DeliveryTourDisplayComponent} from "./views/delivery-tour-display/delivery-tour-display.component";
import {MapComponent} from "./views/map/map.component";

export const routes: Routes = [
  { path:'', loadComponent: () => import('./views/homepage/homepage.component').then(m => m.HomepageComponent)},
  { path:'delivery-tour', loadComponent: () => import('./views/delivery-tour-display/delivery-tour-display.component').then(m => m.DeliveryTourDisplayComponent)},
  { path:'tour-map', loadComponent: () => import('./views/map/map.component').then(m => m.MapComponent)}

];
