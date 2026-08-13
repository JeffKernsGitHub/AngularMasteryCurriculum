import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../product-list/product-list.component';

/**
 * =========================================================================================
 * ProductDetailComponent - Route Path Parameter Binding (Phase 3)
 * =========================================================================================
 *
 * Demonstrates modern Angular route path parameter binding:
 *
 * 1. Path Parameter Input Signal (`input.required<string>()`):
 *    - Because `withComponentInputBinding()` is configured in `app.config.ts`, the `:id` path
 *      parameter is bound directly into `id = input.required<string>()`.
 *    - Eliminates constructor injection of `ActivatedRoute` and manual `.params.subscribe()`.
 *
 * 2. Memoized Derived Lookup with `computed()`:
 *    - `product = computed(() => ...)` automatically looks up the item whenever `this.id()` changes.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="product-detail-card">
      <div class="nav-bar">
        <a routerLink="/products" class="btn-back">&larr; Back to Products</a>
      </div>

      <!-- Control Flow: Check if product exists for this ID -->
      @if (product(); as item) {
        <div class="product-header">
          <div class="title-group">
            <span class="category-badge">{{ item.category }}</span>
            <h2>{{ item.name }}</h2>
          </div>
          <span class="stock-badge" [class.in-stock]="item.inStock" [class.out-of-stock]="!item.inStock">
            {{ item.inStock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>

        <div class="detail-body">
          <div class="meta-row">
            <span class="meta-label">Product ID:</span>
            <code>{{ item.id }}</code>
          </div>

          <div class="meta-row">
            <span class="meta-label">Price:</span>
            <span class="price">{{ item.price | currency:'USD':'symbol' }}</span>
          </div>

          <div class="description-section">
            <h3>Description</h3>
            <p>{{ item.description }}</p>
          </div>

          <div class="binding-info-box">
            <h4>💡 Route Binding Note:</h4>
            <p>
              This product was retrieved using <code>id = input.required&lt;string&gt;()</code> bound
              automatically from the route path <code>/products/:id</code>.
            </p>
          </div>
        </div>
      } @else {
        <div class="not-found-state">
          <h3>Product Not Found</h3>
          <p>No product exists with ID: <code>{{ id() }}</code>.</p>
          <a routerLink="/products" class="btn btn-primary">Return to Catalog</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .product-detail-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      max-width: 650px;
      margin: 0 auto;
    }
    .nav-bar { margin-bottom: 1.25rem; }
    .btn-back {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      &:hover { text-decoration: underline; }
    }
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f1f5f9;
      h2 { margin: 0.25rem 0 0 0; color: #0f172a; font-size: 1.5rem; }
      .category-badge {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: #64748b;
      }
    }
    .stock-badge {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      &.in-stock { background: #dcfce7; color: #166534; }
      &.out-of-stock { background: #fee2e2; color: #991b1b; }
    }
    .detail-body {
      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        .meta-label { font-size: 0.85rem; font-weight: 600; color: #475569; }
        code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; }
        .price { font-size: 1.35rem; font-weight: 700; color: #16a34a; }
      }
      .description-section {
        margin: 1.25rem 0;
        h3 { margin: 0 0 0.5rem 0; font-size: 1rem; color: #334155; }
        p { margin: 0; color: #475569; line-height: 1.5; font-size: 0.95rem; }
      }
    }
    .binding-info-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 0.85rem 1rem;
      margin-top: 1.5rem;
      h4 { margin: 0 0 0.35rem 0; color: #1d4ed8; font-size: 0.9rem; }
      p { margin: 0; color: #1e3a8a; font-size: 0.85rem; line-height: 1.4; }
      code { background: rgba(255, 255, 255, 0.7); padding: 0.1rem 0.3rem; border-radius: 3px; }
    }
    .not-found-state {
      text-align: center;
      padding: 2rem 1rem;
      h3 { color: #dc2626; margin: 0 0 0.5rem 0; }
      p { color: #64748b; margin: 0 0 1.25rem 0; }
    }
    .btn-primary {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      &:hover { background-color: #1d4ed8; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  /**
   * 🆔 Route Path Parameter Input Signal: Bound from `/products/:id` in URL.
   */
  readonly id = input.required<string>();

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
   * 🔍 Computed Product Lookup: Finds product matching the `:id` input signal.
   */
  readonly product = computed(() => {
    const targetId = +this.id();
    return this.products().find(p => p.id === targetId);
  });
}
