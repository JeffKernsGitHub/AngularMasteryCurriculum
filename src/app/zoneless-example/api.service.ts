import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Simulate a GET request to fetch user data
  getUser(): Observable<{ firstName: string, lastName: string }> {
    console.log('API: Getting user data...');
    return of({ firstName: 'John', lastName: 'Doe' }).pipe(delay(500));
  }

  // Simulate a POST request to save user data
  saveUser(user: { firstName: string, lastName: string }): Observable<{ firstName: string, lastName: string }> {
    console.log('API: Saving user data...', user);
    return of(user).pipe(delay(500));
  }
}
