package com.cognizant.springlearn.model;

/**
 * AuthenticationResponse - Model representing the JSON response returned
 * after successful authentication.
 *
 * <p>Contains the generated JWT token that the client should include in the
 * Authorization header (as a Bearer token) for subsequent secured requests.
 *
 * <p>Example JSON:
 * <pre>
 * {
 *   "token": "eyJhbGciOiJIUzI1NiJ9..."
 * }
 * </pre>
 *
 * @author Cognizant
 */
public class AuthenticationResponse {

    /** The JWT token generated upon successful authentication. */
    private String token;

    // -------------------------------------------------------
    // Constructor
    // -------------------------------------------------------

    /**
     * Constructs an AuthenticationResponse with the given JWT token.
     *
     * @param token the JWT token string to include in the response
     */
    public AuthenticationResponse(String token) {
        this.token = token;
    }

    // -------------------------------------------------------
    // Getter (Jackson needs getters to serialize fields to JSON)
    // -------------------------------------------------------

    /**
     * Returns the JWT token.
     *
     * @return the JWT token string
     */
    public String getToken() {
        return token;
    }

    /**
     * Sets the JWT token.
     *
     * @param token the JWT token string to set
     */
    public void setToken(String token) {
        this.token = token;
    }
}
