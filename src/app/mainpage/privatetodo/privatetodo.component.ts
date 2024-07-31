import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../../shared/components/todolist/todolist.component';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-privatetodo',
  standalone: true,
  imports: [ CommonModule, TodolistComponent ],
  templateUrl: './privatetodo.component.html',
  styleUrl: './privatetodo.component.scss'
})
export class PrivatetodoComponent {
  todoService = inject(TodoService)

}
