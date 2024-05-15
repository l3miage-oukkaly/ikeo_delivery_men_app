import {computed, inject, Injectable, signal} from '@angular/core';
import {DeliveryProtocolImplementation} from "../../core/adapters/delivery-protocol-implementation";
import {DatePipe} from "@angular/common";
import {DeliveryTour} from "../../core/models/delivery-tour.models";
import {Delivery} from "../../core/models/delivery.models";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryProtocols: DeliveryProtocolImplementation = new DeliveryProtocolImplementation()
  private datePipe = inject(DatePipe)
  currentDate = this.datePipe.transform((new Date), 'yyyy-MM-dd')!

  private _deliveryTourSig = signal<DeliveryTour>({refTour: '', deliveries: [], truck: '',
    deliverymen: [], warehouseName: '', refDay: '', coordinates: [0, 0]})
  deliveryTourSig = computed<DeliveryTour>(() => this._deliveryTourSig())

  private _deliveryTourInTourSig = signal<DeliveryTour>({refTour: '', deliveries: [], truck: '',
    deliverymen: [], warehouseName: '', refDay: '', coordinates: [0, 0]})
  deliveryTourInTourSig = computed<DeliveryTour>(() => this._deliveryTourInTourSig())

  constructor() { }

  getDayID(): string{
    let currentDate = new Date(this.currentDate);
    let dateSent = new Date(this.currentDate.substring(0, 4)+"-01-01");

    const diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
    if (diff.toString().length == 1) {
      return "J00"+(diff + 1)
    } else if (diff.toString().length == 2) {
      return "J0"+(diff + 1)
    }
    return "J"+(diff + 1)
  }

  async getDeliveryTour(email: string) {
    this._deliveryTourSig.set(await this.deliveryProtocols.getDeliveryTour(email))
  }

  async changeDeliveryStatus(delivery: Delivery, tourId: string, status: 'PLANNED' | 'IN_COURSE' | 'UNLOADING' | 'WITH_CUSTOMER' | 'ASSEMBLY' | 'COMPLETED') {
    await this.deliveryProtocols.changeDeliveryStatus(delivery.deliveryId, tourId, status).finally(() => {
      this._deliveryTourInTourSig.update((tour) => ({...tour, deliveries: tour.deliveries.map((deliveryMapper) => deliveryMapper.deliveryId === delivery.deliveryId ? {...deliveryMapper, status} : deliveryMapper)}))
      localStorage.setItem('tourInCourse', JSON.stringify(this.deliveryTourInTourSig()))
    })
  }

  async startDeliveryTour() {
    const tour = localStorage.getItem('tourInCourse')
    if ((tour === null) || (JSON.parse(tour).refDay != this.getDayID())) {
      this._deliveryTourInTourSig.set(this.deliveryTourSig())
      this._deliveryTourInTourSig().deliveries.map((delivery) => delivery.status = 'PLANNED')
      await this.changeDeliveryStatus(this.deliveryTourInTourSig().deliveries[0], this.deliveryTourInTourSig().refTour, 'IN_COURSE')
    } else {
      this._deliveryTourInTourSig.set(JSON.parse(tour))
    }
  }

  async unloadingDelivery(delivery: Delivery, tourId: string) {
    await this.changeDeliveryStatus(delivery, tourId, 'UNLOADING')
  }

  async withClient(delivery: Delivery, tourId: string) {
    await this.changeDeliveryStatus(delivery, tourId, 'WITH_CUSTOMER')
  }

  async assemblyDelivery(delivery: Delivery, tourId: string) {
    await this.changeDeliveryStatus(delivery, tourId, 'ASSEMBLY')
  }

  async completeDelivery(delivery: Delivery, tourId: string) {
    this.changeDeliveryStatus(delivery, tourId, 'COMPLETED').finally(() => {
      this.startNextDelivery(delivery, tourId).then(() => {
        this._deliveryTourInTourSig().deliveries.splice(this._deliveryTourInTourSig().deliveries.findIndex((del) => del.deliveryId === delivery.deliveryId), 1)
        localStorage.setItem('tourInCourse', JSON.stringify(this.deliveryTourInTourSig()))
      })
    })
  }

  async startNextDelivery(delivery: Delivery, tourId: string) {
    const index = this.deliveryTourInTourSig().deliveries.findIndex(del => del.deliveryId === delivery.deliveryId)
    if (index < this.deliveryTourInTourSig().deliveries.length - 1) {
      await this.changeDeliveryStatus(this.deliveryTourInTourSig().deliveries[index+1], tourId, 'IN_COURSE')
    } else {
      console.log('Tour completed')
    }
  }

  async replanDelivery(delivery: Delivery, tourId: string) {
    const index = this.deliveryTourInTourSig().deliveries.findIndex(del => del.deliveryId === delivery.deliveryId)
    if (index < this.deliveryTourInTourSig().deliveries.length - 1) {
      return await this.changeDeliveryStatus(delivery, tourId, 'PLANNED').finally(() => {
        this.startNextDelivery(delivery, tourId).then(() => {
          this._deliveryTourInTourSig().deliveries.splice(index, 1)
          delivery.status = 'PLANNED'
          this._deliveryTourInTourSig.update((tour) => ({...tour, deliveries: [...this._deliveryTourInTourSig().deliveries, delivery]}))
          localStorage.setItem('tourInCourse', JSON.stringify(this.deliveryTourInTourSig()))
        })
      }).then(() => {return 0})
    }
    return 1
  }
}
