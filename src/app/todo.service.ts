import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Todo } from './todo';

/**
 * =========================================================================================
 * TodoService - Mock Data Persistence & State Management (Modern Angular 22)
 * =========================================================================================
 *
 * This service acts as a simulated backend and state container for Todo items.
 *
 * Key Architectural Concepts:
 *
 * 1. Signals in Services (Synchronous Reactive State):
 *    - Uses a private `signal<Todo[]>` as the single source of truth for in-memory state.
 *    - Exposes a read-only signal (`todos = this.todosSignal.asReadonly()`) so consumer components
 *      cannot mutate state directly from the outside.
 *    - Exposes derived signals using `computed()` for metrics like totalCount, completedCount, etc.
 *
 * 2. RxJS Observables for Asynchronous Streams (Backend Simulation):
 *    - Emulates network latency with RxJS `delay(500)`.
 *    - Emits updated values via `BehaviorSubject` for components using Observable pipelines.
 *
 * 3. Immutable State Updates:
 *    - Never mutate arrays in-place (`todos.push()`).
 *    - Always return new array references using spread syntax (`[...todos, newTodo]`),
 *      `map()`, or `filter()` to guarantee fine-grained change detection triggers.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Initial seed data representing persistent todos.
   */
  private readonly initialTodos: Todo[] = [
    { id: 1, title: 'Master Angular Signals and Zoneless CD', completed: true },
    { id: 2, title: 'Explore modern control flow (@if, @for, @let)', completed: true },
    { id: 3, title: 'Implement functional guards and interceptors', completed: false },
    { id: 4, title: 'Build high-performance deferrable views (@defer)', completed: false }
  ];

  /**
   * 🚦 Internal Reactive State via Signal:
   * Holds the current list of todos as a writable Signal.
   */
  private readonly todosSignal = signal<Todo[]>(this.initialTodos);

  /**
   * 🔒 Public Read-Only Signal:
   * Exposes the signal to external consumers in a read-only manner.
   */
  readonly todos = this.todosSignal.asReadonly();

  /**
   * 📊 Computed Derived Signals:
   * Automatically memoize and recalculate whenever `todosSignal` changes.
   */
  readonly totalCount = computed(() => this.todosSignal().length);
  readonly completedCount = computed(() => this.todosSignal().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.todosSignal().filter(t => !t.completed).length);

  /**
   * 📡 BehaviorSubject for Observable-based Consumers:
   * Allows components relying on RxJS streams to subscribe to state emissions.
   */
  private readonly todosSubject = new BehaviorSubject<Todo[]>(this.initialTodos);

  /**
   * Exposes the todos list as an Observable stream.
   */
  readonly todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  /**
   * Auto-incrementing identifier counter for newly created todos.
   */
  private nextId = 5;

  /**
   * Simulates fetching all todos from a backend server.
   *
   * @returns An `Observable<Todo[]>` emitting the current list of todos.
   */
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  /**
   * Simulates creating a new Todo item on the backend.
   *
   * @param title The title/description of the new todo item.
   * @returns An `Observable<Todo>` emitting the created todo with simulated network delay.
   */
  addTodo(title: string): Observable<Todo> {
    const newTodo: Todo = {
      id: this.nextId++,
      title: title.trim(),
      completed: false
    };

    return of(newTodo).pipe(
      delay(400), // Simulate 400ms network roundtrip
      tap(createdTodo => {
        // Update both the Signal state and the Subject stream immutably
        this.todosSignal.update(current => [...current, createdTodo]);
        this.todosSubject.next(this.todosSignal());
      })
    );
  }

  /**
   * Simulates updating an existing Todo (e.g., toggling completion or editing text).
   *
   * @param updatedTodo The modified Todo object to persist.
   * @returns An `Observable<Todo>` emitting the updated todo.
   */
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return of(updatedTodo).pipe(
      delay(300), // Simulate 300ms network roundtrip
      tap(item => {
        // Immutably replace the matched item
        this.todosSignal.update(current =>
          current.map(t => (t.id === item.id ? item : t))
        );
        this.todosSubject.next(this.todosSignal());
      })
    );
  }

  /**
   * Simulates deleting a Todo item from the backend by ID.
   *
   * @param id The unique identifier of the todo to delete.
   * @returns An `Observable<void>` completing after simulated network deletion.
   */
  deleteTodo(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(300), // Simulate 300ms network roundtrip
      tap(() => {
        // Immutably filter out the deleted item
        this.todosSignal.update(current => current.filter(t => t.id !== id));
        this.todosSubject.next(this.todosSignal());
      })
    );
  }
}

