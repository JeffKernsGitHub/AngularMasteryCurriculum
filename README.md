# Angular Mastery Curriculum - JWT Authentication

This project contains a complete, working example of a modern web application with a separate frontend and backend, demonstrating JWT (JSON Web Token) authentication.

It consists of two main parts:

1.  **`jwt-auth-client`**: An Angular frontend application.
2.  **`jwt-auth-service`**: A Spring Boot backend application that provides a REST API and handles authentication.

## Overview

This project is designed as a learning tool to demonstrate how to:

*   Create a secure login system using JWT.
*   Separate frontend and backend development.
*   Use Angular for the frontend.
*   Use Spring Boot for the backend.
*   Configure Cross-Origin Resource Sharing (CORS) to allow the frontend and backend to communicate.

## Projects

### 1. JWT Authentication Client (Angular)

The `jwt-auth-client` directory contains the Angular application.

**Key Features:**

*   User login and logout.
*   Secure storage of JWTs in the browser's `localStorage`.
*   An `AuthService` to manage authentication state.
*   An HTTP interceptor to automatically add the JWT to the `Authorization` header of outgoing requests.
*   Route guards to protect routes that require authentication.

**To run the Angular client:**

1.  Navigate to the `jwt-auth-client` directory:
    ```bash
    cd jwt-auth-client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    ng serve
    ```
4.  Open your browser to `http://localhost:4200`.

### 2. JWT Authentication Service (Spring Boot)

The `jwt-auth-service` directory contains the Spring Boot backend.

**Key Features:**

*   A `/api/auth/login` endpoint for authenticating users and issuing JWTs.
*   In-memory user storage for demonstration purposes.
*   A `JwtAuthFilter` to validate JWTs on incoming requests.
*   Spring Security configuration for protecting API endpoints.
*   CORS configuration to allow requests from the Angular frontend.

**To run the Spring Boot service:**

1.  Make sure you have Java 17 and Maven installed.
2.  Navigate to the `jwt-auth-service` directory:
    ```bash
    cd jwt-auth-service
    ```
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
4.  The service will start on `http://localhost:8080`.

## How They Work Together

1.  The Angular application (running on `localhost:4200`) sends a login request to the Spring Boot service (running on `localhost:8080`).
2.  The Spring Boot service validates the credentials and, if they are correct, returns a JWT.
3.  The Angular application stores the JWT and sends it with every subsequent request to a protected API endpoint.
4.  The Spring Boot service validates the JWT on each request to ensure the user is authenticated.
