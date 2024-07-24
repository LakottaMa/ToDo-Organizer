import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from '../../shared/todolist/todolist.component';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-worktodo',
  standalone: true,
  imports: [ CommonModule, TodolistComponent],
  templateUrl: './worktodo.component.html',
  styleUrl: './worktodo.component.scss'
})
export class WorktodoComponent {
  todoService = inject(TodoService)

}
