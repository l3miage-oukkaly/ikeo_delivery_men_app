import {CanActivateFn, CanDeactivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {HomepageComponent} from "../../views/homepage/homepage.component";

export const authGuardActivate: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = inject(Router);
  if (authServ.sigObsUser() === null) {
    router.navigate(['/'])
    return false
  } else {
    return true
  }
};

export const authGuardAlreadyLoggedIn: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authServ = inject(AuthService)
  if (authServ.sigObsUser() != null) {
    router.navigate(['/delivery-tour'])
    return false
  } else {
    return true
  }
}

export const authGuardDeactivate: CanDeactivateFn<HomepageComponent> = (component, currentRoute, currentState, nextState) => {
  const authServ = inject(AuthService);
  const router = inject(Router);

  return (authServ.sigObsUser() != null)
}
