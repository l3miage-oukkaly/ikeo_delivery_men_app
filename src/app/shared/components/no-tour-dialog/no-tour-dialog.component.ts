import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {DeliveryTourDisplayComponent} from "../../../views/delivery-tour-display/delivery-tour-display.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-no-tour-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './no-tour-dialog.component.html',
  styleUrl: './no-tour-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoTourDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeliveryTourDisplayComponent>) {}
}
