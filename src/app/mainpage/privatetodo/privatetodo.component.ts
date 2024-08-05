import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../../shared/components/todolist/todolist.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-privatetodo',
  standalone: true,
  imports: [CommonModule, TodolistComponent, MatTabsModule, MatBadgeModule],
  templateUrl: './privatetodo.component.html',
  styleUrl: './privatetodo.component.scss'
})
export class PrivatetodoComponent {
  todoService = inject(TodoService);

  constructor() {
    this.todoService.onTabChangeOfTodoState({tab: {textLabel: 'Pending'}} as MatTabChangeEvent);
  }


}