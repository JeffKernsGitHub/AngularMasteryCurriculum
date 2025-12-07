package com.example.jwtauthservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * {@code SecurityConfig} is the main configuration class for Spring Security in this application.
 * It defines how HTTP requests are secured, including authentication, authorization, and session management.
 *
 * {@link Configuration} indicates that this class contains Spring configuration beans.
 * {@link EnableWebSecurity} enables Spring Security's web security support.
 * {@link EnableMethodSecurity} enables method-level security annotations like {@code @PreAuthorize}.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * Configures and provides a {@link PasswordEncoder} bean.
     * {@link BCryptPasswordEncoder} is used for strong hashing of passwords.
     *
     * @return A {@link BCryptPasswordEncoder} instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the {@link SecurityFilterChain} which defines the security rules for HTTP requests.
     * This includes CSRF protection, session management, authorization rules, and filter order.
     *
     * @param http            The {@link HttpSecurity} object to configure.
     * @param jwtAuthFilter   The custom {@link JwtAuthFilter} for JWT authentication.
     * @return A configured {@link SecurityFilterChain}.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                // Disable CSRF protection as it's not needed for stateless REST APIs using JWTs.
                .csrf(AbstractHttpConfigurer::disable)
                // Configure session management to be stateless.
                // This ensures that no HTTP session is created or used, which is essential for JWT-based authentication.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Define authorization rules for different request paths.
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to the login endpoint and public API endpoints.
                        .requestMatchers("/api/auth/login", "/api/public/**").permitAll()
                        // Require the "USER" role for access to "/api/user".
                        .requestMatchers("/api/user").hasRole("USER")
                        // Require the "ADMIN" role for access to "/api/admin".
                        .requestMatchers("/api/admin").hasRole("ADMIN")
                        // All other requests must be authenticated.
                        .anyRequest().authenticated()
                )
                // Add the custom JWT authentication filter before Spring Security's default
                // UsernamePasswordAuthenticationFilter to process JWTs first.
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Provides the {@link AuthenticationManager} bean, which is responsible for authenticating
     * authentication requests.
     *
     * @param authenticationConfiguration The {@link AuthenticationConfiguration} to retrieve the manager from.
     * @return The configured {@link AuthenticationManager}.
     * @throws Exception If an error occurs while getting the AuthenticationManager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
