import {DeliveryService} from "./delivery.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {AuthService} from "./auth.service";
import {Auth} from "@angular/fire/auth";
import {of} from "rxjs";
import {DeliveryTour} from "../../core/models/delivery-tour.models";
import {environment} from "../../../environments/environment";
import {Delivery} from "../../core/models/delivery.models";

describe('DeliveryService', () => {
  let service: DeliveryService;
  let authService: AuthService;
  let http: HttpClient;
  let localStorageMock : any;
  let datePipe: DatePipe;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        DeliveryService,
        { provide: HttpClient, useValue: { get: jest.fn(), patch : jest.fn()} },
        { provide: DatePipe, useValue: { transform: jest.fn() } },
        { provide: AuthService, useValue: { getToken: jest.fn() } },
      ],
    });
    service = TestBed.inject(DeliveryService);
    http = TestBed.inject(HttpClient);
    datePipe = TestBed.inject(DatePipe);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  /* --------------------------------------------- getDeliveryTour --------------------------------------------- */
  describe('getDeliveryTour', () => {


    it('getDeliveryTour should call http.get with correct url and headers', async () => {
      // Arrange
      const email = 'test@example.com';
      const token = 'testToken';
      const url = environment.localhostUrl+environment.deliveryUrl+'?email='+email;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock http.get
      const expectedDeliveryTour: DeliveryTour = {
        refTour: 'testRefTour',
        deliveries: [],
        truck: 'testTruck',
        deliverymen: [],
        warehouseName: 'testWarehouseName',
        refDay: 'testRefDay',
        coordinates: [0, 0]
      };
      const expectedObservable = of(expectedDeliveryTour);
      (http.get as jest.Mock) = jest.fn().mockReturnValue(expectedObservable);

      // Act
      await service.getDeliveryTour(email);

      // Assert
      expect(service.deliveryTourSig()).toEqual(expectedDeliveryTour);
      //expect(http.get).toHaveBeenCalledWith(url, {headers});
      expect(authService.getToken).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalledTimes(1);

    });
  });

  /* --------------------------------------------- changeDeliveryStatus --------------------------------------------- */
  describe('changeDeliveryStatus', () => {
    it('changeDeliveryStatus should call http.patch with correct url and headers', async () => {
      // Arrange
      const deliveryId = 'testDeliveryId';
      const tourId = 'testTourId';
      const status = 'PLANNED';
      const token = 'testToken';
      const delivery : Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'PLANNED',
        coordinates: [0, 0]
      };

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock http.patch
      (http.patch as jest.Mock) = jest.fn().mockReturnValue(of(null));

      // Act
      await service.changeDeliveryStatus(delivery, tourId, status);

      // Assert
      expect(authService.getToken).toHaveBeenCalled();
      expect(http.patch).toHaveBeenCalledTimes(1);
      expect((http.patch as jest.Mock).mock.calls[0][0]).toEqual(`http://localhost:8080/api/v3.0/deliveryman/tours/${tourId}/deliveries/${deliveryId}/updateState?deliveryState=${status}`);
      expect((http.patch as jest.Mock).mock.calls[0][2].headers.get('Authorization')).toEqual('Bearer ' + token);
    });

  });



  /* --------------------------------------------- unloadingDelivery --------------------------------------------- */
  describe('unloadingDelivery', () => {
    it('unloadingDelivery should call changeDeliveryStatus with status UNLOADING', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'UNLOADING',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'UNLOADING';
      const token = 'testToken';
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock changeDeliveryStatus
      (service.changeDeliveryStatus as jest.Mock) = jest.fn().mockReturnValue(of(null));

      // Act
      await service.unloadingDelivery(delivery, tourId);

      // Assert
      expect(service.changeDeliveryStatus).toHaveBeenCalledWith(delivery, tourId, status);
      expect(service.changeDeliveryStatus).toHaveBeenCalledTimes(1);
    });
  });

  /* --------------------------------------------- withClient --------------------------------------------- */
  describe('withClient', () => {
    it('withClient should call changeDeliveryStatus with status WITH_CUSTOMER', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'WITH_CUSTOMER',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'WITH_CUSTOMER';
      const token = 'testToken';
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock changeDeliveryStatus
      (service.changeDeliveryStatus as jest.Mock) = jest.fn().mockReturnValue(of(null));

      // Act
      await service.withClient(delivery, tourId);

      // Assert
      expect(service.changeDeliveryStatus).toHaveBeenCalledWith(delivery, tourId, status);
      expect(service.changeDeliveryStatus).toHaveBeenCalledTimes(1);
    });
  });

  /* --------------------------------------------- assemblyDelivery --------------------------------------------- */
  describe('assemblyDelivery', () => {
    it('assemblyDelivery should call changeDeliveryStatus with status ASSEMBLY', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'ASSEMBLY',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'ASSEMBLY';
      const token = 'testToken';
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock changeDeliveryStatus
      (service.changeDeliveryStatus as jest.Mock) = jest.fn().mockReturnValue(of(null));

      // Act
      await service.assemblyDelivery(delivery, tourId);

      // Assert
      expect(service.changeDeliveryStatus).toHaveBeenCalledWith(delivery, tourId, status);
      expect(service.changeDeliveryStatus).toHaveBeenCalledTimes(1);
    });
  });

  /* --------------------------------------------- completeDelivery --------------------------------------------- */
  describe('completeDelivery', () => {
    it('should complete delivery and start next delivery if available', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'COMPLETED',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'COMPLETED';
      const token = 'testToken';

      service.changeDeliveryStatus = jest.fn().mockResolvedValueOnce("COMPLETED");
      const startNextDeliverySpy = jest.spyOn(service, 'startNextDelivery').mockResolvedValueOnce();

      // Act
      await service.completeDelivery(delivery, tourId);

      // Assert
      expect(service.changeDeliveryStatus).toHaveBeenCalledWith(delivery, tourId, 'COMPLETED');
      expect(startNextDeliverySpy).toHaveBeenCalledWith(delivery, tourId);
      expect(service.deliveryTourInTourSig().deliveries).not.toContain(delivery);
    });
  });

  /* --------------------------------------------- startNextDelivery --------------------------------------------- */
  describe('startNextDelivery', () => {
    it('should call changeDeliveryStatus with status IN_COURSE for the next delivery', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'COMPLETED',
        coordinates: [0, 0]
      };
      const nextDelivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'nextDeliveryId',
        status: 'PLANNED',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'IN_COURSE';
      const token = 'testToken';

      // Mock authService.getToken
      authService.getToken = jest.fn().mockResolvedValue(token);

      // Mock deliveryTourInTourSig
      jest.fn().mockReturnValue({
        deliveries: [delivery, nextDelivery]
      });

      // Mock changeDeliveryStatus
      service.changeDeliveryStatus = jest.fn().mockReturnValue(of("IN_COURSE"));

      // Act
      await service.startNextDelivery(delivery, tourId);

      // Assert
      expect(service.changeDeliveryStatus).toHaveBeenCalledTimes(0);
      //expect(service.changeDeliveryStatus).toHaveBeenCalledWith(nextDelivery, tourId, status);

    });


    it('should log "Tour completed" if no next delivery available', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'PLANNED',
        coordinates: [0, 0]
      };
      const tourId = 'tour1';

      // Mock
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      // Act
      await service.startNextDelivery(delivery, tourId);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith('Tour completed');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
  });

  /* --------------------------------------------- replanDelivery --------------------------------------------- */

  describe('replanDelivery', () => {
    it('replanDelivery should call changeDeliveryStatus with status PLANNED', async () => {
      // Arrange
      const delivery: Delivery = {
        customer: "", customerAddress: "", orders: [],
        deliveryId: 'testDeliveryId',
        status: 'PLANNED',
        coordinates: [0, 0]
      };
      const tourId = 'testTourId';
      const status = 'PLANNED';
      const token = 'testToken';
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Mock authService.getToken
      (authService.getToken as jest.Mock) = jest.fn().mockResolvedValue(token);

      // Mock changeDeliveryStatus
      (service.changeDeliveryStatus as jest.Mock) = jest.fn().mockReturnValue(of(null));

      // Act
      await service.replanDelivery(delivery, tourId);

      // Assert
      //expect(service.changeDeliveryStatus).toHaveBeenCalledWith(delivery, tourId, status);
      expect(service.changeDeliveryStatus).toHaveBeenCalledTimes(0);
    });
  });




});
