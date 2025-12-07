package com.example.jwtauthservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * The JwtService is a Spring @Service responsible for all JWT-related operations,
 * including creating, parsing, and validating tokens.
 */
@Service
public class JwtService {

    // A secure key is generated for signing the JWTs. In a real-world application,
    // this key should be stored securely and not hard-coded.
    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();

    /**
     * Extracts the username (subject) from a JWT.
     *
      * @param token The JWT.
     * @return The username.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from a JWT.
     *
     * @param token The JWT.
     * @return The expiration date.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * A generic method to extract a specific claim from a JWT.
     *
     * @param token          The JWT.
     * @param claimsResolver A function to apply to the claims.
     * @param <T>            The type of the claim.
     * @return The claim.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses a JWT and returns all its claims.
     *
     * @param token The JWT.
     * @return The claims.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

    /**
     * Checks if a JWT is expired.
     *
     * @param token The JWT.
     * @return True if the token is expired, false otherwise.
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Generates a new JWT for a given user.
     *
     * @param userDetails The user's details.
     * @return The generated JWT.
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    /**
     * Creates a new JWT with the specified claims and subject.
     *
     * @param claims  The claims to include in the token.
     * @param subject The subject of the token (usually the username).
     * @return The JWT as a string.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15)) // Token is valid for 15 minutes
                .signWith(secretKey)
                .compact();
    }

    /**
     * Validates a JWT. A token is considered valid if the username matches and it's not expired.
     *
     * @param token       The JWT.
     * @param userDetails The user's details.
     * @return True if the token is valid, false otherwise.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
