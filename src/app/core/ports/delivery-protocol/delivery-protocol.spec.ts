import { TestBed } from "@angular/core/testing";
  import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { DeliveryTour } from "../../models/delivery-tour.models";
import { DeliveryProtocolImplementation } from "../../adapters/delivery-protocol-implementation";

describe('delivery-protocol-test', ()=> {

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            DeliveryProtocolImplementation,
            provideHttpClient(),
            provideHttpClientTesting()
          ],
        }).compileComponents();

    });

    afterEach(() => {
        const httpTesting = TestBed.inject(HttpTestingController);
        httpTesting.verify();
    });



    describe('get delivery tour', () => {

        it('should get the delivery tour', async ()=> {
            const httpTesting = TestBed.inject(HttpTestingController);

            const deliveryProtocols = TestBed.inject(DeliveryProtocolImplementation);

            const testMail = "test@gmail.com";
            const deliveryTourP = deliveryProtocols.getDeliveryTour(testMail);

            const req = httpTesting.expectOne(`/api/v1.0/tours/deliverymen?email=${testMail}`, 'Request to load the tour attributed to the delivery man');

            expect(req.request.method).toBe('GET');

            const expectedResponse : DeliveryTour = {
                refTour : "1",
                deliveries: [
                {
                    deliveryId: "delivery1",
                    orders: ["order1","order2"],
                    customer: "Aziz",
                    customerAddress: "Echirolle"
                }
                ],
                deliverymen: [
                "Hamid"
                ],
                truck: "truckId1",
                refDay: "day1",
                warehouseName: "blueLounge"
            } ;


            req.flush(expectedResponse);

            expect(await deliveryTourP).toEqual(expectedResponse);
            httpTesting.verify(); // Ensure no unexpected requests

        });
    });




});
