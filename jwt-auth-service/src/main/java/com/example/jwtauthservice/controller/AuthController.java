package com.example.jwtauthservice.controller;

import com.example.jwtauthservice.model.AuthRequest;
import com.example.jwtauthservice.model.AuthResponse;
import com.example.jwtauthservice.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The AuthController is a REST controller that handles authentication requests.
 * Spring's @RestController annotation marks this class as a request handler and ensures that
 * the return value of its methods is automatically serialized into JSON.
 */
@RestController
@RequestMapping("/api/auth") // Maps all requests starting with /api/auth to this controller.
public class AuthController {

    // Spring's dependency injection framework provides these dependencies at runtime.
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    /**
     * The constructor for AuthController. Spring automatically injects an AuthenticationManager
     * and a JwtService instance when this controller is created. This is known as constructor injection.
     *
     * @param authenticationManager Manages the authentication process.
     * @param jwtService            Service for generating and validating JWTs.
     */
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    /**
     * Handles POST requests to /api/auth/login.
     * The @PostMapping annotation maps this method to that specific endpoint and HTTP method.
     *
     * @param authRequest The request body, which Spring automatically deserializes from JSON into an AuthRequest object.
     * @return An AuthResponse containing the JWT.
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        // The AuthenticationManager attempts to authenticate the user with the provided credentials.
        // If authentication fails, it throws an exception.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        // If authentication is successful, the authenticated user's details are retrieved.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // A JWT is generated for the authenticated user.
        String token = jwtService.generateToken(userDetails);

        // The new JWT is returned in the response body.
        return new AuthResponse(token);
    }
}
