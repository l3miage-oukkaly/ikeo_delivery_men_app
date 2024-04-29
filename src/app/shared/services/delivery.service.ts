import {inject, Injectable} from '@angular/core';
import {DeliveryProtocolImplementation} from "../../core/adapters/delivery-protocol-implementation";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryProtocols: DeliveryProtocolImplementation = new DeliveryProtocolImplementation()
  private datePipe = inject(DatePipe)
  currentDate = this.datePipe.transform((new Date), 'yyyy-MM-dd')!

  constructor() { }

  async getDeliveryTour(email: string) {
    return await this.deliveryProtocols.getDeliveryTour(email)
  }
}
