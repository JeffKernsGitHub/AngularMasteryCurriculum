import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserData {
  firstName: string;
  lastName: string;
  department: string;
}

/**
 * =========================================================================================
 * ApiService - Asynchronous Mock Backend Service (Phase 4)
 * =========================================================================================
 *
 * Simulates backend HTTP interactions with realistic asynchronous network latency.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Simulates a GET request to fetch user data.
   */
  getUser(): Observable<UserData> {
    return of({
      firstName: 'Alex',
      lastName: 'Morgan',
      department: 'Cloud Platform Engineering'
    }).pipe(delay(600));
  }

  /**
   * Simulates a POST/PUT request to persist updated user data.
   */
  saveUser(user: UserData): Observable<UserData> {
    return of(user).pipe(delay(600));
  }
}
