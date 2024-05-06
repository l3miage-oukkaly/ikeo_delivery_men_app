import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {DeliveryTourDisplayComponent} from "../../../views/delivery-tour-display/delivery-tour-display.component";
import {MapService} from "../../services/map.service";
import {MapComponent} from "../../../views/map/map.component";

@Component({
  selector: 'app-map-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MapComponent
  ],
  templateUrl: './map-dialog.component.html',
  styleUrl: './map-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapDialogComponent {
  mapService = inject(MapService)

  constructor(public dialogRef: MatDialogRef<DeliveryTourDisplayComponent>) {}
}
