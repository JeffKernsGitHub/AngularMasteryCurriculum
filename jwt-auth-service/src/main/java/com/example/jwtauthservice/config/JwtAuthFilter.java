package com.example.jwtauthservice.config;

import com.example.jwtauthservice.service.JwtService;
import com.example.jwtauthservice.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * The JwtAuthFilter is a custom filter that intercepts incoming HTTP requests to check for a valid JWT.
 * This filter extends {@link OncePerRequestFilter} to ensure it's executed only once per request.
 * It extracts the JWT from the Authorization header, validates it, and sets the authentication
 * in the Spring Security context, allowing subsequent security checks to pass.
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    /**
     * Constructor for JwtAuthFilter.
     * Spring automatically injects the required {@link JwtService} and {@link UserDetailsServiceImpl} beans.
     *
     * @param jwtService         Service for JWT token creation, validation, and extraction.
     * @param userDetailsService Service for loading user-specific data (UserDetails).
     */
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * This method is called for every incoming HTTP request.
     * It performs the following steps:
     * 1. Bypasses the filter for the login endpoint to allow unauthenticated access for token generation.
     * 2. Extracts the JWT from the "Authorization" header.
     * 3. If a token is found, it extracts the username.
     * 4. Validates the token and, if valid, sets the authentication in the Spring Security context.
     *
     * @param request     The incoming HTTP request.
     * @param response    The HTTP response.
     * @param filterChain The chain of filters to pass the request along to.
     * @throws ServletException If a servlet-specific error occurs.
     * @throws IOException      If an I/O error occurs.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Bypass JWT authentication for the login endpoint.
        // This allows users to obtain a new token even if they have an expired or invalid one,
        // preventing 403 errors on re-login attempts.
        // TODO: Consider implementing a more robust session management or token refresh mechanism
        // if strict token invalidation on logout is required.
        if (request.getServletPath().equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Check for the "Authorization" header and if it starts with "Bearer ".
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extract the JWT token by removing the "Bearer " prefix.
            token = authHeader.substring(7);
            // Extract the username from the JWT token.
            username = jwtService.extractUsername(token);
        }

        // If a username is extracted from the token and no authentication is currently set in the SecurityContext,
        // proceed to validate the token and authenticate the user.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from the database using the extracted username.
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Validate the JWT token against the loaded user details.
            if (jwtService.validateToken(token, userDetails)) {
                // Create an authentication token for the authenticated user.
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                // Set additional details from the request, such as remote address and session ID.
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Set the authentication object in the SecurityContext.
                // This marks the user as authenticated for the current request.
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain.
        // The request will either proceed to the next filter or the target servlet/controller.
        filterChain.doFilter(request, response);
    }
}
