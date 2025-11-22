import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  template: `
    @if (product) {
      <h1>{{ product.name }}</h1>
      <p>Product ID: {{ product.id }}</p>
    }
  `
})
export class ProductDetailComponent implements OnInit {
  product: any;
  products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.product = this.products.find(p => p.id === productId);
    });
  }
}
