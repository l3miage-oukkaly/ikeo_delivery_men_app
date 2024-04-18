import {DeliveryProtocols} from "../ports/delivery-protocol/delivery-protocols";
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {inject} from "@angular/core";
import {DeliveryTour} from "../models/delivery-tour.models";
import {firstValueFrom} from "rxjs";

export class DeliveryProtocolImplementation extends DeliveryProtocols {
  private http = inject(HttpClient)

  async getDeliveryTour(email: string) {
    return firstValueFrom(this.http.get<DeliveryTour>(environment.deliveryUrl+email))
  }
}
