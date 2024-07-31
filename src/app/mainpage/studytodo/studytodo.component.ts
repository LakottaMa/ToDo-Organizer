import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../../shared/components/todolist/todolist.component';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-studytodo',
  standalone: true,
  imports: [ CommonModule, TodolistComponent ],
  templateUrl: './studytodo.component.html',
  styleUrl: './studytodo.component.scss'
})
export class StudytodoComponent {
  todoService = inject(TodoService)

}
