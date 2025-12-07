package com.example.jwtauthservice.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for demonstrating API endpoint security with different access levels.
 * Endpoints are configured to be public, user-specific, or admin-specific.
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    /**
     * Handles requests to the public endpoint.
     * This endpoint is accessible to all users, authenticated or not.
     *
     * @return A string indicating that this is a public endpoint.
     */
    @GetMapping("/public")
    @PreAuthorize("permitAll")
    public String getPublic() {
        return "This is a public endpoint.";
    }

    /**
     * Handles requests to the user-specific endpoint.
     * This endpoint requires the authenticated user to have the 'USER' role.
     *
     * @return A string indicating that this is a user endpoint.
     */
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String getUser() {
        return "This is a user endpoint.";
    }

    /**
     * Handles requests to the admin-specific endpoint.
     * This endpoint requires the authenticated user to have the 'ADMIN' role.
     *
     * @return A string indicating that this is an admin endpoint.
     */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdmin() {
        return "This is an admin endpoint.";
    }
}
