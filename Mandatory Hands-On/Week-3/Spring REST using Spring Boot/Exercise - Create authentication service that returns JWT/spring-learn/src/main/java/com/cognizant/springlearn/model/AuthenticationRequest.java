package com.cognizant.springlearn.model;

/**
 * AuthenticationRequest - Model representing the incoming login request payload.
 *
 * <p>This POJO is deserialized from the JSON body of POST /authenticate.
 * It carries the username and password supplied by the client.
 *
 * <p>Example JSON:
 * <pre>
 * {
 *   "username": "user",
 *   "password": "pwd"
 * }
 * </pre>
 *
 * @author Cognizant
 */
public class AuthenticationRequest {

    /** The username provided by the client. */
    private String username;

    /** The password provided by the client. */
    private String password;

    // -------------------------------------------------------
    // No-args constructor (required by Jackson for JSON binding)
    // -------------------------------------------------------

    /**
     * Default no-argument constructor required by the Jackson JSON library
     * to deserialize the request body into this object.
     */
    public AuthenticationRequest() {
    }

    // -------------------------------------------------------
    // All-args constructor (convenience constructor)
    // -------------------------------------------------------

    /**
     * Parameterized constructor for creating an AuthenticationRequest programmatically
     * (e.g., in unit tests).
     *
     * @param username the username string
     * @param password the password string
     */
    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // -------------------------------------------------------
    // Getters and Setters
    // -------------------------------------------------------

    /**
     * Returns the username from the request.
     *
     * @return username string
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username on the request.
     *
     * @param username the username string to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Returns the password from the request.
     *
     * @return password string
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password on the request.
     *
     * @param password the password string to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
