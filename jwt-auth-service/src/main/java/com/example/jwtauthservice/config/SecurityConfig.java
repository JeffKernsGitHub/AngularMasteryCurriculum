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
 * The SecurityConfig class is where all security-related configuration for the application is defined.
 * The @Configuration annotation indicates that this class contains Spring configuration.
 * The @EnableWebSecurity annotation enables Spring Security's web security support and provides the Spring MVC integration.
 * The @EnableMethodSecurity annotation enables method-level security, allowing for checks like @PreAuthorize
 * on controller methods.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * This @Bean method defines a PasswordEncoder, which is used to hash passwords.
     * BCrypt is a strong, widely-used hashing algorithm.
     *
     * @return A BCryptPasswordEncoder instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * This @Bean method configures the security filter chain, which defines how requests are secured.
     *
     * @param http            The HttpSecurity object to configure.
     * @param jwtAuthFilter   The custom JWT authentication filter.
     * @return A SecurityFilterChain object.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                // Disable CSRF (Cross-Site Request Forgery) protection.
                // This is common for stateless REST APIs that use tokens for authentication instead of cookies.
                .csrf(AbstractHttpConfigurer::disable)
                // Set the session management policy to STATELESS.
                // This tells Spring Security not to create or use any HTTP session, which is crucial for a stateless JWT-based API.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configure authorization rules for HTTP requests.
                .authorizeHttpRequests(auth -> auth
                        // Permit all requests to the login and public endpoints (and their sub-paths) without authentication.
                        .requestMatchers("/api/auth/login", "/api/public/**").permitAll()
                        // Require the "USER" role for any request to endpoints under /api/user.
                        .requestMatchers("/api/user").hasRole("USER")
                        // Require the "ADMIN" role for any request to endpoints under /api/admin.
                        .requestMatchers("/api/admin").hasRole("ADMIN")
                        // All other requests to the application must be authenticated.
                        .anyRequest().authenticated()
                )
                // Add the custom JwtAuthFilter to the filter chain before the UsernamePasswordAuthenticationFilter.
                // This ensures that the JWT token is validated on every request before Spring Security attempts to process username/password credentials.
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * This @Bean method provides the AuthenticationManager, which is responsible for authenticating users.
     *
     * @param authenticationConfiguration The authentication configuration.
     * @return An AuthenticationManager instance.
     * @throws Exception If an error occurs.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
