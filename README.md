# Angular Mastery Curriculum: Phase 4 - Zone.js & The OnPush Strategy

Welcome to the **4.2.1-OnPush** branch of the **Angular Mastery Curriculum**! This repository explores Angular's Change Detection (CD) architecture, contrasting **Default Change Detection** (`CheckAlways`) with the **`OnPush` Strategy** (`CheckOnce`), and demonstrating the 4 specific triggers that activate view updates in an `OnPush` component.

---

## 🎯 Phase 4 Learning Objectives

* **Understanding Zone.js**: How `Zone.js` monkey-patches asynchronous browser APIs (`addEventListener`, `setTimeout`, `fetch`, `Promise`) to automatically trigger change detection.
* **Default Strategy vs. OnPush**:
  * **Default (`CheckAlways`)**: Checks every component in the entire component tree from root to leaf on every async event.
  * **OnPush (`CheckOnce`)**: Skips checking the component and its subtree unless explicitly triggered.
* **The 4 Triggers of OnPush**:
  1. **Input Reference Change (`input()` / `@Input()`)**: Shallow reference equality (`oldRef !== newRef`). Immutability is mandatory!
  2. **Template Event Handlers**: Events originating from within the component's own template (e.g. `(click)`).
  3. **Async Pipe (`| async`)**: Observables/Promises emitting new values automatically invoke `markForCheck()`.
  4. **Explicit Manual Trigger (`ChangeDetectorRef.markForCheck()`)**: Manually flagging the component as dirty for the next check cycle.
* **Immutability Best Practices**: Why mutating an object in-place fails to update an `OnPush` component.

---

## 🏛️ Project Structure (`4.2.1-OnPush`)

```
src/
├── app/
│   ├── on-push-example/
│   │   ├── on-push-example.component.html # 4 interactive trigger demonstration cards
│   │   ├── on-push-example.component.scss # Card and badge styles
│   │   └── on-push-example.component.ts   # OnPush component with 4 trigger implementations
│   ├── app.config.ts                      # provideZonelessChangeDetection, provideRouter
│   ├── app.html                           # Root shell with parent immutability controls
│   ├── app.routes.ts                      # Lazy routing configuration
│   ├── app.scss                           # Theme styles
│   ├── app.spec.ts                        # Root component unit tests
│   └── app.ts                             # Root standalone component
├── main.ts                                # Bootstrap entry point
└── styles.scss                            # Global styles
```

---

## 🔑 Core Concepts: The 4 Triggers of `OnPush`

```typescript
@Component({
  selector: 'app-on-push-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush // ⚡ Optimization enabled
})
export class OnPushExampleComponent {
  // 1. Input Reference Change
  readonly user = input<UserProfile>();

  // 2. Local Event Handler
  onLocalClick(): void { /* ... */ }

  // 3. Async Pipe Observable
  readonly timer$ = interval(1000);

  // 4. Manual Change Detector
  private readonly cdr = inject(ChangeDetectorRef);
  runAsync(): void {
    setTimeout(() => {
      this.cdr.markForCheck(); // Flags view as dirty
    }, 1000);
  }
}
```

---

### Comparison: Zone.js vs. OnPush Strategy

| Feature | 🌐 Zone.js | ⚛️ OnPush Strategy |
| :--- | :--- | :--- |
| **Purpose** | **Triggers** the change detection cycle | **Limits** which components are checked during the cycle |
| **Scope** | Global (watches async events in NgZone) | Local (applied per component and its subtree) |
| **Result** | Automatic change detection | High-performance rendering optimization |

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
1. **Trigger 1**: Click *"Pass New Object Reference"* (updates child) vs. *"Mutate Property In-Place"* (child does NOT update because reference is unchanged).
2. **Trigger 2**: Click *"Trigger Local Event Handler"* inside the child.
3. **Trigger 3**: Observe the live RxJS timer incrementing via `AsyncPipe`.
4. **Trigger 4**: Click *"Run Async Task + markForCheck()"*.
