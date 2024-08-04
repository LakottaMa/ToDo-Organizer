import { Injectable, signal, inject, computed, effect } from '@angular/core';
import { Todo } from '../models/todo.class';
import { SidenavService } from '../services/sidenavservice.service';
import { doc, collection, addDoc, Firestore, updateDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  firestore = inject(Firestore);
  isLoading = signal(false);
  public allTodos = signal<Todo[]>([]);
  readonly todosCollection = collection(this.firestore, 'allTodos');

  constructor() {
    effect(() => {
      const unsubscribe = onSnapshot(this.todosCollection, (snapshot) => {
        const todos: Todo[] = snapshot.docs.map(doc => new Todo(doc.data()));
        this.allTodos.set(todos);
        this.setLoading();
      });
      return () => unsubscribe();
    });
  }

  async addTodo(todo: Todo) {
    const docRef = await addDoc(this.todosCollection, todo);
    todo.id = docRef.id;
    await updateDoc(doc(this.todosCollection, docRef.id), { id: docRef.id });
  }

  async deleteTodo(todo: Todo) {
    await deleteDoc(doc(this.todosCollection, todo.id));
  }

  async updateTodo(todo: Todo) {
    todo.updated = new Date();
    todo.completed = todo.status === 'done' ? new Date() : todo.completed = null;
    await updateDoc(doc(this.todosCollection, todo.id), { ...todo, updated: todo.updated });
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
    }, 800);
    return this.isLoading;
  }

  getTodosByCategory(category: string) {
    return this.allTodos().filter(todo => todo.category === category).length || 0;
  }
}