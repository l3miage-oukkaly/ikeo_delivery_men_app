import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), DatePipe, importProvidersFrom(provideAuth(() => getAuth())),
  provideAnimations(), provideAnimationsAsync(), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"projet-integrateur-miage-g08","appId":"1:60690128346:web:e2dea6334cc53b53def4e3","storageBucket":"projet-integrateur-miage-g08.appspot.com","apiKey":"AIzaSyBmdkFsMV3403xQd17RVHZcBPzeWt7YISA","authDomain":"projet-integrateur-miage-g08.firebaseapp.com","messagingSenderId":"60690128346","measurementId":"G-F62C1ECVW9"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFunctions(() => getFunctions()))]
};
