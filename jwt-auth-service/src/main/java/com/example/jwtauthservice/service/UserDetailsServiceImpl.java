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
 * The UserDetailsServiceImpl is an implementation of Spring Security's UserDetailsService.
 * Its purpose is to load user-specific data. In this case, it uses an in-memory map
 * to store user credentials. In a real application, this data would typically be fetched
 * from a database.
 */
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

    /**
     * The @PostConstruct annotation ensures that this method is called after the bean has been
     * initialized and its dependencies have been injected. Here, it's used to populate the
     * in-memory user store.
     */
    @PostConstruct
    public void init() {
        userDataMap.put("user", new UserData(passwordEncoder.encode("password"), "USER"));
        userDataMap.put("admin", new UserData(passwordEncoder.encode("admin"), "ADMIN"));
    }

    /**
     * This method is called by Spring Security when it needs to authenticate a user.
     * It loads the user's details by their username.
     *
     * @param username The username to look up.
     * @return A UserDetails object containing the user's credentials and roles.
     * @throws UsernameNotFoundException If the user is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (userDataMap.containsKey(username)) {
            UserData userData = userDataMap.get(username);
            // A new UserDetails object is created for each request to ensure that the password is not
            // cleared from the original object after authentication.
            return User.builder()
                    .username(username)
                    .password(userData.password)
                    .roles(userData.roles)
                    .build();
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
