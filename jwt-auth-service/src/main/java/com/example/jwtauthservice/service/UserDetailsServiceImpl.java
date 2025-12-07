package com.example.jwtauthservice.service;

import jakarta.annotation.PostConstruct;
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

    // Inner class to store user data to prevent modification of UserDetails
    private static class UserData {
        final String password;
        final String[] roles;

        UserData(String password, String... roles) {
            this.password = password;
            this.roles = roles;
        }
    }

    private final Map<String, UserData> userDataMap = new HashMap<>();

    @PostConstruct
    public void init() {
        userDataMap.put("user", new UserData(passwordEncoder.encode("password"), "USER"));
        userDataMap.put("admin", new UserData(passwordEncoder.encode("admin"), "ADMIN"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (userDataMap.containsKey(username)) {
            UserData userData = userDataMap.get(username);
            return User.builder()
                    .username(username)
                    .password(userData.password)
                    .roles(userData.roles)
                    .build();
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
