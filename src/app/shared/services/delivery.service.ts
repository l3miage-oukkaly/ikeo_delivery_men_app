import { Injectable } from '@angular/core';
import {DeliveryProtocolImplementation} from "../../core/adapters/delivery-protocol-implementation";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryProtocols: DeliveryProtocolImplementation = new DeliveryProtocolImplementation()

  constructor() { }

  async getDeliveryTour(email: string) {
    return await this.deliveryProtocols.getDeliveryTour(email)
  }
}
