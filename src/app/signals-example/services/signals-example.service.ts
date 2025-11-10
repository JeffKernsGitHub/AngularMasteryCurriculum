import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsExampleService {
  message = signal('Initial message from service');

  constructor() { }

  updateMessage(newMessage: string) {
    this.message.set(newMessage);
  }
}
