package com.example.jwtauthservice.service;

import jakarta.annotation.PostConstruct; // Added import statement for @PostConstruct
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Map<String, UserDetails> users = new HashMap<>();

    @PostConstruct // Initialize the users map after passwordEncoder is injected
    public void init() {
        users.put("user", User.builder()
                .username("user")
                .password(passwordEncoder.encode("password"))
                .roles("USER")
                .build());
        users.put("admin", User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .roles("ADMIN")
                .build());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (users.containsKey(username)) {
            return users.get(username);
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}

