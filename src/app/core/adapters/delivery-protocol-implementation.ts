import {DeliveryProtocols} from "../ports/delivery-protocol/delivery-protocols";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject} from "@angular/core";
import {DeliveryTour} from "../models/delivery-tour.models";
import {firstValueFrom} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";

export class DeliveryProtocolImplementation extends DeliveryProtocols {
  private http = inject(HttpClient)
  private authService = inject(AuthService)

  async getDeliveryTour(email: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + await this.authService.getToken()
    })
    return firstValueFrom(this.http.get<DeliveryTour>( environment.localhostUrl+environment.deliveryUrl+'?email='+email, {headers}))
  }

  async changeDeliveryStatus(deliveryId: string, tourId: string, status: 'PLANNED' | 'IN_COURSE' | 'UNLOADING' | 'WITH_CUSTOMER' | 'ASSEMBLY' | 'COMPLETED') {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + await this.authService.getToken()
    })
    return firstValueFrom(this.http.patch("http://localhost:8080/api/v3.0/deliveryman/tours/"+tourId+"/deliveries/"+deliveryId+"/updateState?deliveryState="+status, null, {headers}))
  }
}
