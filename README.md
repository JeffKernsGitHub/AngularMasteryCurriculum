# Angular Mastery Curriculum: Modern Angular 22 Reference Guide

Welcome to the **Angular Mastery Curriculum** project! This repository is a comprehensive, production-ready educational reference designed to demonstrate the core architecture, reactive primitives, asynchronous pipelines, and performance optimizations of **Modern Angular 22**.

---

## 🎯 Key Learning Objectives

* **Native Zoneless Change Detection (`provideZonelessChangeDetection`)**: Building high-performance web applications without `Zone.js` overhead.
* **Idiomatic Dependency Injection (`inject()`)**: Eliminating constructor boilerplate and utilizing injection contexts.
* **Angular Signals & Computed State (`signal`, `computed`)**: Synchronous, fine-grained reactivity and memoized state derivations.
* **Modern Control Flow (`@if`, `@for`, `@empty`, `@switch`, `@let`)**: Native block syntax and local template variables.
* **Modern Routing (`loadComponent`, `withComponentInputBinding`)**: On-demand chunk lazy loading and route param signal binding.
* **Advanced Asynchronous Pipelines (RxJS + Fetch)**: Leveraging `forkJoin`, `iif`, `switchMap`, `catchError`, and the `async` pipe with `withFetch()`.
* **Clean Architecture & Separation of Concerns (SoC)**: Isolating persistence and business logic inside strongly typed singleton services.
* **SecDevOps & Session Security**: Understanding client-side authorization UX vs. server-side enforcement, JWT flows, and NIST SP 800-63 session guidelines.

---

## 🏛️ Project Architecture Overview

```
src/
├── app/
│   ├── api.service.ts                     # HTTP client communication via inject()
│   ├── app.config.ts                      # Root providers (Zoneless, Router, HttpClient)
│   ├── app.html                           # Root layout shell with navigation
│   ├── app.routes.ts                      # Lazy-loaded feature routes
│   ├── app.scss                           # Global application theme styles
│   ├── app.spec.ts                        # Root component unit tests
│   ├── app.ts                             # Standalone root component
│   ├── post.ts                            # Strongly typed Post interface
│   ├── todo.service.ts                    # State management combining Signals & RxJS
│   ├── todo.ts                            # Strongly typed Todo interface
│   ├── user.ts                            # Strongly typed User interface
│   ├── data-loader/
│   │   ├── data-loader.component.css      # Component layout and spinner styles
│   │   ├── data-loader.component.html     # @if, @let, @for, @empty, and async pipe
│   │   └── data-loader.component.ts       # forkJoin, iif, switchMap, catchError
│   └── data-manipulator/
│       ├── data-manipulator.component.html# Signals, computed metrics, and CRUD UI
│       ├── data-manipulator.component.scss# Metric badges and interactive list styles
│       └── data-manipulator.component.ts  # signal(), computed(), takeUntilDestroyed()
├── main.ts                                # Application bootstrap entry point
└── styles.scss                            # Global styles entry point (@use './app/app.scss')
```

---

## 🔑 Core Concepts & Methods Explained

### 1. Native Zoneless Change Detection

Traditionally, Angular relied on `Zone.js` to monkey-patch asynchronous browser APIs (`setTimeout`, `Promise`, `addEventListener`) and trigger a top-to-bottom change detection sweep across the entire component tree.

In **Angular 22**, native Zoneless change detection (`provideZonelessChangeDetection()`) enables fine-grained, localized reactivity:
- Changes to Signals (`signal.set()`, `signal.update()`) directly notify dependent template views.
- Eliminates the runtime and bundle overhead of `Zone.js`.
- No manual `ChangeDetectorRef.markForCheck()` calls are needed when mutating Signals or using the `async` pipe.

#### Configuration in `src/app/app.config.ts`:
```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ⚡ 1. Native Zoneless Change Detection
    provideZonelessChangeDetection(),

    // 🧭 2. Router with Component Input Binding
    provideRouter(routes, withComponentInputBinding()),

    // 🌐 3. Modern HTTP Client with Fetch Backend
    provideHttpClient(withFetch(), withInterceptors([]))
  ]
};
```

---

### 2. Modern Dependency Injection (`inject()`)

Modern Angular establishes `inject()` as the idiomatic standard for dependency injection:
* Declared directly in property initializers.
* Eliminates verbose `constructor(private service: Service) {}` boilerplate.
* Usable inside functional route guards (`CanActivateFn`), resolvers (`ResolveFn`), and interceptors (`HttpInterceptorFn`).

#### Example in `src/app/api.service.ts`:
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { User } from './user';

@Injectable({
  providedIn: 'root' // Application-wide root singleton
})
export class ApiService {
  // Idiomatic DI via inject()
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
```

---

### 3. Angular Signals & Computed State

Signals are reactive value wrappers that track their consumers through an internal dependency graph.

| Primitive | Purpose | Example |
| :--- | :--- | :--- |
| `signal(initialVal)` | Writable reactive state | `const count = signal(0);` |
| `computed(() => ...)` | Memoized, read-only derived value | `const double = computed(() => count() * 2);` |
| `effect(() => ...)` | Reactive side-effect callback | `effect(() => console.log(count()));` |
| `linkedSignal(() => ...)` | Writable state that auto-resets on source changes | `const tab = linkedSignal(() => defaultTab());` |

#### Example in `src/app/data-manipulator/data-manipulator.component.ts`:
```typescript
@Component({
  selector: 'app-data-manipulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-manipulator.component.html',
  styleUrl: './data-manipulator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManipulatorComponent implements OnInit {
  private readonly todoService = inject(TodoService);

  // Writable Signals
  readonly todos = signal<Todo[]>([]);
  readonly newTodoTitle = signal<string>('');
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // Computed Derived Signals (Synchronous & Memoized)
  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(() => this.todos().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.todos().filter(t => !t.completed).length);

  constructor() {
    // Automatically unsubscribe on component destruction
    this.todoService.todos$
      .pipe(takeUntilDestroyed())
      .subscribe(items => this.todos.set(items));
  }
}
```

---

### 4. Modern Control Flow & Template Variables (`@let`)

Angular features native control flow syntax that replaces legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`):

#### Local Variables with `@let`:
```html
@let total = totalCount();
@let completed = completedCount();
@let pending = pendingCount();

<div class="metrics">
  <span>Total: {{ total }}</span>
  <span>Done: {{ completed }}</span>
  <span>Remaining: {{ pending }}</span>
</div>
```

#### Iteration with `@for`, `track`, and `@empty`:
```html
<ul>
  @for (todo of todos(); track todo.id) {
    <li [class.completed]="todo.completed">
      <span>{{ todo.title }}</span>
    </li>
  } @empty {
    <li class="empty-state">No todos found.</li>
  }
</ul>
```

#### Conditional Rendering with `@if / @else`:
```html
@if (error(); as errorMessage) {
  <div class="error-banner">{{ errorMessage }}</div>
} @else if (loading()) {
  <div class="spinner">Loading...</div>
}
```

---

### 5. Asynchronous Operations & RxJS Pipelines

The `DataLoaderComponent` showcases concurrent API orchestration with RxJS operators:

1. **`switchMap`**: Switches the stream execution when the source emits.
2. **`iif`**: Dynamically chooses between fetching data or returning an empty fallback Observable based on a condition function.
3. **`forkJoin`**: Executes concurrent HTTP requests in parallel and emits once all complete (equivalent to `Promise.all`).
4. **`map`**: Transforms raw response tuples into structured domain interfaces.
5. **`catchError`**: Gracefully intercepts network errors, updates error state, and recovers with `EMPTY`.
6. **`async` pipe**: Automatically subscribes in the template and unbinds on destruction without memory leaks.

```typescript
this.data$ = of(this.shouldFetchPosts).pipe(
  switchMap(shouldFetch =>
    iif(
      () => shouldFetch,
      forkJoin([
        this.apiService.getPosts(),
        this.apiService.getUsers()
      ]).pipe(
        map(([posts, users]): CombinedData => ({ posts, users })),
        catchError(err => {
          this.error.set('Failed to load data.');
          return EMPTY;
        })
      ),
      of({ posts: [], users: [] } as CombinedData)
    )
  )
);
```

---

### 6. Modern Lazy-Loaded Routing

Feature routes are loaded on-demand via `loadComponent`, optimizing bundle sizes and reducing initial load latency:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/data-loader', pathMatch: 'full' },
  {
    path: 'data-loader',
    loadComponent: () =>
      import('./data-loader/data-loader.component').then(m => m.DataLoaderComponent),
    title: 'Data Loader - Angular Mastery'
  },
  {
    path: 'data-manipulator',
    loadComponent: () =>
      import('./data-manipulator/data-manipulator.component').then(m => m.DataManipulatorComponent),
    title: 'Data Manipulator - Angular Mastery'
  },
  { path: '**', redirectTo: '/data-loader' }
];
```

---

## 🔒 Security & SecDevOps Best Practices

### Client-Side vs. Server-Side Authorization
* **Client-Side (`@if`, Route Guards)**: Manages **User Experience (UX)** by hiding unauthorized buttons and preventing accidental navigation. Client-side checks are **not** security barriers.
* **Server-Side**: Mandatory enforcement point. Every API request must validate authorization tokens and permission claims.

### Token Storage: `localStorage` vs. `HttpOnly` Cookies
* **`localStorage`**: Susceptible to **Cross-Site Scripting (XSS)** token exfiltration.
* **`HttpOnly` Cookies**: Prevents client-side script access, mitigating XSS risks. Requires anti-CSRF protections (SameSite attributes, CSRF tokens).

### NIST SP 800-63 Session Management Standards
* **Inactivity Timeouts**: Terminate idle sessions automatically.
* **Overall Timeouts**: Force re-authentication after fixed intervals.
* **Secure Transport**: Enforce HTTPS / TLS 1.3 for all session token transactions.

---

## 🚀 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/` in your browser.

### 3. Production Build
```bash
npm run build
```
Generates optimized lazy-loaded bundles inside `dist/AngularMasteryCurriculum/`.

---

## 📚 Curriculum References & Summary

| Module | Core Topic | Modern Angular 22 Implementation |
| :--- | :--- | :--- |
| **Phase 1** | Components & Data Flow | Standalone `@Component`, `input()`, `output()`, `model()`, `@let`, `@for` |
| **Phase 2** | Architecture & Reactivity | Root Singleton DI, `inject()`, `signal()`, `computed()`, `linkedSignal()` |
| **Phase 3** | Navigation & Data Persistence | `loadComponent`, `withComponentInputBinding()`, `provideHttpClient(withFetch())` |
| **Phase 4** | Optimization & Security | `provideZonelessChangeDetection()`, `@defer`, `CanActivateFn`, SecDevOps |
