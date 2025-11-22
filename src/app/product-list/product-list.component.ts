import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Products</h1>
    <input #searchInput (keyup.enter)="search(searchInput.value)" placeholder="Search for a product...">
    <ul>
      @for (product of filteredProducts; track product.id) {
        <li>
          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
        </li>
      }
    </ul>
  `
})
export class ProductListComponent implements OnInit {
  products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' }
  ];
  filteredProducts = this.products;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  search(term: string) {
    this.router.navigate(['/products'], { queryParams: { search: term } });
  }
}
