# Angular Mastery Curriculum: Phase 4 - The Signal Strategy (Zoneless Change Detection)

Welcome to the **4.2.2-SignalCD** branch of the **Angular Mastery Curriculum**! This repository explores Angular's modern reactivity model: **The Signal Strategy**. We demonstrate how Angular moves away from the top-down dirty checks of Zone.js to **fine-grained reactivity** with `signal()`, `computed()`, and `effect()` in a native **Zoneless** environment.

---

## 🎯 Phase 4 Learning Objectives

* **Signals as the Reactive Primitive**:
  * Creating reactive values with `signal()`.
  * Reading values as getter functions (`count()`).
  * Mutating values explicitly with `.set()` and `.update()`.
* **The Reactive Dependency Graph**:
  * How Signals automatically register consumers (components, computed signals, effects) when accessed.
  * When a Signal changes, Angular updates *only* the specific nodes in the graph that depend on it.
* **Derived State with `computed()`**:
  * Pure, memoized calculations that only re-execute when their underlying signal dependencies change.
* **Side Effects with `effect()`**:
  * Synchronizing state with external APIs, logging systems, and storage without polluting templates.
* **Native Zoneless Architecture (`provideZonelessChangeDetection`)**:
  * Running Angular applications without `Zone.js` monkey-patching browser APIs.

---

## 🏛️ Project Structure (`4.2.2-SignalCD`)

```
src/
├── app/
│   ├── zoneless-example/
│   │   ├── api.service.ts                 # Asynchronous mock API service
│   │   ├── zoneless-example.component.html# Reactive form, computed metrics, & effect log console
│   │   ├── zoneless-example.component.scss# Card, avatar, and log styling
│   │   └── zoneless-example.component.ts  # Source signals, computed() derivations, and effect()
│   ├── app.config.ts                      # provideZonelessChangeDetection, provideRouter
│   ├── app.html                           # Application shell
│   ├── app.routes.ts                      # Lazy routing configuration
│   ├── app.scss                           # Theme styles
│   ├── app.spec.ts                        # Root component unit tests
│   └── app.ts                             # Root standalone component
├── main.ts                                # Bootstrap entry point
└── styles.scss                            # Global styles
```

---

## 🔑 Architectural Deep Dive: The Signal Dependency Graph

```
┌─────────────────────────┐
│       user Signal       │ ────────┐
│  { firstName, lastName }│         │
└─────────────────────────┘         ▼
                               ┌─────────────────────────┐ ──────► ┌────────────────────────┐
                               │   fullName computed()   │         │  updateLog effect()    │
                               │ (Memoized Derived State)│         │ (Async side effects)   │
                               └─────────────────────────┘         └────────────────────────┘
                                            │
                                            ▼
                               ┌─────────────────────────┐
                               │   initials / totalChars │
                               └─────────────────────────┘
```

---

### Comparison: Zone.js vs. The Signal Strategy

| Feature | 🌐 Zone.js (Old Model) | ⚡ Signal Strategy (Modern Model) |
| :--- | :--- | :--- |
| **Trigger Mechanism** | Monkey-patches all async browser APIs | Explicit `.set()` and `.update()` mutations |
| **Change Detection Scope** | Global sweep: Checks the entire tree | Fine-grained: Updates only dependent nodes |
| **Performance Overhead** | Higher (checks non-mutated subtrees) | Minimal (surgical DOM updates) |
| **Developer Experience** | Implicit (guessing why views re-rendered)| Explicit, synchronous, and predictable |
| **Zone.js Dependency** | Required (`zone.js` polyfill bundle) | **Zero** (`provideZonelessChangeDetection()`) |

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

Navigate to `http://localhost:4200/` and test:
1. **Form Input**: Type into the First Name / Last Name fields and save to trigger signal updates.
2. **Quick Presets**: Click preset buttons to observe immediate computed updates.
3. **Computed Metrics**: Watch `fullName()`, `initials()`, and `totalChars()` recalculate automatically.
4. **Effect Stream**: Inspect the live side-effect execution log console rendered in real time.
