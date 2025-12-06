# OnPush Change Detection in Angular

This application provides a hands-on demonstration of the four triggers for an `OnPush` component in Angular. It's designed to help new Angular developers understand how change detection works in a more performant setting.

## Core Concepts

### What is Change Detection?

Change detection is the process through which Angular synchronizes the application's UI (the view) with its data (the model). When data changes, Angular's change detector runs, checking components to see if their corresponding templates need to be updated.

### The `OnPush` Change Detection Strategy

By default, Angular uses the `Default` change detection strategy. This strategy is very thorough and checks every component in the component tree whenever a change might have occurred (e.g., user interaction, timers, or network requests).

For better performance, we can switch to the `OnPush` strategy. With `OnPush`, a component is only checked for changes—a process called "check-dirty"—under specific circumstances. This avoids unnecessary checks and can significantly speed up larger applications.

An `OnPush` component will be checked in the following four scenarios:

1.  **An `@Input()` Reference Changes:** When a new value is assigned to an `@Input()` property of the component, Angular marks the component for a check. It's important to note that for objects and arrays, the *reference* to the object or array must change, not just a property within it.
2.  **An Event is Fired from the Component or its Children:** When a user triggers an event (like a click) from within the component's template, the component will be checked.
3.  **An `async` Pipe Receives a New Value:** When an `Observable` or `Promise` bound to the template with an `async` pipe emits a new value, the component is marked for a check.
4.  **Manual Triggering of Change Detection:** You can manually trigger change detection by injecting `ChangeDetectorRef` and calling its `markForCheck()` or `detectChanges()` methods. `markForCheck()` is generally preferred as it's less aggressive; it marks the component and its ancestors as needing a check, which then happens on the next change detection cycle. `detectChanges()` forces an immediate check of the component and its descendants.

## Application Structure

The application is composed of two main components:

*   `AppComponent`: The root component of the application, located in `src/app/app/`.
*   `OnPushExampleComponent`: A child component that is configured with the `OnPush` change detection strategy, located in `src/app/on-push-example/`.

The `AppComponent` hosts the `OnPushExampleComponent` and includes controls to demonstrate the different change detection triggers.

### Implementation Details

#### Trigger 1: @Input() Reference Change

In the `OnPushExampleComponent`, the `user` property is an `@Input()`:

```typescript
// src/app/on-push-example/on-push-example.component.ts
@Input() user!: { name: string };
```

The `AppComponent` passes a `user` object to this input and has a button to update it:

```typescript
// src/app/app/app.component.ts
user = { name: 'John Doe' };

updateUser() {
  // A new object is created to change the reference, triggering OnPush.
  this.user = { name: 'Jane Doe' };
}
```

Clicking the "Update User" button creates a *new* user object. This change in the object reference is what triggers change detection in the `OnPushExampleComponent`.

#### Trigger 2: Event Fired from Component

The `OnPushExampleComponent` has a button that calls the `updateInternalState()` method:

```html
<!-- src/app/on-push-example/on-push-example.component.html -->
<button (click)="updateInternalState()">Update Internal State</button>
```

```typescript
// src/app/on-push-example/on-push-example.component.ts
updateInternalState() {
  this.internalState = 'Internal State Updated';
}
```

When this button is clicked, the `internalState` property is updated. Because the event originated from within the component's own template, change detection is automatically triggered for this component.

#### Trigger 3: The `async` Pipe

The `OnPushExampleComponent` uses an `async` pipe to subscribe to an `Observable` called `timer$`:

```html
<!-- src/app/on-push-example/on-push-example.component.html -->
<p>Timer: {{ timer$ | async }}</p>
```

```typescript
// src/app/on-push-example/on-push-example.component.ts
private timerSubject = new BehaviorSubject<number>(0);
timer$: Observable<number> = this.timerSubject.asObservable();

constructor(private cdr: ChangeDetectorRef) {
  let count = 0;
  setInterval(() => {
    this.timerSubject.next(count++);
  }, 1000);
}
```

A `setInterval` function emits a new number every second. The `async` pipe handles the subscription and automatically triggers change detection in the component whenever a new value is emitted.

#### Trigger 4: Manual Change Detection

The `OnPushExampleComponent` includes a button to demonstrate manual change detection:

```html
<!-- src/app/on-push-example/on-push-example.component.html -->
<button (click)="updateManualState()">Update Manual State</button>
```

```typescript
// src/app/on-push-example/on-push-example.component.ts
updateManualState() {
  setTimeout(() => {
    this.manualState = 'Manual State Updated';
    this.cdr.markForCheck();
  }, 2000);
}
```

This method updates a property after a 2-second delay. Because this change happens inside a `setTimeout`, it's outside of Angular's direct control. To ensure the UI updates, we inject `ChangeDetectorRef` and call `markForCheck()`. This tells Angular that this component needs to be checked during the next change detection cycle.
