import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../todolist/todolist.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TodolistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
