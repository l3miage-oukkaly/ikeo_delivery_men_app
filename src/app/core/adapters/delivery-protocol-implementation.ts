import {DeliveryProtocols} from "../ports/delivery-protocol/delivery-protocols";
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {inject} from "@angular/core";
import {DeliveryTour} from "../models/delivery-tour.models";
import {firstValueFrom} from "rxjs";

export class DeliveryProtocolImplementation extends DeliveryProtocols {
  private http = inject(HttpClient)

  async getDeliveryTour(email: string) {
    return firstValueFrom(this.http.get<DeliveryTour>( environment.localhostUrl+environment.deliveryUrl+'?email='+email))
  }

  async changeDeliveryStatus(deliveryId: string, tourId: string, status: 'PLANNED' | 'IN_COURSE' | 'UNLOADING' | 'WITH_CUSTOMER' | 'ASSEMBLY' | 'COMPLETED') {
    return firstValueFrom(this.http.patch("http://localhost:8080/api/v3.0/deliveryman/tours/"+tourId+"/deliveries/"+deliveryId+"/updateState?deliveryState="+status, null))
  }
}
