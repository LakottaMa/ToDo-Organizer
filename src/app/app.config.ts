import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Environment } from '../../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({"projectId":"todoorganizser",
      "appId":"1:941220846947:web:708cec52548ce0c0c2c756",
      "storageBucket":"todoorganizser.appspot.com",
      "apiKey": Environment.API_KEY,
      "authDomain":"todoorganizser.firebaseapp.com",
      "messagingSenderId":"941220846947"})),
      provideFirestore(() => getFirestore())
  ]
};
