import { Injectable } from '@angular/core';

// Note: No `providedIn: 'root'`. This service will be provided
// by the component that uses it.
@Injectable()
export class ComponentScopedService {
  private value = 0;

  getValue(): number {
    return this.value;
  }

  increment(): void {
    this.value++;
  }
}
