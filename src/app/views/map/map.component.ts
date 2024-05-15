import {AfterViewInit, ChangeDetectionStrategy, Component, inject} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "../../shared/services/map.service";
import {DeliveryService} from "../../shared/services/delivery.service";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {
  deliveryService = inject(DeliveryService)
  mapService = inject(MapService)
  private map!: L.Map

  constructor() {}

  ngAfterViewInit() {
    this.initMap()
  }

  initMap() {
    this.map = L.map('map', {
      center: [ 45.16667, 5.71667 ],
      zoom: 12
    })
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.mapService.mapSetup(this.map, this.deliveryService.deliveryTourSig())
  }


}
