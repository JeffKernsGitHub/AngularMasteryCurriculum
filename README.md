# Angular Mastery Curriculum: Phase 3 - Routing & Navigation

Welcome to the **3.1Routes** branch of the **Angular Mastery Curriculum**! This repository demonstrates modern Angular 22 architecture for client-side Single Page Application (SPA) multi-page navigation, component lazy loading, dynamic path parameter binding, and query parameter search filtering in a native **Zoneless** environment.

---

## 🎯 Phase 3 Learning Objectives

* **Defining Routes & `<router-outlet />`**: Mapping URL paths to components and rendering dynamic views inside a persistent application layout.
* **Component Input Binding (`withComponentInputBinding()`)**:
  * Binding route path variables (`/products/:id`) directly to component **`input.required<string>()`** signals.
  * Binding URL query parameters (`/products?search=keyboard`) directly to component **`input<string>()`** signals.
  * Eliminating manual `ActivatedRoute.params` and `queryParams` RxJS subscriptions and memory leaks.
* **Lazy Loading (`loadComponent`)**: Splitting routes into discrete, on-demand JavaScript chunks loaded only when the user navigates to them.
* **Document Titles (`title`)**: Declarative route titles update document metadata without custom services.
* **Programmatic Navigation (`Router.navigate()`)**: Triggering URL updates and passing query parameters imperatively.
* **Functional Route Guards (`CanActivateFn`)**: Securing navigation using modern lightweight functional guards.
* **Native Zoneless Architecture (`provideZonelessChangeDetection`)**: Signal-driven change detection without Zone.js.

---

## 🏛️ Project Structure (`3.1Routes`)

```
src/
├── app/
│   ├── about/
│   │   └── about.component.ts             # Lazy loaded informational route
│   ├── home/
│   │   └── home.component.ts              # Landing page component
│   ├── product-detail/
│   │   └── product-detail.component.ts    # Path parameter input binding demo (:id)
│   ├── product-list/
│   │   └── product-list.component.ts      # Query parameter input binding demo (?search=)
│   ├── app.config.ts                      # provideZonelessChangeDetection, provideRouter(..., withComponentInputBinding())
│   ├── app.html                           # Header navigation and <router-outlet /> shell
│   ├── app.routes.ts                      # Lazy route definitions with titles & fallback
│   ├── app.scss                           # Global application theme
│   ├── app.spec.ts                        # Root component unit tests
│   └── app.ts                             # Root standalone component
├── main.ts                                # Application bootstrap entry point
└── styles.scss                            # Global styles entry point
```

---

## 🔑 Core Concepts & Methods Explained

### 1. Enabling Component Input Binding

In `src/app/app.config.ts`, `withComponentInputBinding()` configures the Angular Router to inject route parameters directly into component inputs:

```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding())
  ]
};
```

---

### 2. Path Parameter Binding (`/products/:id`)

When navigating to `/products/2`, Angular automatically binds the `2` string to `id = input.required<string>()`:

```typescript
@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    @if (product(); as item) {
      <h2>{{ item.name }}</h2>
      <p>Price: {{ item.price | currency:'USD':'symbol' }}</p>
    }
  `
})
export class ProductDetailComponent {
  // 🆔 Bound automatically from path: 'products/:id'
  readonly id = input.required<string>();

  readonly products = signal<Product[]>([...]);

  // 🔍 Computed derived lookup - updates automatically whenever :id changes
  readonly product = computed(() =>
    this.products().find(p => p.id === +this.id())
  );
}
```

---

### 3. Query Parameter Binding (`/products?search=keyboard`)

When navigating to `/products?search=keyboard`, Angular automatically binds the search string to `search = input<string>('')`:

```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    @for (product of filteredProducts(); track product.id) {
      <div>{{ product.name }}</div>
    } @empty {
      <p>No products found matching "{{ search() }}".</p>
    }
  `
})
export class ProductListComponent {
  private readonly router = inject(Router);

  // 🔍 Bound automatically from URL query param: ?search=term
  readonly search = input<string>('');

  readonly products = signal<Product[]>([...]);

  // 📊 Computed derived filtering - updates automatically when query param changes
  readonly filteredProducts = computed(() => {
    const term = (this.search() || '').toLowerCase().trim();
    if (!term) return this.products();
    return this.products().filter(p => p.name.toLowerCase().includes(term));
  });

  onSearch(term: string): void {
    this.router.navigate(['/products'], {
      queryParams: { search: term || null }
    });
  }
}
```

---

### 4. Lazy Loading Architecture

Every route is chunked and loaded on-demand:

```typescript
export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'products/:id', loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: '**', redirectTo: '' }
];
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
* **Home (`/`)**: Landing page.
* **Products (`/products`)**: Test query parameter search filtering (`?search=keyboard`).
* **Product Detail (`/products/:id`)**: Click any product to test path parameter input binding.
* **About (`/about`)**: View on-demand lazy loading chunk behavior.
