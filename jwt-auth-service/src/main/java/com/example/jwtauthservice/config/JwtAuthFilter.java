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
 * Spring's @Component annotation allows this class to be automatically detected and registered as a bean.
 * It extends OncePerRequestFilter to ensure it's executed only once per request.
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    /**
     * Constructor for JwtAuthFilter. Spring injects the required services.
     *
     * @param jwtService         Service for JWT-related operations.
     * @param userDetailsService Service for loading user-specific data.
     */
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * This method is called for every request. It inspects the "Authorization" header for a JWT,
     * and if one is found, it validates it and sets the authentication context.
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

        // TODO: Enhance security by implementing a token blacklist or a more robust session management strategy.
        // This change bypasses the JWT filter for the login endpoint to allow users to re-authenticate and get a new token
        // even if they already have a valid one. While this fixes the immediate issue of 403 errors on a second login attempt,
        // it means that old, unexpired tokens remain valid until they expire.
        if (request.getServletPath().equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // A JWT is expected in the "Authorization" header with the "Bearer " prefix.
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtService.extractUsername(token);
        }

        // If a username is extracted and there's no existing authentication in the security context,
        // it proceeds to validate the token.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // If the token is valid, an authentication token is created and set in the SecurityContext.
            // This is how Spring Security knows the user is authenticated.
            if (jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // The request is passed along to the next filter in the chain.
        filterChain.doFilter(request, response);
    }
}
