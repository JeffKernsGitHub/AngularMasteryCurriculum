import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes it a singleton available app-wide
})
export class SingletonService {
  private value = 0;

  getValue(): number {
    return this.value;
  }

  increment(): void {
    this.value++;
  }
}
