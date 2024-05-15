import {Component, inject, OnInit, signal} from '@angular/core';
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
import {NoTourDialogComponent} from "../../shared/components/no-tour-dialog/no-tour-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-delivery-tour-display',
  standalone: true,
  imports: [
    MatDivider,
    MatCardModule,
    NgClass,
    MapComponent,
    RouterLink,
    TitleCasePipe,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './delivery-tour-display.component.html',
  styleUrl: './delivery-tour-display.component.css'
})
export class DeliveryTourDisplayComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  dialog = inject(MatDialog)
  authService = inject(AuthService)
  tourIsPlannedSig = signal<boolean>(false)
  tourIsStartedSig = signal<boolean>(false)

  async ngOnInit() {
    this.deliveryService.getDeliveryTour(this.authService.getMail()).then(() => {
      this.tourIsPlannedSig.set(true)
      this.checkStorageForStartedTour()
    }, (error) => {
      if (error.status === 404) {
        this.openNoTourDialog('0ms', '0ms')
      } else {
        console.error(error)
      }})
  }

  openMapDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(MapDialogComponent, {
      width: 90 + 'vw',
      height: 90 + 'vh',
      maxHeight: 90 + 'vh',
      maxWidth: 90 + 'vw',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openNoTourDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NoTourDialogComponent, {
      width: 300 + 'px',
      height: 200 + 'px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  emptyLocalStorage() {
    localStorage.clear()
    this.tourIsStartedSig.set(false)
  }

  tryToLoadTour() {
    this.deliveryService.getDeliveryTour(this.authService.getMail()).then(() => {
      this.tourIsPlannedSig.set(true)
    }, (error) => {
      if (error.status === 404) {
        this.openNoTourDialog('0ms', '0ms')
      }
    })
  }

  checkStorageForStartedTour() {
    if (localStorage.getItem('tourInCourse')) {
      this.tourIsStartedSig.set(true)
    }
  }
}
