import {DeliveryTour} from "../../models/delivery-tour.models";

export abstract class DeliveryProtocols {

  abstract getDeliveryTour(email: string): Promise<DeliveryTour>
}
