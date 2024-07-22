import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { DashboardComponent } from "../shared/components/dashboard/dashboard.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../shared/services/sidenavservice.service';
import { NewtodoComponent } from "../shared/components/newtodo/newtodo.component";

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, DashboardComponent, CommonModule, MatSidenavModule, MatIconModule, MatButtonModule, NewtodoComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent implements OnInit {
  sidenavService = inject(SidenavService)

  constructor() { }

  ngOnInit(): void {
    this.sidenavService.setActiveComponent('dashboard');
   }

}
