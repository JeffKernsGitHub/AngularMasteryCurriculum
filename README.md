# Angular Mastery Curriculum: Phase 1 - Components & Data Flow

Welcome to the **1-Component** branch of the **Angular Mastery Curriculum**! This branch demonstrates the foundational building blocks of modern Angular 22, focusing on Standalone Component architecture, the new Signals reactivity model, modern DOM rendering hooks, and native template control flow.

---

## 🎯 Phase 1 Learning Objectives

* **Component Definition & Metadata (`@Component`)**: Standalone components, template/style linking, and `OnPush` change detection.
* **Signals Primitive (`signal()`, `computed()`)**: Managing reactive state synchronously without Zone.js.
* **Template Data Flow ("The Wiring")**:
  * **Interpolation**: Rendering signal values via `{{ signalName() }}`.
  * **Property Binding**: Direct element attribute/property assignment via `[target]="source"`.
  * **Event Binding**: Handling user interactions via `(click)="handler()"`.
  * **Two-Way Binding**: Form input synchronization with Signal state via `[ngModel]` / `(ngModelChange)`.
* **Modern Template Variables (`@let`)**: Template-scoped local variables.
* **Modern Control Flow**: `@if`, `@else`, `@for (item of items; track item)`, `@empty`, and `@switch`.
* **Modern DOM Lifecycle & Rendering Hooks (`afterNextRender`, `afterRender`)**: SSR-safe client-side rendering hooks replacing `ngAfterViewInit`.
* **Native Zoneless Architecture (`provideZonelessChangeDetection`)**: Fine-grained reactivity without `Zone.js` monkey-patching.

---

## 🏛️ Project Structure (`1-Component`)

```
src/
├── app/
│   ├── app.config.ts                      # Root providers (Zoneless CD & Router)
│   ├── app.html                           # Root application layout
│   ├── app.routes.ts                      # Application routing table
│   ├── app.scss                           # Global application shell styles
│   ├── app.spec.ts                        # Root component unit tests
│   ├── app.ts                             # Root standalone component
│   └── hello-jeffy/
│       ├── hello-jeffy.html               # Interpolation, property/event/two-way binding, @let, @for, @if
│       ├── hello-jeffy.scss               # Card container, button, and badge styles
│       ├── hello-jeffy.spec.ts            # Signal unit tests
│       └── hello-jeffy.ts                 # signal(), computed(), and afterNextRender()
├── main.ts                                # Application bootstrap entry point
└── styles.scss                            # Global styles entry point
```

---

## 🔑 Core Concepts & Methods Explained

### 1. Component Metadata (`@Component`)

In modern Angular, all components are **standalone by default** (no `NgModule` required). Components declare their dependencies directly in their `@Component` decorator metadata:

```typescript
@Component({
  selector: 'app-hello-jeffy',
  standalone: true,                          // Default in modern Angular
  imports: [FormsModule],                    // Direct dependencies
  templateUrl: './hello-jeffy.html',
  styleUrl: './hello-jeffy.scss',            // Modern singular styleUrl
  changeDetection: ChangeDetectionStrategy.OnPush // Optimized for Signals
})
export class HelloJeffy { ... }
```

---

### 2. Signals & Computed Derived State

Signals provide synchronous, fine-grained reactivity that tracks dependent templates automatically:

```typescript
// 1. Writable Signal State
readonly coolname = signal<string>('Earl');
readonly showDetails = signal<boolean>(false);
readonly items = signal<string[]>(['Apple Fritters', 'Oatmeal Cookies', 'Pumpkin Rolls']);

// 2. Computed Derived Signal (Memoized)
readonly detailsBtnText = computed(() =>
  this.showDetails() ? 'Hide Details' : 'Show Details'
);

// 3. Mutating State with .update()
changeName(): void {
  this.coolname.update(name => (name === 'Earl' ? 'Jeffy' : 'Earl'));
}

toggleDetails(): void {
  this.showDetails.update(visible => !visible);
}
```

---

### 3. Modern DOM Rendering Hooks (`afterNextRender`)

In Server-Side Rendering (SSR) and modern Angular setups, direct DOM manipulation inside `ngAfterViewInit` is discouraged because views may render on the server where `window` and `document` do not exist.

Angular provides specialized rendering functions executed in the constructor:
* **`afterNextRender`**: Runs **once** after Angular finishes rendering to the browser DOM (client-only, SSR-safe).
* **`afterRender`**: Runs **every time** after Angular finishes a DOM render cycle.

```typescript
constructor() {
  afterNextRender(() => {
    console.log('DOM rendered safely on the client browser.');
  });
}
```

---

### 4. Template Interaction & Data Flow Summary

| Technique | Purpose | Modern Angular 22 Syntax |
| :--- | :--- | :--- |
| **Interpolation** | Display signal value | `{{ coolname() }}` |
| **Property Binding** | Bind DOM property | `<p [innerText]="paragraphtext()"></p>` |
| **Event Binding** | Listen to events | `<button (click)="changeName()">Toggle</button>` |
| **Two-Way Binding** | Sync form input with signal | `<input [ngModel]="coolname()" (ngModelChange)="coolname.set($event)" />` |
| **`@let`** | Template local variable | `@let isVisible = showDetails();` |
| **`@if / @else`** | Conditional rendering | `@if (isVisible) { ... } @else { ... }` |
| **`@for` with `track`** | High-performance loop | `@for (item of items(); track item) { ... }` |
| **`@empty`** | No-data fallback | `@empty { <li>No items found.</li> }` |

---

## 🚀 Running the Project Locally

```bash
# 1. Start development server
npm start

# 2. Run production build
npm run build
```
Navigate to `http://localhost:4200/` in your browser.
