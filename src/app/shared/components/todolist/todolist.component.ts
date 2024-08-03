import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.class';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodolistComponent {
  todoService = inject(TodoService);
}