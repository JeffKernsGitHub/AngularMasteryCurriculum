package com.example.jwtauthservice.model;

/**
 * Represents an authentication response, typically containing a JWT.
 * This class is used to return the generated JWT to the client after successful authentication.
 */
public class AuthResponse {
    /**
     * The JSON Web Token (JWT) issued upon successful authentication.
     */
    private String token;

    /**
     * Constructs a new AuthResponse with the given JWT.
     * @param token The JWT to be included in the response.
     */
    public AuthResponse(String token) {
        this.token = token;
    }

    /**
     * Retrieves the JWT from the authentication response.
     * @return The JWT.
     */
    public String getToken() {
        return token;
    }

    /**
     * Sets the JWT for the authentication response.
     * @param token The JWT to set.
     */
    public void setToken(String token) {
        this.token = token;
    }
}
