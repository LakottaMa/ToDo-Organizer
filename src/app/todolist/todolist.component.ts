import { Component, inject, ChangeDetectionStrategy, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../shared/services/todo.service';
import { SidenavService } from '../shared/services/sidenavservice.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../shared/models/todo';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    CommonModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodolistComponent {
  todoService = inject(TodoService);
  sidenavService = inject(SidenavService);
  fb = inject(FormBuilder);
  todos = this.todoService.getTodos();
  editForms: { [id: number]: FormGroup } = {};

  constructor() {
    this.todos().forEach(todo => {
      this.editForms[todo.id!] = this.fb.group({
        title: [todo.title],
        description: [todo.description],
        dueDate: [todo.dueDate],
        priority: [todo.priority],
        category: [todo.category],
        status: [todo.status],
      });
    });
  }

  onUpdate(todo: Todo) {
    const updatedTodo: Todo = { ...todo, ...this.editForms[todo.id!].value };
    this.todoService.updateTodo(updatedTodo);
    this.sidenavService.setActiveComponent(updatedTodo.category);
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id!);
  }
}
