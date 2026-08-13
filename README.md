# Angular Mastery Curriculum: Phase 2 - DI, Services & Signals

Welcome to the **2-DI-and-Services** branch of the **Angular Mastery Curriculum**! This repository demonstrates modern Angular 22 architecture for Dependency Injection (DI), service injector scopes, and the Signals reactivity model in a native **Zoneless** environment.

---

## 🎯 Phase 2 Learning Objectives

* **Understanding the Injector Hierarchy**: How Angular resolves dependencies across the Root Injector and Component Injectors.
* **Singleton Services (`providedIn: 'root'`)**: Creating application-wide shared state and singletons.
* **Component-Scoped Services (`providers: [...]`)**: Creating isolated service instances scoped to specific component lifecycles.
* **Idiomatic Dependency Injection (`inject()`)**: Eliminating constructor DI boilerplate and leveraging injection contexts.
* **Angular Signals Reactivity**:
  * `signal()`: Writable reactive state primitives.
  * `computed()`: Pure, memoized, derived state calculations.
  * `effect()`: Synchronous side-effects tracked in an injection context.
* **Signals in Services**: Encapsulating reactive state inside singleton and scoped services using `.asReadonly()`.
* **Modern Control Flow (`@let`, `@if`, `@for`, `@empty`)**: Combining template local variables and fine-grained Signals reactivity.
* **Native Zoneless Architecture (`provideZonelessChangeDetection`)**: High-performance execution without `Zone.js`.

---

## 🏛️ Project Structure (`2-DI-and-Services`)

```
src/
├── app/
│   ├── app.config.ts                      # Root providers (provideZonelessChangeDetection, Router)
│   ├── app.html                           # Semantic navigation header & router-outlet
│   ├── app.routes.ts                      # Lazy-loaded routes with loadComponent
│   ├── app.scss                           # Application shell theme
│   ├── app.spec.ts                        # Root component unit tests
│   ├── app.ts                             # Root standalone component
│   ├── di-demo-page/
│   │   ├── di-demo-page.component.html    # Side-by-side comparison of 2 component instances
│   │   ├── di-demo-page.component.scss    # Grid layout styling
│   │   └── di-demo-page.component.ts      # Host standalone component
│   ├── di-services/
│   │   ├── component-scoped.service.ts    # Isolated service instance per component
│   │   ├── di-services.component.html     # Singleton vs Scoped interactive UI cards
│   │   ├── di-services.component.scss     # Color-coded service panels
│   │   ├── di-services.component.ts       # inject(), signal input(), providers: [ComponentScopedService]
│   │   └── singleton.service.ts           # Root singleton service with asReadonly()
│   └── signals-example/
│       ├── services/
│       │   └── signals-example.service.ts # State service with Signals
│       ├── signals-example.component.html # Metrics, @let, two-way bindings
│       ├── signals-example.component.scss # Card and badge styling
│       └── signals-example.component.ts   # signal(), computed(), effect(), and inject()
├── main.ts                                # Bootstrap entry point
└── styles.scss                            # Global styles entry point
```

---

## 🔑 Core Concepts & Methods Explained

### 1. The Injector Hierarchy & Scopes

Angular organizes Dependency Injection into a hierarchical tree:

```
[ Root Injector ] ── SingletonService (Shared app-wide)
       │
       ├── [ Component Injector A ] ── ComponentScopedService Instance #1
       │
       └── [ Component Injector B ] ── ComponentScopedService Instance #2
```

#### A. Singleton Service (`providedIn: 'root'`)
A single instance is instantiated by the Root Injector and shared across every consumer.

```typescript
@Injectable({
  providedIn: 'root' // Root Injector Singleton
})
export class SingletonService {
  private readonly valueSignal = signal<number>(0);
  readonly value = this.valueSignal.asReadonly();

  increment(): void {
    this.valueSignal.update(v => v + 1);
  }
}
```

#### B. Component-Scoped Service (`providers: [...]`)
Declared in the component decorator's `providers` array. Angular creates a fresh, private instance for each component instance.

```typescript
@Injectable() // No providedIn: 'root'
export class ComponentScopedService {
  private readonly valueSignal = signal<number>(0);
  readonly value = this.valueSignal.asReadonly();

  increment(): void {
    this.valueSignal.update(v => v + 1);
  }
}

@Component({
  selector: 'app-di-services',
  standalone: true,
  providers: [ComponentScopedService], // Creates a new instance per component
  ...
})
export class DiServicesComponent {
  readonly singletonService = inject(SingletonService);             // Shared Singleton
  readonly componentScopedService = inject(ComponentScopedService); // Isolated Scoped
}
```

---

### 2. Idiomatic Dependency Injection (`inject()`)

Modern Angular standardizes on the `inject()` function in class property initializers:
* Eliminates boilerplate `constructor(private service: Service) {}`.
* Usable in functional route guards (`CanActivateFn`), HTTP interceptors (`HttpInterceptorFn`), and factory functions.

---

### 3. Angular Signals & Reactivity Primitives

| Primitive | Description | Example |
| :--- | :--- | :--- |
| `signal()` | Writable reactive state container | `const count = signal(0);` |
| `computed()` | Pure, memoized derived computation | `const double = computed(() => count() * 2);` |
| `effect()` | Reactive side-effect callback | `effect(() => console.log(count()));` |
| `linkedSignal()` | Writable state that resets on source changes | `const tab = linkedSignal(() => defaultTab());` |

#### Reactive State in a Service:
```typescript
@Injectable({ providedIn: 'root' })
export class SignalsExampleService {
  private readonly messageSignal = signal<string>('Initial message');
  readonly message = this.messageSignal.asReadonly();

  updateMessage(newMessage: string): void {
    this.messageSignal.set(newMessage);
  }
}
```

---

### 4. Template Variables (`@let`) & Signal Bindings

```html
@let count = counter();
@let doubled = doubleCount();

<div class="metrics">
  <span>Count: {{ count }}</span>
  <span>Doubled: {{ doubled }}</span>
</div>

<input
  [ngModel]="firstName()"
  (ngModelChange)="firstName.set($event)"
  placeholder="First Name"
/>
```

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Build for production
npm run build
```

Navigate to `http://localhost:4200/` and test:
1. **DI Scopes Demo (`/di-demo`)**: Increment Singleton in Instance A and observe Instance B update in sync. Increment Component-Scoped in Instance A and observe Instance B remain unchanged.
2. **Signals Reactivity (`/signals-example`)**: Test fine-grained state updates, computed name derivation, and service communication.
