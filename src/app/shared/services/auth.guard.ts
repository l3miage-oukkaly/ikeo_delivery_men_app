import {CanActivateFn, CanDeactivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {HomepageComponent} from "../../views/homepage/homepage.component";
import {DeliveryService} from "./delivery.service";

export const authGuardActivate: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const deliveryService = inject(DeliveryService)
  const router = inject(Router);
  if (authServ.sigObsUser() === null) {
    router.navigate(['/'])
    return false
  } else {
    return deliveryService.getDeliveryTour(authServ.sigObsUser()!.email!).then(() => {
      console.log("Ok")
      return true
  }, async (error) => {
      if (error.status === 403) {
        console.log(error)
        console.log("ntm")
        await authServ.logout();
        return false;
      } else {
        console.log(error)
        return true
      }
    })
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
