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
 * {@code AuthController} is a REST controller responsible for handling user authentication requests.
 * It exposes an endpoint for user login, which authenticates credentials and issues a JWT.
 *
 * {@link RestController} combines {@code @Controller} and {@code @ResponseBody},
 * meaning every method returns a domain object instead of a view, and the domain object
 * is converted directly into JSON/XML.
 */
@RestController
@RequestMapping("/api/auth") // Base path for all authentication-related endpoints.
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    /**
     * Constructs an {@code AuthController} with the necessary dependencies.
     * Spring's dependency injection automatically provides instances of {@link AuthenticationManager}
     * and {@link JwtService}.
     *
     * @param authenticationManager The {@link AuthenticationManager} to handle authentication attempts.
     * @param jwtService            The {@link JwtService} for generating and managing JWTs.
     */
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    /**
     * Handles user login requests.
     *
     * This method receives user credentials (username and password) in the request body,
     * attempts to authenticate them, and if successful, generates and returns a JWT.
     *
     * @param authRequest An {@link AuthRequest} object containing the username and password.
     * @return An {@link AuthResponse} object containing the generated JWT.
     * @throws org.springframework.security.core.AuthenticationException if authentication fails.
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        // Attempt to authenticate the user with the provided username and password.
        // If authentication fails, an AuthenticationException will be thrown.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        // Retrieve the authenticated user's details.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate a JWT for the authenticated user.
        String token = jwtService.generateToken(userDetails);

        // Return the JWT in an AuthResponse object.
        return new AuthResponse(token);
    }
}
