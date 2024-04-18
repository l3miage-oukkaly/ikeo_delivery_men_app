import { Component, Input } from '@angular/core';
import {DeliveryTour} from "../../core/models/delivery-tour.models";
import {MatDivider} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";

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
export class DeliveryTourDisplayComponent {
  // @Input() deliveryTour! : DeliveryTour
  deliveryTourTest : DeliveryTour = {
    refTour: 't098B-A',
    deliveries: [{deliveryId: 'l20G-A1',orders: ['C1', 'C2'], customer:'Andy BOUQUETY', customerAdress:'12, rue de la Paix'},
      {deliveryId: 'l20G-A2', orders: ['C3'], customer: 'Alessandro FARINA', customerAdress: '14, rue des Oiseaux'}],
    deliveryMen : ['AWL', 'DBB'],
    truck: 'XP-907-AB',
    warehouseName: 'Algeria',
    refDay: '28 janvier 2024'
  }
}
