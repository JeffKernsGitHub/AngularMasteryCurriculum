# Angular HttpClient Demo

This project demonstrates how to use the `HttpClient` service in a Zoneless Angular 21 application. It showcases handling asynchronous data using `forkJoin` and `iif` from RxJS, with a focus on type safety, modern RxJS practices, and error handling. Additionally, it introduces a new component (`DataManipulatorComponent`) to illustrate CRUD operations (Create, Read, Update, Delete) using Angular Signals and a mock API service.

## Key Concepts

### Zoneless Angular

This application is configured to run without Zone.js, which is a key part of Angular's evolution towards better performance and simpler change detection.

**Example: `app.config.ts`**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

When running without Zone.js, you must manually trigger change detection for asynchronous operations that are not handled by the `async` pipe or Angular Signals.

**Example: `data-loader.component.ts` (Manual Change Detection)**

```typescript
import { ChangeDetectorRef } from '@angular/core';

// ...

constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

// ...

catchError(err => {
  this.error = 'Failed to load data. Please try again later.';
  console.error(err);
  this.cdr.markForCheck(); // Manually trigger change detection
  return EMPTY;
})
```

### Global Styles

Angular applications typically use a global stylesheet (e.g., `styles.scss`). Modern Sass prefers the `@use` syntax over the deprecated `@import` for including other style files.

**Example: `styles.scss`**

```scss
/* You can add global styles to this file, and also import other style files */
@use './app/app.scss';
```

### Type Safety

To ensure type safety and prevent common template errors, we define interfaces for our data models.

**Example: `post.ts`, `user.ts`, and `todo.ts`**

```typescript
// src/app/post.ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// src/app/user.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// src/app/todo.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

### HttpClient (for DataLoaderComponent)

The `HttpClient` service in Angular allows you to perform HTTP requests to a server.

**Example: `api.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
```

### TodoService (Mock API for DataManipulatorComponent)

This service provides a mock API for CRUD operations on `Todo` items, simulating network requests with `delay` and managing state using a `BehaviorSubject`.

**Example: `todo.service.ts`**

```typescript
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
  private nextId = 4;

  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() { }

  addTodo(title: string): Observable<Todo> {
    const newTodo: Todo = { id: this.nextId++, title, completed: false };
    return of(newTodo).pipe(
      delay(500),
      tap(todo => {
        const currentTodos = this.todosSubject.getValue();
        this.todosSubject.next([...currentTodos, todo]);
      })
    );
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return of(updatedTodo).pipe(
      delay(500),
      tap(todo => {
        const currentTodos = this.todosSubject.getValue();
        const updatedTodos = currentTodos.map(t => (t.id === todo.id ? todo : t));
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      tap(() => {
        const currentTodos = this.todosSubject.getValue();
        const filteredTodos = currentTodos.filter(t => t.id !== id);
        this.todosSubject.next(filteredTodos);
      })
    );
  }
}
```

### DataManipulatorComponent (CRUD with Signals)

This component demonstrates how to perform Create, Read, Update, and Delete operations using the `TodoService`. It leverages Angular Signals for efficient and reactive state management, which is particularly beneficial in Zoneless applications.

**Example: `data-manipulator.component.ts`**

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data-manipulator',
  standalone: true,
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush // Essential for Zoneless
})
export class DataManipulatorComponent {
  todos = signal<Todo[]>([]); // Signal to hold the list of todos
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {
    this.todoService.todos$
      .pipe(takeUntilDestroyed())
      .subscribe(todos => {
        this.todos.set(todos); // Update the signal
        this.cdr.markForCheck(); // Manually trigger change detection
      });
  }

  addTodo(): void { /* ... */ }
  toggleCompleted(todo: Todo): void { /* ... */ }
  deleteTodo(id: number): void { /* ... */ }
}
```

### Error Handling

Real-world applications should gracefully handle exceptions. We can use the `catchError` operator from RxJS to catch and handle errors during API calls.

**Example: `data-loader.component.ts`**

```typescript
import { catchError, EMPTY } from 'rxjs';

// ...

this.data$ = of(this.shouldFetchPosts).pipe(
  switchMap(shouldFetch =>
    iif(
      () => shouldFetch,
      forkJoin([
        this.apiService.getPosts(),
        this.apiService.getUsers()
      ]).pipe(
        map(([posts, users]) => ({ posts, users })),
        catchError(err => {
          this.error = 'Failed to load data. Please try again later.';
          console.error(err);
          this.cdr.markForCheck();
          return EMPTY;
        })
      ),
      of({ posts: [], users: [] })
    )
  )
);
```

### `forkJoin` (for DataLoaderComponent)

`forkJoin` is an RxJS operator that allows you to wait for multiple Observables to complete. The modern syntax uses an array of Observables and returns an array of their results.

### `iif` (for DataLoaderComponent)

`iif` is an RxJS operator that conditionally chooses between two Observables. If the condition is true, it subscribes to the first Observable; otherwise, it subscribes to the second.

### Async Pipe and `@for`

The `async` pipe subscribes to an Observable and returns its latest value. When the component is destroyed, the `async` pipe automatically unsubscribes. In a Zoneless application, the `async` pipe also handles triggering change detection when the Observable emits a new value. The `@for` syntax provides an efficient way to render lists.

**Example: `data-loader.component.html`**

```html
@if (data$ | async; as data) {
  <div>
    <h2>Posts</h2>
    <ul>
      @for (post of data.posts | slice:0:10; track post.id) {
        <li>{{ post.title }}</li>
      }
    </ul>
    <!-- ... -->
  </div>
}
```

### Routing and Navigation

The application uses Angular's router to navigate between different components. A simple navigation bar is provided in `app.html`.

**Example: `app.routes.ts`**

```typescript
import { Routes } from '@angular/router';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { DataManipulatorComponent } from './data-manipulator/data-manipulator.component';

export const routes: Routes = [
  { path: '', redirectTo: '/data-loader', pathMatch: 'full' },
  { path: 'data-loader', component: DataLoaderComponent },
  { path: 'data-manipulator', component: DataManipulatorComponent }
];
```

**Example: `app.html` (Navigation Bar)**

```html
<header>
  <h1>Angular Mastery</h1>
  <nav>
    <a routerLink="/data-loader" routerLinkActive="active">Data Loader</a>
    <a routerLink="/data-manipulator" routerLinkActive="active">Data Manipulator</a>
  </nav>
</header>
<main>
  <router-outlet />
</main>
```
