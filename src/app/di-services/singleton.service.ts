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
