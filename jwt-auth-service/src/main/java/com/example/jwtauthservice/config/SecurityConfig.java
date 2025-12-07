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
 * The @EnableWebSecurity annotation enables Spring Security's web security support.
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
                // CSRF (Cross-Site Request Forgery) protection is disabled. This is common for stateless APIs
                // where the client is not a web browser.
                .csrf(AbstractHttpConfigurer::disable)
                // The session management policy is set to STATELESS, meaning no session is created or maintained on the server.
                // This is essential for a JWT-based authentication system.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // This section configures the authorization rules for different endpoints.
                .authorizeHttpRequests(auth -> auth
                        // The /api/auth/login and /api/public endpoints are publicly accessible.
                        .requestMatchers("/api/auth/login", "/api/public").permitAll()
                        // The /api/user endpoint requires the "USER" role.
                        .requestMatchers("/api/user").hasRole("USER")
                        // The /api/admin endpoint requires the "ADMIN" role.
                        .requestMatchers("/api/admin").hasRole("ADMIN")
                        // All other requests must be authenticated.
                        .anyRequest().authenticated()
                )
                // The custom JwtAuthFilter is added to the filter chain before the standard UsernamePasswordAuthenticationFilter.
                // This ensures that the JWT is processed before any username/password authentication attempt.
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
