# Angular Mastery Curriculum: Phase 2 - Pipes & Data Transformation

Welcome to the **2-Pipes** branch of the **Angular Mastery Curriculum**! This repository demonstrates how to use Angular's built-in pipes and create custom standalone pure pipes to transform template data efficiently in a modern **Zoneless Angular 22** environment.

---

## 🎯 Phase 2 Learning Objectives

* **Understanding Pipes**: Transforming raw data for display directly in template expressions without mutating underlying state.
* **Pure vs. Impure Pipes**:
  * **Pure Pipes (`pure: true` default)**: Executed ONLY when the primitive input value or object reference changes (memoized pure functions).
  * **Impure Pipes (`pure: false`)**: Executed on every change detection cycle (avoid unless strictly necessary for internal state change detection).
* **Built-in Angular Pipes**:
  * `DatePipe` (`date`): Formats `Date` objects, timestamps, and ISO strings.
  * `DecimalPipe` (`number`): Controls decimal places and thousands grouping.
  * `CurrencyPipe` (`currency`): Localized financial currency formatting.
  * `PercentPipe` (`percent`): Formats fractions into percentage values.
  * `UpperCasePipe` (`uppercase`), `LowerCasePipe` (`lowercase`), `TitleCasePipe` (`titlecase`): String formatting.
  * `JsonPipe` (`json`): Serializes complex objects to formatted JSON for debugging.
  * `AsyncPipe` (`async`): Automatically subscribes to Observables/Promises and unwraps values.
* **Creating Custom Standalone Pipes (`PipeTransform`)**: Implementing custom transformation logic.
* **Pipes with Angular Signals & Native Zoneless**: How Signals trigger pure pipe re-evaluations without `Zone.js`.

---

## 🏛️ Project Structure (`2-Pipes`)

```
src/
├── app/
│   ├── app.config.ts                      # Root providers (provideZonelessChangeDetection, Router)
│   ├── app.html                           # Root shell template
│   ├── app.routes.ts                      # Lazy-loaded route configuration
│   ├── app.scss                           # Application theme styles
│   ├── app.spec.ts                        # Root component unit tests
│   ├── app.ts                             # Root standalone component
│   ├── custom-date.pipe.ts                # Custom standalone pure pipe (DD-MMM-YYYY)
│   └── pipes-demo/
│       ├── pipes-demo.component.html      # Transformation comparison tables & inputs
│       ├── pipes-demo.component.scss      # Table and card styling
│       └── pipes-demo.component.ts        # Signal state & interactive mutation handlers
├── main.ts                                # Application bootstrap entry point
└── styles.scss                            # Global styles entry point
```

---

## 🔑 Core Concepts & Methods Explained

### 1. Built-in Pipes Reference

| Pipe | Template Syntax | Input Example | Transformed Output |
| :--- | :--- | :--- | :--- |
| `DatePipe` | `{{ date \| date:'short' }}` | `new Date()` | `8/13/26, 6:45 PM` |
| `DatePipe` | `{{ date \| date:'fullDate' }}` | `new Date()` | `Thursday, August 13, 2026` |
| `DecimalPipe` | `{{ num \| number:'1.2-2' }}` | `12345.6789` | `12,345.68` |
| `CurrencyPipe` | `{{ num \| currency:'USD':'symbol' }}` | `12345.68` | `$12,345.68` |
| `PercentPipe` | `{{ ratio \| percent:'1.1-2' }}` | `0.8745` | `87.45%` |
| `UpperCasePipe` | `{{ str \| uppercase }}` | `'hello'` | `'HELLO'` |
| `LowerCasePipe` | `{{ str \| lowercase }}` | `'HELLO'` | `'hello'` |
| `TitleCasePipe` | `{{ str \| titlecase }}` | `'hello world'` | `'Hello World'` |
| `JsonPipe` | `<pre>{{ obj \| json }}</pre>` | `{ name: 'John' }` | `{\n  "name": "John"\n}` |

---

### 2. Creating a Custom Pure Pipe (`CustomDatePipe`)

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true, // Directly importable into standalone components
  pure: true        // Memoized: Only re-executes when the input reference changes
})
export class CustomDatePipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: 'DD-MMM-YYYY' | 'YYYY-MM-DD' | 'MMM DD, YYYY' = 'DD-MMM-YYYY'
  ): string {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    const day = ('0' + date.getDate()).slice(-2);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
```

---

### 3. Combining Signals, Control Flow, and Pipes

In modern Angular, reading a Signal `currentDate()` inside a pipe expression automatically registers the component view as a reactive consumer:

```html
@let rawDate = currentDate();
@let rawNum = someNumber();

<p>Default Date: {{ rawDate | date }}</p>
<p>Custom Date: {{ rawDate | customDate }}</p>
<p>Currency: {{ rawNum | currency:'USD':'symbol' }}</p>
```

When `currentDate.set(new Date())` is called, the Signal notifies Angular's localized reactive graph, triggering the pure pipe's `transform()` method to compute the updated formatted string in Zoneless mode without any manual change detection calls.

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

Navigate to `http://localhost:4200/` and interact with the date adjusters, number multipliers, and text inputs to see pipes react in real-time.
