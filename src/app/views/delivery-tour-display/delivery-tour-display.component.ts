import {Component, inject, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {NgClass, TitleCasePipe} from "@angular/common";
import {DeliveryService} from "../../shared/services/delivery.service";
import {MapComponent} from "../map/map.component";
import {MapService} from "../../shared/services/map.service";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MapDialogComponent} from "../../shared/components/map-dialog/map-dialog.component";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-delivery-tour-display',
  standalone: true,
  imports: [
    MatDivider,
    MatCardModule,
    NgClass,
    MapComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './delivery-tour-display.component.html',
  styleUrl: './delivery-tour-display.component.css'
})
export class DeliveryTourDisplayComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  dialog = inject(MatDialog)
  authService = inject(AuthService)

  async ngOnInit() {
    await this.deliveryService.getDeliveryTour('citebmaruj@gmail.com')
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

  emptyLocalStorage() {
    localStorage.clear()
  }
}
