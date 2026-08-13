# Angular Mastery Curriculum: Phase 3 - Forms & User Input

Welcome to the **3.2-Forms** branch of the **Angular Mastery Curriculum**! This repository provides an architectural comparison of the three primary approaches to handling form input and validation in **Modern Angular 22**: **Reactive Forms**, **Template-Driven Forms**, and **Signal-Based Forms**.

---

## 🎯 Phase 3 Learning Objectives

* **Three Form Paradigms Compared**:
  * **Reactive Forms (Model-Driven)**: Strongly-typed `FormGroup`, `FormControl`, `NonNullableFormBuilder`, and programmatic validators.
  * **Template-Driven Forms (Directive-Driven)**: Template bindings with `[(ngModel)]`, `ngForm`, and HTML validation attributes.
  * **Signal-Based Forms (Fine-Grained Reactivity)**: Standalone input signals (`signal()`) and pure memoized validation functions (`computed()`).
* **Validation & Error Handling**: Displaying contextual field-level error messages with modern `@if` control flow.
* **NonNullable Typed Forms**: Eliminating unexpected `null` values upon form reset with `NonNullableFormBuilder`.
* **Native Zoneless Architecture (`provideZonelessChangeDetection`)**: Fine-grained form reactivity without `Zone.js`.

---

## 🏛️ Project Structure (`3.2-Forms`)

```
src/
├── app/
│   ├── form-explanation/
│   │   ├── forms-explanation.component.html # 3 side-by-side interactive form cards
│   │   ├── forms-explanation.component.scss # Color-coded card and form styles
│   │   └── forms-explanation.component.ts   # Reactive, Template-driven, and Signal form setups
│   ├── app.config.ts                        # provideZonelessChangeDetection, provideRouter
│   ├── app.html                             # Header shell and router outlet
│   ├── app.routes.ts                        # Lazy route loading with loadComponent
│   ├── app.scss                             # Global theme styles
│   ├── app.spec.ts                          # Root component unit tests
│   └── app.ts                               # Root standalone component
├── main.ts                                  # Application bootstrap entry point
└── styles.scss                              # Global styles entry point
```

---

## 🔑 Architectural Comparison: 3 Form Paradigms

| Feature | 🛡️ Reactive Forms | 📝 Template-Driven Forms | ⚡ Signal-Based Forms |
| :--- | :--- | :--- | :--- |
| **Model Location** | Component TypeScript class | HTML Template directives | Component Signals (`signal()`) |
| **Data Flow** | Synchronous & Model-driven | Asynchronous & Directive-driven | Synchronous & Reactive Graph |
| **Form Definition** | `FormGroup`, `FormControl` | `[(ngModel)]`, `ngForm` | `signal()`, `computed()` |
| **Validation** | Functions (`Validators.required`) | Directives (`required`, `email`) | `computed(() => boolean)` |
| **Type Safety** | High (Strictly Typed) | Moderate | High (TypeScript Primitives) |
| **Best For** | Complex, dynamic enterprise forms | Simple inputs, quick prototypes | High-performance, zoneless apps |

---

### 1. 🛡️ Reactive Forms Setup

```typescript
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  ...
})
export class FormsExplanationComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly reactiveForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onReactiveSubmit(): void {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.getRawValue());
      this.reactiveForm.reset();
    }
  }
}
```

---

### 2. 📝 Template-Driven Forms Setup

```html
<form #tdForm="ngForm" (ngSubmit)="onTemplateDrivenSubmit(tdForm)">
  <input
    name="tdName"
    [(ngModel)]="templateDrivenModel.name"
    required
    #nameField="ngModel"
  />
  @if (nameField.invalid && nameField.touched) {
    <span class="error">Name is required.</span>
  }

  <button type="submit" [disabled]="tdForm.invalid">Submit</button>
</form>
```

---

### 3. ⚡ Signal-Based Forms Setup

```typescript
export class FormsExplanationComponent {
  readonly signalName = signal<string>('');
  readonly signalEmail = signal<string>('');

  readonly signalNameTouched = signal<boolean>(false);
  readonly signalEmailTouched = signal<boolean>(false);

  // Pure memoized validation signals
  readonly isSignalNameValid = computed(() => this.signalName().trim().length >= 3);
  readonly isSignalEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.signalEmail()));
  readonly isSignalFormValid = computed(() => this.isSignalNameValid() && this.isSignalEmailValid());
}
```

```html
<input
  [ngModel]="signalName()"
  (ngModelChange)="signalName.set($event)"
  (blur)="signalNameTouched.set(true)"
/>
@if (signalNameTouched() && !isSignalNameValid()) {
  <span class="error">Name must be at least 3 characters.</span>
}
```

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Production build
npm run build
```

Navigate to `http://localhost:4200/` and interact with the three form cards side-by-side.
