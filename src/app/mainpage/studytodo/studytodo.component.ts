import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { TodolistComponent } from '../../shared/components/todolist/todolist.component';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-studytodo',
  standalone: true,
  imports: [ CommonModule, MatTabsModule, TodolistComponent ],
  templateUrl: './studytodo.component.html',
  styleUrl: './studytodo.component.scss'
})
export class StudytodoComponent {
  todoService = inject(TodoService)

  constructor() {
    this.todoService.onTabChangeOfTodoState({tab: {textLabel: 'Pending'}} as MatTabChangeEvent);
  }

}
