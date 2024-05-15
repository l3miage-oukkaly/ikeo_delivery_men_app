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
    NgClass
  ],
  templateUrl: './delivery-tour-incourse.component.html',
  styleUrl: './delivery-tour-incourse.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryTourIncourseComponent implements OnInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  dialog = inject(MatDialog)

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(delivery: Delivery): void {
    this._bottomSheet.open(BottomSheetDeliveryComponent, {data: {delivery, tourID: this.deliveryService.deliveryTourInTourSig().refTour}});
  }

  async ngOnInit() {
    await this.deliveryService.startDeliveryTour()
  }
}
