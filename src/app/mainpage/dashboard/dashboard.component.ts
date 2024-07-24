import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../../shared/todolist/todolist.component';
import { TodoService } from '../../shared/services/todo.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TodolistComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  todoService = inject(TodoService)

}
