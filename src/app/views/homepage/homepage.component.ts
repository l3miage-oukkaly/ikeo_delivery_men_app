import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DeliveryService} from "../../shared/services/delivery.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  emailSig = signal<string>("")
  private deliveryService = inject(DeliveryService)
  private router = inject(Router)

  submitForm() {
    // this.deliveryService.getDeliveryTour(this.emailSig())
    this.router.navigate(['/delivery-tour'])
  }
}
