import {ChangeDetectionStrategy, Component, inject, Inject, signal} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {
  BottomData,
  DeliveryTourIncourseComponent
} from "../../../views/delivery-tour-incourse/delivery-tour-incourse.component";
import {DeliveryService} from "../../services/delivery.service";

@Component({
  selector: 'app-bottom-sheet-delivery',
  standalone: true,
  imports: [],
  templateUrl: './bottom-sheet-delivery.component.html',
  styleUrl: './bottom-sheet-delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetDeliveryComponent {
  deliveryService = inject(DeliveryService)
  statusSig = signal<string>('PLANNED')

  constructor(private _bottomSheetRef: MatBottomSheetRef<DeliveryTourIncourseComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomData) {
    this.statusSig.set(this.data.delivery.status!)
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  withClient() {
    this.deliveryService.withClient(this.data.delivery, this.data.tourID).finally(() => {
      this.statusSig.set('WITH_CUSTOMER')
    })
  }

  unloading() {
    this.deliveryService.unloadingDelivery(this.data.delivery, this.data.tourID).finally(() => {
      this.statusSig.set('UNLOADING')
    })
  }

  assembly() {
    this.deliveryService.assemblyDelivery(this.data.delivery, this.data.tourID).finally(() => {
      this.statusSig.set('ASSEMBLY')
    })
  }

  complete() {
    this.deliveryService.completeDelivery(this.data.delivery, this.data.tourID).finally(() => {
      this.statusSig.set('COMPLETED')
      this._bottomSheetRef.dismiss();
    })
  }

  replan() {
    this.deliveryService.replanDelivery(this.data.delivery, this.data.tourID).then((response) => {
      if (response === 0) {
        this.statusSig.set('PLANNED')
        this._bottomSheetRef.dismiss();
      }
    })
  }

}
