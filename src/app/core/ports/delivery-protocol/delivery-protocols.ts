import {DeliveryTour} from "../../models/delivery-tour.models";

export abstract class DeliveryProtocols {

  abstract getDeliveryTour(email: string): Promise<DeliveryTour>;

  abstract changeDeliveryStatus(deliveryId: string, tourId: string, status: 'PLANNED' | 'IN_COURSE' | 'UNLOADING' | 'WITH_CUSTOMER' | 'ASSEMBLY' | 'COMPLETED'): any;
}
