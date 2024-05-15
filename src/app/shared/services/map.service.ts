import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {Delivery} from "../../core/models/delivery.models";
import {LatLngTuple} from "leaflet";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {DeliveryTour} from "../../core/models/delivery-tour.models";

export const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Injectable({
  providedIn: 'root'
})
export class MapService {
  routes!: any;
  private _sigCoords = signal<LatLngTuple[]>([]);
  sigCoords = computed<LatLngTuple[]>(() => this._sigCoords());

  constructor(private http: HttpClient) {
  }

  formatAddress(delivery: Delivery): string {
    const address = delivery.customerAddress.split('|')
    address.splice(1, 1)
    return address.join(', ')
  }

  formatClientName(delivery: Delivery): string {
    return delivery.customer[0].toUpperCase() + delivery.customer.slice(1)
  }

  //From an array of deliveries, initialize markers and set up an array of coordinates (signal).
  //From the array of coordinates, initialize the routes.
  //RO can easily be plugged in between.
  mapLayersInit(map: L.Map, deliveries: Delivery[]) {
    Promise.all(deliveries.map(async (delivery) => await this.addressToCoords(map, delivery))).then((coords) => {
      this._sigCoords.update(() => coords)
      this.requestRoutes(this.sigCoords()).subscribe(routes => {
        this.routes = routes
        this.initRoutesLayer(map)
      })
    })
  }

  testLayersInit(map: L.Map, deliveryTour: DeliveryTour) {
    this._sigCoords.set([[deliveryTour.coordinates[1], deliveryTour.coordinates[0]]])
    deliveryTour.deliveries.map((delivery) => {
      this._sigCoords.update((coords) => [...coords, [delivery.coordinates[1], delivery.coordinates[0]]])
    })
    this.requestRoutes(this.sigCoords()).subscribe(routes => {
      this.routes = routes
      this.initRoutesLayer(map)
      this.initAllMarkers(map, deliveryTour)
    })
  }

  async addressToCoords(map: L.Map, delivery: Delivery) {
    return await firstValueFrom(this.http.get("https://api-adresse.data.gouv.fr/search/?q="+encodeURIComponent(delivery.customerAddress)+"&limit=1")).then((res:any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[1]
        const lon = c.geometry.coordinates[0]
        // this.initMarker([lat, lon], map, delivery)
      }
      return [res.features[0].geometry.coordinates[0], res.features[0].geometry.coordinates[1]] as LatLngTuple
    })
  }

  requestRoutes(coords: LatLngTuple[]) {
    return this.http.post("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {'coordinates':coords},
      {headers: {'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          'Authorization': '5b3ce3597851110001cf6248941cf3dd3298435b825d39a1afde6112',
          'Content-Type': 'application/json; charset=utf-8'
        }})
  }

  initRoutesLayer(map: L.Map) {
    const routesLayer = L.geoJSON(this.routes, {
      style: (feature) => ({
        weight: 3,
        opacity: 1,
        color: 'purple',
        fillOpacity: 0.8,
        fillColor: 'black'
      })
    });
    map.addLayer(routesLayer);
  }

  initMarker(map: L.Map, delivery: Delivery) {
    const marker = L.marker(delivery.coordinates!)
    marker.bindPopup(this.makePopup(delivery))
    marker.addTo(map)
  }

  initAllMarkers(map: L.Map, deliveryTour: DeliveryTour) {
    this.initWarehouseMarker(map, deliveryTour)
    deliveryTour.deliveries.map((delivery) => this.initMarker(map, delivery))
  }

  initWarehouseMarker(map: L.Map, deliveryTour: DeliveryTour) {
    const marker = L.marker(deliveryTour.coordinates, {icon: greenIcon})
    marker.bindPopup(this.makeWarehousePopup(deliveryTour))
    marker.addTo(map)
  }

  makeWarehousePopup(deliveryTour: DeliveryTour): string {
    return ``+
      `<h4 style="text-align: center;">Entrepôt ${ deliveryTour.warehouseName }</h4>`
  }

  makePopup(delivery: Delivery): string {
    return ``+
      `<h4 style="text-align: center;">Livraison : ${ delivery.deliveryId }</h4>` +
      `<div><u>Client:</u> ${ this.formatClientName(delivery) }</div>` +
      `<div><u>Adresse:</u> ${ this.formatAddress(delivery) }</div>`
  }

}
