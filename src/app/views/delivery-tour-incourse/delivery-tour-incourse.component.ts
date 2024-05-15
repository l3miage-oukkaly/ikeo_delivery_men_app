import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgClass, TitleCasePipe} from "@angular/common";
import {DeliveryService} from "../../shared/services/delivery.service";
import {MapService} from "../../shared/services/map.service";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  BottomSheetDeliveryComponent
} from "../../shared/components/bottom-sheet-delivery/bottom-sheet-delivery.component";
import {Delivery} from "../../core/models/delivery.models";
import {MatIcon} from "@angular/material/icon";
import {MapDialogComponent} from "../../shared/components/map-dialog/map-dialog.component";

export interface BottomData {
  delivery: Delivery,
  tourID: string
}

@Component({
  selector: 'app-delivery-tour-incourse',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    TitleCasePipe,
    NgClass,
    MatIcon
  ],
  templateUrl: './delivery-tour-incourse.component.html',
  styleUrl: './delivery-tour-incourse.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryTourIncourseComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  dialog = inject(MatDialog)

  constructor(private _bottomSheet: MatBottomSheet) {
    window.scroll(0, 0);
  }

  openBottomSheet(delivery: Delivery): void {
    this._bottomSheet.open(BottomSheetDeliveryComponent, {data: {delivery, tourID: this.deliveryService.deliveryTourInTourSig().refTour}});
  }

  async ngOnInit() {
    await this.deliveryService.startDeliveryTour()
    window.scroll(0, 0);
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
}
