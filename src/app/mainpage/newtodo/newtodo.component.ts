import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { TodoService } from '../../shared/services/todo.service';
import { SidenavService } from '../../shared/services/sidenavservice.service';
import { Todo } from '../../shared/models/todo';

@Component({
  selector: 'app-newtodo',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonModule,
    MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, TextFieldModule
  ],
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.scss'],
})

export class NewtodoComponent {
  todoService = inject(TodoService);
  sidenavService = inject(SidenavService);
  fb = inject(FormBuilder);
  todoForm: FormGroup;

  constructor() {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
      dueDate: [null || new Date()],
      priority: ['low'],
      category: ['private'],
      status: ['pending'],
    });
  }

  onSubmit() {
    const newTodo: Todo = this.todoForm.value;
    if (this.todoForm.valid) {
      this.todoService.addTodo(newTodo);
    }
    this.onReset();
    if (this.todoService.setLoading()) {
      this.sidenavService.setActiveComponent(newTodo.category);
    }
  }

  onReset() {
    this.todoForm.reset();
  }
}
