import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { User } from './user';

/**
 * =========================================================================================
 * ApiService - Modern Angular 22 Dependency Injection & HTTP Communication
 * =========================================================================================
 *
 * This service handles HTTP communication with external REST endpoints.
 *
 * Key Concepts & Best Practices:
 *
 * 1. Singleton Scope (`providedIn: 'root'`):
 *    - Registers this service with the application-level Root Injector.
 *    - Guarantees a single shared instance throughout the entire application lifecycle
 *      and enables tree-shaking if the service is unused.
 *
 * 2. Modern Idiomatic Dependency Injection (`inject()`):
 *    - Uses `inject(HttpClient)` directly in class property initializers.
 *    - Replaces boilerplate constructor parameter injection (`constructor(private http: HttpClient)`).
 *    - `inject()` can also be cleanly used inside functional guards, resolvers, and utility functions.
 *
 * 3. Type Safety with TypeScript Interfaces:
 *    - Generics like `this.http.get<Post[]>` and `this.http.get<User[]>` ensure that
 *      the emitted Observable streams strictly match our defined TypeScript data models.
 *
 * 4. Separation of Concerns (SoC):
 *    - Keeps components presentation-focused while isolating API endpoints, request configurations,
 *      and base URL management inside dedicated service classes.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * 🌐 Modern Dependency Injection using `inject()`
   * In Angular 22, `inject()` is the idiomatic standard for dependency resolution.
   */
  private readonly http = inject(HttpClient);

  /**
   * Base API endpoint URL (mock REST API for demonstration).
   */
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * Fetches an array of blog posts from the API.
   *
   * @returns An `Observable<Post[]>` stream emitting the list of retrieved posts.
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  /**
   * Fetches an array of users from the API.
   *
   * @returns An `Observable<User[]>` stream emitting the list of retrieved users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}

