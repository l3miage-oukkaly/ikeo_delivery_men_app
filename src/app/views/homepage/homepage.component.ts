import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DeliveryService} from "../../shared/services/delivery.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  emailSig = signal<string>("")
  private deliveryService = inject(DeliveryService)

  submitForm() {
    // this.deliveryService.getDeliveryTour(this.emailSig())

  }
}
