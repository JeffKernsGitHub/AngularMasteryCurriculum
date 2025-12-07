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

/**
 * {@code UserDetailsServiceImpl} is an implementation of Spring Security's {@link UserDetailsService}.
 * It is responsible for loading user-specific data during the authentication process.
 * This implementation uses an in-memory {@link Map} to store user credentials for demonstration purposes.
 * In a production application, this data would typically be retrieved from a persistent store like a database.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    /**
     * Autowired {@link PasswordEncoder} to encode passwords before storing them
     * and to compare them during authentication.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * An inner static class to hold user-specific data, including the encoded password and roles.
     * This helps in encapsulating user data for the in-memory store.
     */
    private static class UserData {
        final String password;
        final String[] roles;

        /**
         * Constructs a {@code UserData} object.
         * @param password The encoded password for the user.
         * @param roles The roles assigned to the user.
         */
        UserData(String password, String... roles) {
            this.password = password;
            this.roles = roles;
        }
    }

    /**
     * An in-memory {@link Map} to store user data, where the key is the username
     * and the value is a {@link UserData} object.
     */
    private final Map<String, UserData> userDataMap = new HashMap<>();

    /**
     * Initializes the in-memory user store with predefined users and their roles.
     * This method is called automatically after the bean's construction and dependency injection,
     * thanks to the {@link PostConstruct} annotation.
     * Passwords are encoded using the {@link PasswordEncoder}.
     */
    @PostConstruct
    public void init() {
        // Example users: "user" with role "USER" and "admin" with role "ADMIN".
        userDataMap.put("user", new UserData(passwordEncoder.encode("password"), "USER"));
        userDataMap.put("admin", new UserData(passwordEncoder.encode("admin"), "ADMIN"));
    }

    /**
     * Locates the user based on the username. In the event that the user is not found, the method
     * throws a {@link UsernameNotFoundException}.
     * This method is a core part of Spring Security's authentication flow.
     *
     * @param username The username identifying the user whose data is required.
     * @return A {@link UserDetails} object containing the user's username, encoded password, and authorities.
     * @throws UsernameNotFoundException if the user with the specified username could not be found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Check if the username exists in the in-memory map.
        if (userDataMap.containsKey(username)) {
            UserData userData = userDataMap.get(username);
            // Build and return a Spring Security UserDetails object.
            // A new UserDetails object is created for each request to ensure that the password is not
            // cleared from the original object after authentication.
            return User.builder()
                    .username(username)
                    .password(userData.password)
                    .roles(userData.roles) // Assign roles to the user.
                    .build();
        }
        // If the username is not found, throw an exception.
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
