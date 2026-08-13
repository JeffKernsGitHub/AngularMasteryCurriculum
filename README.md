# Angular Mastery Curriculum: Phase 4 - Deferrable Views (`@defer`)

Welcome to the **4.1-Defer** branch of the **Angular Mastery Curriculum**! This repository demonstrates **Deferrable Views (`@defer`)** in **Modern Angular 22**, showcasing declarative lazy loading of component dependencies and template subtrees to optimize Core Web Vitals (LCP, INP) and initial bundle sizes in a native **Zoneless** environment.

---

## 🎯 Phase 4 Learning Objectives

* **Understanding Deferrable Views (`@defer`)**: Declaratively splitting heavy component subtrees into on-demand asynchronous bundles without manual route-level lazy loading.
* **Declarative Triggers**:
  * **`on viewport`**: Triggers loading via `IntersectionObserver` when placeholder enters view.
  * **`on hover(element)`**: Triggers loading when the user hovers over a target DOM node.
  * **`on interaction(element)`**: Triggers loading on click or keyboard focus.
  * **`on idle`**: Triggers loading automatically when the browser thread is idle (`requestIdleCallback`).
  * **`on timer(duration)`**: Triggers loading after a specified delay (e.g. `2s`).
  * **`when condition()`**: Programmatic trigger driven by reactive Signals or boolean expressions.
* **Prefetching (`prefetch on ...`)**: Downloading JavaScript chunks in advance before triggering rendering.
* **Auxiliary Control Blocks**:
  * **`@placeholder (minimum duration)`**: Content displayed before the trigger fires.
  * **`@loading (after delay; minimum duration)`**: Temporary loading indicator with anti-flicker timing guards.
  * **`@error`**: Graceful failure fallback UI if the chunk fails to load.
* **Incremental Hydration (SSR)**: Deferring JavaScript execution on server-rendered HTML until user interaction (`hydrate on interaction`, `hydrate on viewport`).

---

## 🏛️ Project Structure (`4.1-Defer`)

```
src/
├── app/
│   ├── defer-example/
│   │   ├── deferred-content/
│   │   │   ├── deferred-content.component.html # Lazy chunk component template
│   │   │   ├── deferred-content.component.scss # Status badge & spinner styles
│   │   │   └── deferred-content.component.ts   # Async mock data with Signals
│   │   ├── defer-example.component.html        # 4 interactive @defer trigger demonstrations
│   │   ├── defer-example.component.scss        # Card, badge, and layout styles
│   │   └── defer-example.component.ts          # Programmatic signal condition handlers
│   ├── app.config.ts                           # provideZonelessChangeDetection, provideRouter
│   ├── app.html                                # Application shell layout
│   ├── app.routes.ts                           # Lazy loaded defer route
│   ├── app.scss                                # Theme styles
│   ├── app.spec.ts                             # Root unit test
│   └── app.ts                                  # Root standalone component
├── main.ts                                     # Bootstrap entry point
└── styles.scss                                 # Global CSS
```

---

## 🔑 Core Concepts & Triggers Reference

### 1. The `@defer` Syntax Anatomy

```html
@defer (on hover(triggerBtn); prefetch on idle) {
  <!-- Deferred Component (Chunked automatically) -->
  <app-deferred-content />
} @placeholder (minimum 500ms) {
  <!-- Shown before the trigger condition is met -->
  <div>Placeholder text...</div>
} @loading (after 100ms; minimum 800ms) {
  <!-- Shown while the chunk is actively downloading (prevents layout flicker) -->
  <div class="spinner">Loading bundle...</div>
} @error {
  <!-- Shown if chunk download fails -->
  <div>Failed to load component.</div>
}
```

---

### 2. Available Triggers

| Trigger | Syntax | When It Loads |
| :--- | :--- | :--- |
| **Viewport** | `@defer (on viewport)` | When placeholder enters browser viewport (IntersectionObserver). |
| **Hover** | `@defer (on hover(elem))` | When user hovers cursor over target element. |
| **Interaction** | `@defer (on interaction(elem))` | When user clicks or focuses target element. |
| **Idle** | `@defer (on idle)` | Automatically when main browser thread is idle. |
| **Timer** | `@defer (on timer(2s))` | After elapsed duration. |
| **Condition** | `@defer (when isReady())` | When a Signal or boolean expression evaluates to `true`. |

---

### 3. Incremental Hydration with `@defer` (SSR)

In Server-Side Rendered (SSR) Angular applications, `@defer` enables **Incremental Hydration** to render HTML on the server and delay JavaScript execution until needed:

```html
<!-- Server renders HTML; JavaScript hydrates only upon user interaction -->
@defer (hydrate on interaction) {
  <app-comments-section />
} @placeholder {
  <div>Loading comments...</div>
}
```

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

Navigate to `http://localhost:4200/` to test:
1. **Hover Trigger**: Hover mouse over button to watch the loading chunk download and render.
2. **Interaction Trigger**: Click the interaction button.
3. **Signal Condition Trigger**: Click button to toggle the `isTriggered()` signal.
4. **Viewport Scroll**: Scroll down to trigger the `IntersectionObserver` viewport block.
