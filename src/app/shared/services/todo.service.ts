import { Injectable, signal, inject, computed, WritableSignal } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { SidenavService } from '../services/sidenavservice.service';
import { doc, collection, addDoc, Firestore, updateDoc, getDocs, deleteDoc, onSnapshot, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  sidenavService = inject(SidenavService);
  firestore = inject(Firestore);
  readonly isLoading = signal(false);
  allTodos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  constructor() {
    onSnapshot(this.refTodos(), snapshot => {
      const updatedTodos = snapshot.docs.map(doc => this.convertFirestoreDocToTodo(doc.data()));
      this.allTodos.set(updatedTodos);
    });
  }

  private convertFirestoreDocToTodo(doc: any): Todo {
    return {
      ...doc,
      dueDate: doc.dueDate ? doc.dueDate.toDate() : null,
    };
  }

  refTodos() {
    return collection(this.firestore, 'allTodos');
  }

  async addTodo(todo: Todo) {
    const docRef = await addDoc(this.refTodos(), todo);
    await updateDoc(doc(this.refTodos(), docRef.id), { id: docRef.id });
    console.table(this.allTodos());
  }

  async deleteTodo(todo: Todo) {
    await deleteDoc(doc(this.refTodos(), todo.id));
    console.table(this.allTodos());
  }

  async updateTodo(todo: Todo) {
    await updateDoc(doc(this.refTodos(), todo.id), { ...todo });
    console.table(this.allTodos());
  }


  filteredTodos = computed(() => {
    const activeCategory = this.sidenavService.activeComponent();
    const allTodos = this.allTodos();
    if (activeCategory === null || activeCategory === 'dashboard') {
      return allTodos;
    } else {
      return allTodos.filter(todo => todo.category === activeCategory);
    }
  });

  setLoading() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
    return this.isLoading;
  }
}