# JWT Authentication Service

This project is a simple, self-contained JWT (JSON Web Token) authentication service built with Spring Boot. It's designed to be a learning tool for Java developers who are new to the Spring Framework and want to understand how to implement secure, token-based authentication.

## What is Spring Boot?

Spring Boot is a framework that makes it easy to create stand-alone, production-grade Spring-based Applications that you can "just run". It takes an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

## Key Concepts for Java Developers

If you're a Java developer who hasn't used Spring before, here are some of the key concepts you'll encounter in this project:

*   **Dependency Injection (DI):** In traditional Java applications, you're responsible for creating and managing the lifecycle of your objects. In Spring, this is handled by the framework. You simply "declare" the dependencies your classes need (e.g., via constructor arguments), and Spring "injects" them for you. You can see this in `AuthController`, `JwtAuthFilter`, and `UserDetailsServiceImpl`.

*   **Annotations:** Spring makes extensive use of annotations to configure the application. Instead of XML files, you'll see annotations like `@RestController`, `@Service`, `@Autowired`, `@Bean`, and `@Configuration`. These annotations tell Spring how to wire up your application.

*   **Beans:** In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC (Inversion of Control) container are called "beans". In this project, classes like `JwtService` and `UserDetailsServiceImpl` are beans.

*   **Filters:** Filters are components that can intercept and process incoming HTTP requests. In this project, the `JwtAuthFilter` is a custom filter that checks for a valid JWT in the `Authorization` header of each request.

*   **Security Context:** The `SecurityContextHolder` is where Spring Security stores the details of the currently authenticated user. Our `JwtAuthFilter` sets this context if a valid JWT is found.

## Project Structure

*   `src/main/java/com/example/jwtauthservice/JwtAuthServiceApplication.java`: The main entry point for the Spring Boot application.
*   `src/main/java/com/example/jwtauthservice/config/WebConfig.java`: Configures web-related settings, including CORS (Cross-Origin Resource Sharing) to allow requests from specific origins.
*   `src/main/java/com/example/jwtauthservice/config/SecurityConfig.java`: This is the main security configuration file. It's where we define which endpoints are public, which are protected, and how the application should handle authentication and authorization.
*   `src/main/java/com/example/jwtauthservice/config/JwtAuthFilter.java`: This is a custom filter that runs on every request. It checks for a JWT in the `Authorization` header and, if it finds one, validates it and sets the security context.
*   `src/main/java/com/example/jwtauthservice/controller/ApiController.java`: A REST controller demonstrating API endpoint security with public, user-specific, and admin-specific access levels.
*   `src/main/java/com/example/jwtauthservice/controller/AuthController.java`: This is a REST controller that exposes the `/api/auth/login` endpoint. It's responsible for authenticating users and issuing JWTs.
*   `src/main/java/com/example/jwtauthservice/model/AuthRequest.java`: A simple POJO (Plain Old Java Object) representing the request body for authentication (username and password).
*   `src/main/java/com/example/jwtauthservice/model/AuthResponse.java`: A simple POJO representing the response body for authentication, containing the generated JWT.
*   `src/main/java/com/example/jwtauthservice/service/JwtService.java`: This service class is responsible for creating and validating JWTs.
*   `src/main/java/com/example/jwtauthservice/service/UserDetailsServiceImpl.java`: This class is an implementation of Spring Security's `UserDetailsService`. It's responsible for loading user data from our in-memory user store.
*   `pom.xml`: This is the Maven project configuration file. It defines the project's dependencies, such as Spring Boot, Spring Security, and the JJWT library.

## How to Run the Application

1.  Make sure you have Java 17 and Maven installed.
2.  From the root directory of the project, run the following command:

    ```bash
    mvn spring-boot:run
    ```

3.  The application will start on port 8080.

## How to Use the API

You can use a tool like `curl` or Postman to interact with the API.

### 1. Log in

To log in, send a `POST` request to `/api/auth/login` with a JSON body containing your username and password.

```bash
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"user","password":"password"}'
```

The response will be a JSON object containing a JWT:

```json
{"token":"your.jwt.here"}
```

### 2. Access a Protected Endpoint

To access a protected endpoint, include the JWT in the `Authorization` header of your request with the `Bearer` prefix.

```bash
curl http://localhost:8080/api/user \
-H "Authorization: Bearer your.jwt.here"
```

If the token is valid, you'll get a response from the endpoint. If not, you'll get a 403 Forbidden error.
