import { Injectable, signal, inject, computed, effect } from '@angular/core';
import { Todo } from '../models/todo.class';
import { SidenavService } from '../services/sidenavservice.service';
import { Timestamp } from '@angular/fire/firestore';
import { doc, collection, addDoc, Firestore, updateDoc, deleteDoc, onSnapshot, CollectionReference } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  firestore = inject(Firestore);
  readonly isLoading = signal(false);
  private todosCollection = collection(this.firestore, 'allTodos') as CollectionReference<Todo>;
  public allTodos = signal<Todo[]>([]);

  constructor() {
    effect(() => {
      const unsubscribe = onSnapshot(this.todosCollection, (snapshot) => {
        const todos: Todo[] = snapshot.docs.map(doc => new Todo(doc.data()));
        this.allTodos.set(todos);
      });
      return () => unsubscribe();
    });
  }

  async addTodo(todo: Todo) {
    await addDoc(this.todosCollection, todo);
  }

  async deleteTodo(todo: Todo) {
    await deleteDoc(doc(this.todosCollection, todo.id));
  }

  async updateTodo(todo: Todo) {
    await updateDoc(doc(this.todosCollection, todo.id), { ...todo, updated: Timestamp.now() });
    this.sidenavService.setActiveComponent(todo.category);
  }

  filteredTodos = computed(() => {
    const activeCategory = this.sidenavService.activeComponent();
    const allTodos = this.allTodos();
    console.log('filtered', allTodos);
    return allTodos.filter(todo => todo.category === activeCategory || activeCategory === 'dashboard');
  });

  setLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
    return this.isLoading;
  }

  privateTodosAmaount() {
    return this.allTodos().filter(todo => todo.category === 'private').length;
  }

  studyTodosAmaount() {
    return this.allTodos().filter(todo => todo.category === 'study').length;
  }

  workTodosAmaount() {
    return this.allTodos().filter(todo => todo.category === 'work').length;
  }

}