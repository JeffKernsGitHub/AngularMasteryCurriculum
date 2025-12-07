package com.example.jwtauthservice.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    @PreAuthorize("permitAll")
    public String getPublic() {
        return "This is a public endpoint.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String getUser() {
        return "This is a user endpoint.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdmin() {
        return "This is an admin endpoint.";
    }
}
