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
 * {@code JwtService} is a Spring {@link Service} responsible for all JSON Web Token (JWT) related operations.
 * This includes generating, parsing, validating, and extracting information from JWTs.
 */
@Service
public class JwtService {

    // A secure key used for signing and verifying JWTs.
    // In a production environment, this key should be loaded from a secure configuration
    // (e.g., environment variable, key vault) and not hard-coded.
    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();

    /**
     * Extracts the username (subject) from the provided JWT.
     *
     * @param token The JWT from which to extract the username.
     * @return The username (subject) contained within the JWT.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from the provided JWT.
     *
     * @param token The JWT from which to extract the expiration date.
     * @return The {@link Date} when the token expires.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * A generic method to extract a specific claim from a JWT.
     * This method takes a function that resolves the desired claim from the {@link Claims} object.
     *
     * @param token          The JWT from which to extract the claim.
     * @param claimsResolver A {@link Function} that takes {@link Claims} and returns the desired type {@code T}.
     * @param <T>            The type of the claim to be extracted.
     * @return The extracted claim of type {@code T}.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses the given JWT and retrieves all its claims.
     * The token is verified using the {@code secretKey}.
     *
     * @param token The JWT string to parse.
     * @return A {@link Claims} object containing all claims from the JWT.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey) // Verify the token's signature with the secret key.
                .build()
                .parseSignedClaims(token) // Parse the signed JWT.
                .getPayload(); // Get the claims payload.
    }

    /**
     * Checks if the provided JWT is expired.
     *
     * @param token The JWT to check for expiration.
     * @return {@code true} if the token's expiration date is before the current date, {@code false} otherwise.
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Generates a new JWT for a given user.
     * The token will include the username as the subject and will have a default expiration time.
     *
     * @param userDetails The {@link UserDetails} object representing the user for whom the token is generated.
     * @return A newly generated JWT string.
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>(); // No custom claims are added by default.
        return createToken(claims, userDetails.getUsername());
    }

    /**
     * Creates a new JWT with the specified claims and subject.
     * The token is signed with the application's {@code secretKey} and includes
     * an issuance date and an expiration date (15 minutes from issuance).
     *
     * @param claims  A {@link Map} of custom claims to include in the token.
     * @param subject The subject of the token, typically the username.
     * @return The compact JWT string.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims) // Set custom claims.
                .subject(subject) // Set the subject (username).
                .issuedAt(new Date(System.currentTimeMillis())) // Set the issuance date.
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15)) // Set expiration to 15 minutes.
                .signWith(secretKey) // Sign the token with the secret key.
                .compact(); // Build and compact the JWT into a string.
    }

    /**
     * Validates a JWT against the provided user details.
     * A token is considered valid if:
     * 1. The username extracted from the token matches the username of the {@link UserDetails}.
     * 2. The token has not expired.
     *
     * @param token       The JWT string to validate.
     * @param userDetails The {@link UserDetails} of the user to validate against.
     * @return {@code true} if the token is valid for the given user, {@code false} otherwise.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
