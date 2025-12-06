  1. Java Spring Boot JWT Authentication Service (jwt-auth-service)

  This application is a standard Maven-based Spring Boot microservice that provides JWT-based authentication and authorization.

  Key Features:

   * Authentication: A login endpoint (/api/auth/login) that accepts a username and password and returns a JWT.
   * Authorization:
       * Three endpoints (/api/public, /api/user, /api/admin) with different access levels.
       * Role-based access control using Spring Security's @PreAuthorize annotation.
   * Users: Two hardcoded users:
       * Username: user, Password: password, Role: USER
       * Username: admin, Password: admin, Role: ADMIN
   * NIST Compliance: JWTs are set to expire after 15 minutes of inactivity, following the recommendations in the provided NISTSessionStandards.md document for AAL3.
   * Security: Uses BCryptPasswordEncoder for password encoding and a secure HMAC-SHA-256 algorithm for signing JWTs.

  2. Angular 21 Zoneless Client (jwt-auth-client)

  This is a modern Angular application built with the latest features to demonstrate how a client application consumes a JWT-protected API.

  Key Features:

   * Angular 21: Built with the latest version of Angular.
   * Zoneless: Uses Angular's new zoneless change detection for improved performance.
   * Signals: Leverages signals for reactive state management of authentication status and user information.
   * Component-Based: A clean, component-based architecture with separate components for login, home, user-specific, and admin-specific views.
   * HTTP Interceptor: An interceptor automatically attaches the JWT to all outgoing API requests.
   * Route Guards: A CanActivate guard protects routes, ensuring only authenticated users with the correct roles can access them.
   * CORS: A proxy is configured to forward API requests from http://localhost:4200 to the Spring Boot backend at http://localhost:8080, avoiding cross-origin issues.

  How to Run the Applications

  You will need two separate terminal windows to run both the backend and frontend servers.

  Terminal 1: Run the Java Backend

   1. Navigate to the jwt-auth-service directory:
   1     cd jwt-auth-service
   2. Start the Spring Boot application using Maven:

   1     mvn spring-boot:run
      The backend server will start on http://localhost:8080.

  Terminal 2: Run the Angular Frontend

   1. Navigate to the jwt-auth-client directory:
   1     cd jwt-auth-client
   2. Start the Angular development server:
   1     ng serve
      The frontend application will be available at http://localhost:4200.

  How to Use the Demo

   1. Open your browser and navigate to http://localhost:4200.
   2. You will be on the home page, where you can see a public message from the backend. You will be prompted to log in.
   3. Click the "log in" link to navigate to the login page.
   4. Log in as a standard user:
       * Username: user
       * Password: password
   5. After logging in, you will be redirected to the home page, where you'll see a welcome message with your username. You can now access the "User Page" but will be denied
      access to the "Admin Page".
   6. Log out and log in as an admin user:
       * Username: admin
       * Password: admin
   7. Now you can access both the "User Page" and the "Admin Page".
