import { Routes } from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {DeliveryTourDisplayComponent} from "./views/delivery-tour-display/delivery-tour-display.component";

export const routes: Routes = [
  { path:'', component: HomepageComponent},
  { path:'delivery-tour', component: DeliveryTourDisplayComponent}
];
