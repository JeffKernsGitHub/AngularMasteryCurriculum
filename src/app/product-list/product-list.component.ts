import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  input,
  inject
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

/**
 * Interface representing a product in our store catalog.
 */
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
}

/**
 * =========================================================================================
 * ProductListComponent - Query Parameter Binding & Reactive Filtering (Phase 3)
 * =========================================================================================
 *
 * Demonstrates modern Angular routing and input binding:
 *
 * 1. Query Parameter Input Binding:
 *    - `search = input<string>('')` is bound automatically from URL query parameters (e.g. `?search=angular`)
 *      because `withComponentInputBinding()` is configured in `app.config.ts`.
 *    - No manual `ActivatedRoute.queryParams.subscribe()` needed!
 *
 * 2. Synchronous Derived Filtering with `computed()`:
 *    - `filteredProducts` automatically tracks `this.search()` and `this.products()`.
 *    - When the user searches, the URL updates, the input signal updates, and `computed()`
 *      re-filters the array instantly.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="product-catalog-card">
      <div class="header-section">
        <h2>🛍️ Products Catalog</h2>
        <p class="subtitle">
          Query parameter input binding demo: Try searching below to see URL query parameters update reactively.
        </p>
      </div>

      <!-- Search Input Toolbar -->
      <div class="search-toolbar">
        <label for="searchInput" class="sr-only">Search products</label>
        <input
          #searchInput
          id="searchInput"
          type="text"
          [value]="search()"
          (keyup.enter)="onSearch(searchInput.value)"
          placeholder="Search products by name or category (Press Enter)..."
        />
        <button type="button" class="btn btn-search" (click)="onSearch(searchInput.value)">
          Search
        </button>
        @if (search()) {
          <button type="button" class="btn btn-clear" (click)="clearSearch(searchInput)">
            Clear Filter
          </button>
        }
      </div>

      <!-- Active Filter Status -->
      @let currentFilter = search();
      @if (currentFilter) {
        <div class="active-filter-badge">
          <span>Active Filter: <strong>"{{ currentFilter }}"</strong></span>
          <span>({{ filteredProducts().length }} matching items)</span>
        </div>
      }

      <!-- Products Grid -->
      <div class="products-grid">
        @for (product of filteredProducts(); track product.id) {
          <div class="product-item">
            <div class="product-info">
              <span class="category-badge">{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>
              <span class="price">{{ product.price | currency:'USD':'symbol' }}</span>
            </div>
            <div class="product-actions">
              <a [routerLink]="['/products', product.id]" class="btn btn-view">
                View Details &rarr;
              </a>
            </div>
          </div>
        } @empty {
          <div class="empty-state">
            <p>No products found matching "{{ currentFilter }}".</p>
            <button type="button" class="btn btn-search" (click)="clearSearch(searchInput)">
              Show All Products
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .product-catalog-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }
    .header-section {
      margin-bottom: 1.25rem;
      h2 { margin: 0 0 0.25rem 0; color: #1e293b; font-size: 1.5rem; }
      .subtitle { margin: 0; color: #64748b; font-size: 0.9rem; }
    }
    .search-toolbar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      input {
        flex: 1;
        padding: 0.6rem 0.85rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.95rem;
        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
      }
    }
    .active-filter-badge {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    .product-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .category-badge {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: #64748b;
        display: block;
        margin-bottom: 0.25rem;
      }
      h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #0f172a; }
      .description { font-size: 0.85rem; color: #475569; margin: 0 0 0.75rem 0; line-height: 1.4; }
      .price { font-size: 1.15rem; font-weight: 700; color: #16a34a; display: block; margin-bottom: 0.75rem; }
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem 1rem;
      color: #64748b;
      p { margin: 0 0 1rem 0; font-size: 1rem; }
    }
    .btn {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s ease;
      &-search { background-color: #2563eb; color: #ffffff; &:hover { background-color: #1d4ed8; } }
      &-clear { background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; &:hover { background-color: #e2e8f0; } }
      &-view { display: block; text-align: center; background-color: #e0f2fe; color: #0369a1; &:hover { background-color: #bae6fd; } }
    }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private readonly router = inject(Router);

  /**
   * 🔍 Query Parameter Signal: Bound from `?search=xyz` in URL.
   */
  readonly search = input<string>('');

  /**
   * 📦 Static Product Catalog State.
   */
  readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Mechanical Keyboard Pro',
      category: 'Peripherals',
      price: 149.99,
      description: 'Hot-swappable RGB mechanical keyboard with custom linear switches.',
      inStock: true
    },
    {
      id: 2,
      name: 'Wireless Precision Mouse',
      category: 'Peripherals',
      price: 79.99,
      description: 'Ergonomic wireless mouse with ultra-low latency sensor.',
      inStock: true
    },
    {
      id: 3,
      name: 'UltraWide 4K Monitor',
      category: 'Displays',
      price: 599.99,
      description: '34-inch curved IPS display with HDR600 and 144Hz refresh rate.',
      inStock: true
    },
    {
      id: 4,
      name: 'Noise-Cancelling Headphones',
      category: 'Audio',
      price: 249.99,
      description: 'Over-ear Bluetooth headphones with active hybrid noise cancellation.',
      inStock: false
    }
  ]);

  /**
   * 📊 Computed Filtered Products: Derived automatically from `this.search()` query param.
   */
  readonly filteredProducts = computed(() => {
    const term = (this.search() || '').toLowerCase().trim();
    if (!term) {
      return this.products();
    }
    return this.products().filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  /**
   * 🚀 Updates the URL query parameters using Angular Router.
   */
  onSearch(term: string): void {
    const trimmed = term.trim();
    this.router.navigate(['/products'], {
      queryParams: { search: trimmed || null } // null removes the query parameter
    });
  }

  /**
   * 🧹 Clears the search filter from input and URL.
   */
  clearSearch(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.onSearch('');
  }
}
