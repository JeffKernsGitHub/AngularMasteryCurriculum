# JwtAuthClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Authentication with JWT (JSON Web Tokens)

This application demonstrates a common approach to user authentication using JSON Web Tokens (JWTs). JWTs are a compact, URL-safe means of representing claims to be transferred between two parties.

### How JWT Authentication Works in this Application:

1.  **User Login**: When a user attempts to log in, their credentials (username and password) are sent to the backend server.
2.  **Token Issuance**: If the credentials are valid, the server generates a JWT. This token contains information about the user (e.g., user ID, roles) and is digitally signed by the server.
3.  **Token Storage**: The server sends the JWT back to the Angular client. The client then stores this token securely, typically in `localStorage` or `sessionStorage`. In this application, `localStorage` is used.
4.  **Authenticated Requests**: For subsequent requests to protected routes or resources, the Angular client includes the stored JWT in the `Authorization` header of the HTTP request (e.g., `Authorization: Bearer <token>`).
5.  **Token Verification**: The backend server intercepts these requests, verifies the JWT's signature, and extracts the user information from it. If the token is valid and not expired, the server processes the request.
6.  **Logout**: When a user logs out, the stored JWT is removed from `localStorage`, effectively ending the user's session on the client side.

### `AuthService` Explained (`src/app/services/auth.service.ts`)

The `AuthService` is the central place for handling all authentication-related logic in this Angular application.

*   **`AUTH_TOKEN_KEY`**: A private constant `auth_token` is used as the key for storing and retrieving the JWT from `localStorage`.
*   **`isAuthenticated` (Signal)**: An Angular `signal` that tracks the authentication status of the user. It's initialized based on whether a token already exists in `localStorage`. Signals provide a reactive way to manage state.
*   **`currentUser` (Signal)**: Another `signal` that holds the `User` object (username and roles) extracted from the JWT. It's `null` if no user is authenticated.
*   **`login(authRequest: AuthRequest)`**:
    *   Takes `AuthRequest` (containing username/password) as input.
    *   Sends a `POST` request to `/api/auth/login` on the backend.
    *   On successful response:
        *   Calls `setToken()` to store the received JWT.
        *   Updates `isAuthenticated` to `true`.
        *   Updates `currentUser` by decoding the new token.
        *   Navigates the user to the `/home` route.
    *   On error, it displays an alert and re-throws the error for further handling.
*   **`logout()`**:
    *   Calls `removeToken()` to clear the JWT from `localStorage`.
    *   Sets `isAuthenticated` to `false`.
    *   Sets `currentUser` to `null`.
    *   Navigates the user back to the `/login` route.
*   **`setToken(token: string)`**: A private helper method that stores the provided JWT string in `localStorage` using the `AUTH_TOKEN_KEY`.
*   **`getToken(): string | null`**: A public method to retrieve the JWT from `localStorage`.
*   **`removeToken()`**: A private helper method that removes the JWT from `localStorage`.
*   **`hasToken(): boolean`**: A private helper method that checks if a token exists in `localStorage`. Used for initializing `isAuthenticated`.
*   **`getUserFromToken(): User | null`**:
    *   Retrieves the token using `getToken()`.
    *   If a token exists, it uses the `jwtDecode` library to decode the token.
    *   Extracts the `username` (from the `sub` claim) and `roles` from the decoded token.
    *   Returns a `User` object or `null` if no token is present.

### Why JWT?

*   **Statelessness**: The server doesn't need to store session information, making it easier to scale.
*   **Security**: Tokens are signed, preventing tampering.
*   **Portability**: Can be used across different domains and services.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
