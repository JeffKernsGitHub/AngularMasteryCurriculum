# Angular Mastery: Dependency Injection & Services

This project demonstrates key concepts of Dependency Injection (DI) and services in Angular.

## Understanding the Injector Hierarchy

In Angular, injectors are responsible for creating and providing service instances. They have a hierarchical structure that parallels the component tree.

*   **Root Injector:** At the top of the hierarchy is the root injector, created when the application starts. Services provided in the root injector are available to all components in the application.
*   **Component Injectors:** Each component can have its own injector. When a component requests a dependency, Angular first checks the component's own injector. If the dependency is not found, it walks up the injector hierarchy until it finds an injector that can provide it.

## Creating and Providing Services

### Singleton Services

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

### Component-Scoped Services

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

**Example: `src/app/di-services.component.ts`**

```typescript
import { Component, inject } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

@Component({
  selector: 'app-di-services',
  templateUrl: './di-services.component.html',
  styleUrls: ['./di-services.component.scss'],
  providers: [ComponentScopedService] // Provided here
})
export class DiServicesComponent {
  // ...
}
```

In this example, a new instance of `ComponentScopedService` is created for each `DiServicesComponent` instance.

## Using the `inject()` Function

The `inject()` function is a modern and preferred way to get a dependency inside a component or another service. It can only be called in an injection context (like a component's constructor, a factory function, or a field initializer).

**Example: `src/app/di-services.component.ts`**

```typescript
import { Component, inject } from '@angular/core';
import { SingletonService } from './singleton.service';
import { ComponentScopedService } from './component-scoped.service';

@Component({
  // ...
})
export class DiServicesComponent {
  singletonService = inject(SingletonService);
  componentScopedService = inject(ComponentScopedService);
}
```

## Separation of Concerns

Services help in separating business logic from presentation logic (which resides in the component). This makes your code:

*   **Cleaner and more readable:** Components are focused on displaying data and handling user events.
*   **Easier to maintain:** Business logic is centralized in one place.
*   **More testable:** You can test your business logic independently of your components.

In this project, the `SingletonService` and `ComponentScopedService` contain the business logic (incrementing and getting a value), while the `DiServicesComponent` is only responsible for displaying the data and calling the service methods.

## Running the Example

1.  Install the dependencies: `npm install`
2.  Run the development server: `ng serve`
3.  Open your browser to `http://localhost:4200/`.

You will see two sections. When you click the "Increment" button in the "Singleton Service" section, the value will increase. If you had multiple instances of `DiServicesComponent`, they would all share the same value.

When you click the "Increment" button in the "Component-Scoped Service" section, the value will also increase. However, if you had multiple instances of `DiServicesComponent`, each would have its own independent value for the component-scoped service.
