import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DeliveryService} from "../../shared/services/delivery.service";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, RouterLink, MatProgressSpinner],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
}
