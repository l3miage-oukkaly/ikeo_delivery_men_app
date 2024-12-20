import { Routes } from '@angular/router';
import {authGuardActivate, authGuardAlreadyLoggedIn} from "./shared/services/auth.guard";

export const routes: Routes = [
  { path:'', loadComponent: () => import('./views/homepage/homepage.component').then(m => m.HomepageComponent), canActivate: [authGuardAlreadyLoggedIn]},
  { path:'auth', loadComponent: () => import('./views/auth/auth.component').then(m => m.AuthComponent), canActivate: [authGuardAlreadyLoggedIn]},
  { path:'delivery-tour', loadComponent: () => import('./views/delivery-tour-display/delivery-tour-display.component').then(m => m.DeliveryTourDisplayComponent), canActivate: [authGuardActivate]},
  { path:'delivery-tour/in-course', loadComponent: () => import('./views/delivery-tour-incourse/delivery-tour-incourse.component').then(m => m.DeliveryTourIncourseComponent), canActivate: [authGuardActivate]}
];
