import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidenavService {
  readonly isSidenavOpen = signal(true);
  readonly activeComponent = signal(<string | null>(null));

  toggleSidenav() {
    this.isSidenavOpen.set(!this.isSidenavOpen());
  }

  setActiveComponent(componentName: string) {
    this.activeComponent.set(componentName);
  }
}