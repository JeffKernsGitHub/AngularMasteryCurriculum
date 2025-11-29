import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from './todo';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([
    { id: 1, title: 'Learn Angular Signals', completed: false },
    { id: 2, title: 'Build a Zoneless App', completed: true },
    { id: 3, title: 'Refactor old components', completed: false }
  ]);
  private nextId = 4; // For new todos

  // Expose the todos as an Observable
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() { }

  // Simulate fetching all todos
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  // Simulate adding a new todo
  addTodo(title: string): Observable<Todo> {
    const newTodo: Todo = {
      id: this.nextId++,
      title,
      completed: false
    };
    // Simulate API delay and update the subject
    return of(newTodo).pipe(
      delay(500), // Simulate network latency
      tap(todo => {
        const currentTodos = this.todosSubject.getValue();
        this.todosSubject.next([...currentTodos, todo]);
      })
    );
  }

  // Simulate updating an existing todo
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    // Simulate API delay and update the subject
    return of(updatedTodo).pipe(
      delay(500), // Simulate network latency
      tap(todo => {
        const currentTodos = this.todosSubject.getValue();
        const updatedTodos = currentTodos.map(t => (t.id === todo.id ? todo : t));
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  // Simulate deleting a todo
  deleteTodo(id: number): Observable<void> {
    // Simulate API delay and update the subject
    return of(void 0).pipe( // void 0 is a concise way to get `undefined`
      delay(500), // Simulate network latency
      tap(() => {
        const currentTodos = this.todosSubject.getValue();
        const filteredTodos = currentTodos.filter(t => t.id !== id);
        this.todosSubject.next(filteredTodos);
      })
    );
  }
}
