import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../shared/services/sidenavservice.service';
import { NewtodoComponent } from '../newtodo/newtodo.component';
import { PrivatetodoComponent } from '../privatetodo/privatetodo.component';
import { StudytodoComponent } from '../studytodo/studytodo.component';
import { WorktodoComponent } from '../worktodo/worktodo.component';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, DashboardComponent, PrivatetodoComponent, StudytodoComponent, WorktodoComponent, CommonModule, MatSidenavModule, MatIconModule, MatButtonModule, NewtodoComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss',
})
export class MainpageComponent implements OnInit {
  sidenavService = inject(SidenavService)

  constructor() { }

  ngOnInit(): void {
    this.sidenavService.setActiveComponent('dashboard');
   }

}
