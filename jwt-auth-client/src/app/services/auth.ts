import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Import the jwtDecode function from the jwt-decode library
import { AuthRequest } from '../models/auth-request'; // Import the AuthRequest interface for login credentials
import { AuthResponse } from '../models/auth-response'; // Import the AuthResponse interface for the JWT token
import { User } from '../models/user'; // Import the User interface for user details
import { catchError, tap, throwError } from 'rxjs'; // Import RxJS operators for error handling and side effects

/**
 * Service for handling user authentication, including login, logout,
 * and managing the JWT token and user session.
 */
@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the application
})
export class AuthService {
  // Key used to store and retrieve the authentication token from local storage
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  // Signal to track the authentication status of the user.
  // Initialized based on whether a token already exists in local storage.
  isAuthenticated = signal<boolean>(this.hasToken());
  // Signal to store the currently authenticated user's details (username and roles).
  // Initialized by decoding the token if present, otherwise null.
  currentUser = signal<User | null>(this.getUserFromToken());

  /**
   * Constructor for AuthService.
   * @param http HttpClient for making HTTP requests to the backend.
   * @param router Router for navigating between application routes.
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Handles user login.
   * Sends user credentials to the backend and processes the authentication response.
   * @param authRequest An object containing the user's username and password.
   * @returns An Observable of AuthResponse, allowing for further chaining and error handling.
   */
  login(authRequest: AuthRequest) {
    // Make a POST request to the login API endpoint
    return this.http.post<AuthResponse>('/api/auth/login', authRequest).pipe(
      // Use the tap operator to perform side effects without altering the observable stream
      tap(response => {
        // Store the received JWT token in local storage
        this.setToken(response.token);
        // Update the authentication status signal to true
        this.isAuthenticated.set(true);
        // Update the current user signal by decoding the new token
        this.currentUser.set(this.getUserFromToken());
        // Navigate the user to the home page after successful login
        this.router.navigate(['/home']);
      }),
      // Use catchError to handle any HTTP errors during the login process
      catchError((error: HttpErrorResponse) => {
        // Display an alert with a user-friendly error message
        alert('Login failed: ' + (error.error?.message || error.statusText));
        // Re-throw the error to propagate it down the observable chain for further handling
        return throwError(() => error);
      })
    );
  }

  /**
   * Handles user logout.
   * Clears the authentication token and resets the user session.
   */
  logout() {
    // Remove the JWT token from local storage
    this.removeToken();
    // Update the authentication status signal to false
    this.isAuthenticated.set(false);
    // Clear the current user signal
    this.currentUser.set(null);
    // Navigate the user back to the login page
    this.router.navigate(['/login']);
  }

  /**
   * Stores the provided JWT token in local storage.
   * @param token The JWT string to be stored.
   */
  private setToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  /**
   * Retrieves the JWT token from local storage.
   * @returns The JWT token string or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Removes the JWT token from local storage.
   */
  private removeToken() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Checks if an authentication token exists in local storage.
   * @returns True if a token exists, false otherwise.
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Decodes the JWT token from local storage and extracts user information.
   * @returns A User object containing username and roles, or null if no token is present or invalid.
   */
  private getUserFromToken(): User | null {
    const token = this.getToken(); // Get the token from local storage
    if (token) {
      // Decode the JWT token. The jwt-decode library helps parse the token's payload.
      const decodedToken: any = jwtDecode(token);
      // Return a User object with extracted username (subject 'sub') and roles.
      // The 'sub' claim typically holds the principal (e.g., username).
      // Roles are expected to be in a 'roles' claim, defaulting to an empty array if not present.
      return {
        username: decodedToken.sub,
        roles: decodedToken.roles || []
      };
    }
    return null; // Return null if no token is found
  }
}
