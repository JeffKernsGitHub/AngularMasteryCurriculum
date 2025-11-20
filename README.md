# Angular Mastery: DI, Services, and Signals

This project demonstrates key concepts in Angular, designed for students who are new to these topics. It covers:

1.  **Dependency Injection (DI) and Services:** Understanding how to create and inject services, and the difference between singleton and component-scoped services.
2.  **Angular Signals:** A modern approach to state management that offers fine-grained reactivity.

---

## 1. Dependency Injection & Services

This section explains how to use services to manage shared logic and state in an Angular application.

### Understanding the Injector Hierarchy

In Angular, injectors are responsible for creating and providing service instances. They have a hierarchical structure that parallels the component tree.

*   **Root Injector:** At the top of the hierarchy is the root injector, created when the application starts. Services provided in the root injector are available to all components in the application.
*   **Component Injectors:** Each component can have its own injector. When a component requests a dependency, Angular first checks the component's own injector. If the dependency is not found, it walks up the injector hierarchy until it finds an injector that can provide it.

### Creating and Providing Services

#### Singleton Services

A singleton service is a service for which only one instance exists in the entire application. This is the most common type of service. To create a singleton service, use the `@Injectable()` decorator with the `providedIn: 'root'` option.

**Example: `src/app/singleton.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  private value = 0;

  increment() {
    this.value++;
  }

  getValue() {
    return this.value;
  }
}
```

Because `SingletonService` is provided in the root, the same instance is shared across the entire application. Any component that injects this service will get the same instance.

#### Component-Scoped Services

You can also provide a service at the component level. This creates a new instance of the service for each instance of the component. To do this, add the service to the `providers` array in the component's decorator.

**Example: `src/app/component-scoped.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class ComponentScopedService {
  private value = 0;

  increment() {
    this.value++;
  }

  getValue() {
    return this.value;
  }
}
```

**Example: `src/app/di-services/di-services.component.ts`**

In this example, a new instance of `ComponentScopedService` is created for each `DiServicesComponent` instance.

### Demonstrating the Difference

To truly see the difference between these two scopes, you need to have more than one instance of a component that uses them. The `di-demo` page is set up for this exact purpose.

It uses a host component (`di-demo-page.component.ts`) to render two separate instances of `di-services.component.ts`.

**Example: `src/app/di-demo-page/di-demo-page.component.html`**
```html
<h1>Dependency Injection Scopes Demo</h1>

<app-di-services title="Component Instance A"></app-di-services>
<app-di-services title="Component Instance B"></app-di-services>
```

When you interact with the demo page:
*   Clicking "Increment" for the **Singleton Service** in either instance will update the value in **both** instances. This is because they share the one and only instance provided at the root level.
*   Clicking "Increment" for the **Component-Scoped Service** will only update the value within its own component instance. Each component gets its own, separate instance of the service.

### Injecting Services

The standard way to receive dependencies is through the `constructor`. Angular's DI system "injects" the service instances when the component is created.

**Example: `src/app/di-services/di-services.component.ts`**
```typescript
import { Component, Input } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

@Component({
  // ...
  providers: [ComponentScopedService] // Provided here
})
export class DiServicesComponent {
  @Input() title = '';

  constructor(
    public singletonService: SingletonService,
    public componentScopedService: ComponentScopedService
  ) {}
}
```

Alternatively, you can use the `inject()` function, a modern way to get a dependency inside an injection context (like a component's constructor, a factory function, or a field initializer).

**Example: `src/app/di-services/di-services.component.ts`**

```typescript
import { Component, inject } from '@angular/core';
import { SingletonService } from '../singleton.service';
import { ComponentScopedService } from '../component-scoped.service';

@Component({
  // ...
})
export class DiServicesComponent {
  singletonService = inject(SingletonService);
  componentScopedService = inject(ComponentScopedService);
}
```

### Separation of Concerns

Services help in separating business logic from presentation logic (which resides in the component). This makes your code:

*   **Cleaner and more readable:** Components are focused on displaying data and handling user events.
*   **Easier to maintain:** Business logic is centralized in one place.
*   **More testable:** You can test your business logic independently of your components.

---

## 2. Angular Signals

Angular Signals are a new system for managing state that automatically tracks where your data is used and updates it efficiently.

### Core Concepts of Signals

#### `signal()`

A `signal` is a wrapper around a value that can notify interested consumers when that value changes. You create a signal by calling the `signal()` function with its initial value.

To change the value, you can either `.set()` it directly or `.update()` it based on the previous value. To read the value, you call the signal as a function (e.g., `mySignal()`).

**Example: `src/app/signals-example/signals-example.component.ts`**

```typescript
import { Component, signal } from '@angular/core';

@Component({ /* ... */ })
export class SignalsExampleComponent {
  // Create a signal with an initial value of 0
  counter = signal(0);

  increment() {
    // Update the signal's value
    this.counter.update(c => c + 1);
  }

  // In the template, you would read the value like this:
  // <p>Current Count: {{ counter() }}</p>
}
```

#### `computed()`

A `computed` signal derives its value from other signals. It will automatically update whenever the signals it depends on change.

**Example: `src/app/signals-example/signals-example.component.ts`**

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({ /* ... */ })
export class SignalsExampleComponent {
  firstName = signal('John');
  lastName = signal('Doe');

  // Create a computed signal for the full name
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  // When firstName or lastName changes, fullName will automatically update.
  // In the template: <p>Full Name: {{ fullName() }}</p>
}
```

#### `effect()`

An `effect` is an operation that runs whenever one or more signal values change. It's useful for running side effects like logging, network requests, or manually updating the DOM. Effects are automatically tracked and re-executed when their dependencies change.

**Example: `src/app/signals-example/signals-example.component.ts`**

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({ /* ... */ })
export class SignalsExampleComponent {
  counter = signal(0);

  constructor() {
    // Create an effect that logs the counter's value
    effect(() => {
      console.log(`Counter value changed to: ${this.counter()}`);
    });
  }
}
```

### Using Signals in a Service

Signals are not limited to components. They are incredibly useful for managing shared state in services.

**Example: `src/app/signals-example/signals-example.service.ts`**

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsExampleService {
  // A signal to hold a message
  message = signal('Initial message from service');

  updateMessage(newMessage: string) {
    this.message.set(newMessage);
  }
}
```

Any component or service that injects `SignalsExampleService` can read the `message` signal and will see the updates automatically.

---

## Running the Examples

1.  Install the dependencies: `npm install`
2.  Run the development server: `ng serve`
3.  Open your browser to `http://localhost:4200/`.

*   Navigate to the **DI Scopes Demo** link to see the difference between singleton and component-scoped services in action.
*   Navigate to the **Signals Example** link to see how signals, computed signals, and effects work together.
