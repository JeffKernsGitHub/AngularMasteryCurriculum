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
