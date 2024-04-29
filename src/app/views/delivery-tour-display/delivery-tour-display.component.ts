import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {DeliveryTour} from "../../core/models/delivery-tour.models";
import {MatDivider} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {DeliveryService} from "../../shared/services/delivery.service";

@Component({
  selector: 'app-delivery-tour-display',
  standalone: true,
  imports: [
    MatDivider,
    MatCardModule,
    NgClass
  ],
  templateUrl: './delivery-tour-display.component.html',
  styleUrl: './delivery-tour-display.component.css'
})
export class DeliveryTourDisplayComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  deliveryTourSig = signal<DeliveryTour>({refTour: '', deliveries: [], truck: '',
    deliverymen: [], warehouseName: '', refDay: ''})
  deliveryTourTest : DeliveryTour = {
    refTour: 't098B-A',
    deliveries: [{deliveryId: 'l20G-A1',orders: ['C1', 'C2'], customer:'Andy BOUQUETY', customerAddress:'12, rue de la Paix'},
      {deliveryId: 'l20G-A2', orders: ['C3'], customer: 'Alessandro FARINA', customerAddress: '14, rue des Oiseaux'}],
    deliverymen : ['AWL', 'DBB'],
    truck: 'XP-907-AB',
    warehouseName: 'Algeria',
    refDay: '28 janvier 2024'
  }

  async ngOnInit() {
    this.deliveryTourSig.set(await this.deliveryService.getDeliveryTour('yacelard.racine@gmail.com'))
  }
}
