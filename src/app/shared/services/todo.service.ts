import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private nextId = 1;
  todos = signal<Todo[]>([]);

  private generateId(): number {
    let id = this.nextId++;
    while (this.todos().some(todo => todo.id === id)) {
      id = this.nextId++;
    }
    return id;
  }

  addTodo(todo: Todo) {
    todo.id = this.generateId();
    this.todos.set([...this.todos(), todo]);
    // In a real app, save to a database or local storage
  }

  getTodos() {
    return this.todos;
  }

  updateTodo(todo: Todo) {
    this.todos.update(todos => todos.map(t => t.id === todo.id ? todo : t));
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}
