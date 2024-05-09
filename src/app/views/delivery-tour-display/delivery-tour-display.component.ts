import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {DeliveryTour} from "../../core/models/delivery-tour.models";
import {MatDivider} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {DeliveryService} from "../../shared/services/delivery.service";
import {MapComponent} from "../map/map.component";
import {MapService} from "../../shared/services/map.service";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MapDialogComponent} from "../../shared/components/map-dialog/map-dialog.component";
import {AuthService} from "../../shared/services/auth.service";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-delivery-tour-display',
  standalone: true,
  imports: [
    MatDivider,
    MatCardModule,
    NgClass,
    MapComponent,
    RouterLink
  ],
  templateUrl: './delivery-tour-display.component.html',
  styleUrl: './delivery-tour-display.component.css'
})
export class DeliveryTourDisplayComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  dialog = inject(MatDialog)
  authService = inject(AuthService)
  deliveryTourSig = signal<DeliveryTour>({refTour: '', deliveries: [], truck: '',
    deliverymen: [], warehouseName: '', refDay: ''})

  async ngOnInit() {
    await this.deliveryService.getDeliveryTour('yacelard.racine@gmail.com').then((deliveryTour) => {
      this.deliveryTourSig.set(deliveryTour)
      this.mapService.setDeliveries(deliveryTour.deliveries)
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(MapDialogComponent, {
      width: 90 + 'vw',
      height: 90 + 'vh',
      maxHeight: 90 + 'vh',
      maxWidth: 90 + 'vw',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  protected readonly user = user;
}
