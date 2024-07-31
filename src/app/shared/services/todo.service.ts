import { Injectable, signal, inject, computed } from '@angular/core';
import { Todo } from '../models/todo';
import { SidenavService } from '../services/sidenavservice.service';
import { doc, collection, addDoc, Firestore, updateDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  firestore = inject(Firestore);
  readonly isLoading = signal(false);
  todos = signal<Todo[]>([]);

  constructor() {
  }

  async loadTodos() {
    const collectionNames = ['todos/private/todosPRIVATE', 'todos/study/todosSTUDY', 'todos/work/todosWORK'];
    const todos: Todo[] = [];
    for (const collectionName of collectionNames) {
      const todoCollection = collection(this.firestore, collectionName);
      const querySnapshot = await getDocs(todoCollection);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        todos.push({ id: doc.id, ...data, dueDate: data['dueDate'].toDate() } as Todo);
      });
    }
    console.log('Loaded todos from Firestore:', todos);
    this.todos.set(todos);
    return this.todos;
  }

  setLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
    return this.isLoading;
  }

  async addTodo(todo: Todo) {
    const docRef = await addDoc(collection(this.firestore, 'todos', todo.category, 'todos' + todo.category.toUpperCase()), todo);
    await updateDoc(doc(this.firestore, 'todos', todo.category, 'todos' + todo.category.toUpperCase(), docRef.id), { id: docRef.id });
    this.todos.update(todos => [...todos, { ...todo, id: docRef.id }]);
    console.log('added', this.todos());
  }

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
