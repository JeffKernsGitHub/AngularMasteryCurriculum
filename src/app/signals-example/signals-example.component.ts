import { Component, signal, computed, effect } from '@angular/core';

import { SignalsExampleService } from './services/signals-example.service';

@Component({
  selector: 'app-signals-example',
  standalone: true,
  imports: [],
  templateUrl: './signals-example.component.html',
  styleUrls: ['./signals-example.component.scss'],
  providers: [SignalsExampleService]
})
export class SignalsExampleComponent {
  // Defining signals
  counter = signal(0);
  firstName = signal('John');
  lastName = signal('Doe');

  // Defining a computed signal
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  constructor(public signalsExampleService: SignalsExampleService) {
    // This component basically watches the SignalsExampleService and does something when
    // that service's signal is updated.
    effect(() => {
      console.log(`Counter value changed to: ${this.counter()}`);
    });
  }

  increment() {
    this.counter.update(c => c + 1);
    this.signalsExampleService.updateMessage(`Counter updated to ${this.counter()}`);
  }

  decrement() {
    this.counter.update(c => c - 1);
    this.signalsExampleService.updateMessage(`Counter updated to ${this.counter()}`);
  }

  updateName(firstName: string, lastName: string) {
    this.firstName.set(firstName);
    this.lastName.set(lastName);
  }
}
