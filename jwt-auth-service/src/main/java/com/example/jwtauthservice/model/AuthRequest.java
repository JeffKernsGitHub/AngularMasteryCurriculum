package com.example.jwtauthservice.model;

/**
 * Represents an authentication request, typically containing user credentials.
 * This class is used to bind incoming JSON request bodies for login operations.
 */
public class AuthRequest {
    /**
     * The username provided by the user for authentication.
     */
    private String username;
    /**
     * The password provided by the user for authentication.
     */
    private String password;

    /**
     * Retrieves the username from the authentication request.
     * @return The username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username for the authentication request.
     * @param username The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Retrieves the password from the authentication request.
     * @return The password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password for the authentication request.
     * @param password The password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
