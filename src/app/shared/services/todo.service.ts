import { Injectable, signal, inject, computed, effect } from '@angular/core';
import { Todo } from '../models/todo.class';
import { SidenavService } from '../services/sidenavservice.service';
import { doc, collection, addDoc, Firestore, updateDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  firestore = inject(Firestore);
  isLoading = signal(false);
  public activeStateTab = signal(<string | null>(null));
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

  setActiveState(stateName: string) {
    this.activeStateTab.set(stateName);
  }

  onTabChangeOfTodoState(event: MatTabChangeEvent) {
    this.setActiveState(event.tab.textLabel.toLowerCase());
  }

  filteredTodos = computed(() => {
    const activeCategory = this.sidenavService.activeComponent();
    const activeState = this.activeStateTab();
    let filteredTodos = this.allTodos().filter(todo =>
      activeCategory ? todo.category === activeCategory : true
    );
    filteredTodos = filteredTodos.filter(todo =>
      activeState ? todo.status === activeState : true
    );
    return filteredTodos;
  });

  setLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
    return this.isLoading;
  }

  getAmountTodos(category: string) {
    return this.allTodos().filter(todo => todo.category === category).length || 0;
  }
}