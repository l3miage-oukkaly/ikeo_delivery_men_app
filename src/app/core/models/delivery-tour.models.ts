import {Order} from "./order.models";
import {Delivery} from "./delivery.models";

export interface DeliveryTour {
  id: string,
  deliveries : Delivery[],
  deliveryMen : string[],
  truck : string,
  distanceToCover: number
}
