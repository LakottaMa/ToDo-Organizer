import { Injectable, signal, inject, computed } from '@angular/core';
import { Todo } from '../models/todo';
import { SidenavService } from '../services/sidenavservice.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  private nextId = 1;
  readonly isLoading = signal(false);
  todos = signal<Todo[]>([]);

  /**
   * Generates a unique ID for a new todo item.
   * @return {number} The generated unique ID.
   */
  private generateId(): number {
    let id = this.nextId++;
    while (this.todos().some(todo => todo.id === id)) {
      id = this.nextId++;
    }
    return id;
  }

  /**
   * Sets the loading state to true, and after 1 second, sets it back to false,
   * to simulate a real API call and showing the progress bar.
   * @return signal<boolean>
   */
  setLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
    return this.isLoading;
  }

  /**
   * Add a new todo item to the list of todos.
   * @param {Todo} todo - The todo item to be added.
   */
  addTodo(todo: Todo) {
    todo.id = this.generateId();
    this.todos.set([...this.todos(), todo]);
    // In a real app, save to a database or local storage
  }

  /**
   * Retrieves the list of todos.
   * @return {Signal<Todo[]>} The list of todos.
   */
  getTodos() {
    return this.todos;
  }

  /**
   * Updates the todo item in the list of todos.
   * @param {Todo} todo - The updated todo item.
   */
  updateTodo(todo: Todo) {
    this.todos.update(todos => todos.map(t => t.id === todo.id ? todo : t));
  }

  /**
   * Deletes a todo item from the list of todos based on the provided ID.
   * @param {number} id - The ID of the todo item to be deleted.
   */
  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  /**
   * Filters the list of todos based on the active category.
   * @return {Signal<Todo[]>} The filtered list of todos.
   */
  filteredTodos = computed(() => {
    const activeCategory = this.sidenavService.activeComponent();
    const allTodos = this.todos();
    if (activeCategory === null || activeCategory === 'dashboard') {
      return allTodos;
    } else {
      return allTodos.filter(todo => todo.category === activeCategory);
    }
  });
}
