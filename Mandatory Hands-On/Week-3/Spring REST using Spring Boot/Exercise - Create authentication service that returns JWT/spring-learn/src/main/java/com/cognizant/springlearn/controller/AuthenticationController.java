package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.model.AuthenticationRequest;
import com.cognizant.springlearn.model.AuthenticationResponse;
import com.cognizant.springlearn.service.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthenticationController - REST Controller that handles authentication requests.
 *
 * <p>Exposes the POST /authenticate endpoint. Clients send a JSON payload with
 * a username and password. If the credentials are valid, a JWT token is generated
 * and returned. If invalid, HTTP 401 Unauthorized is returned.
 *
 * <p>Design Decisions:
 * <ul>
 *   <li>Constructor injection is used for {@link JwtUtil} to ensure immutability
 *       and facilitate unit testing without requiring a Spring context.</li>
 *   <li>Credentials are hardcoded as per the exercise requirements. In a real
 *       application, these would be validated against a database or user store.</li>
 * </ul>
 *
 * @author Cognizant
 */
@RestController
public class AuthenticationController {

    /** Logger for tracing request handling and debugging. */
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    /** Hardcoded valid username for this exercise. */
    private static final String VALID_USERNAME = "user";

    /** Hardcoded valid password for this exercise. */
    private static final String VALID_PASSWORD = "pwd";

    /** JWT utility service used to generate tokens upon successful authentication. */
    private final JwtUtil jwtUtil;

    // -------------------------------------------------------
    // Constructor Injection
    // -------------------------------------------------------

    /**
     * Constructs the controller with a required {@link JwtUtil} dependency.
     *
     * <p>Spring automatically injects the {@link JwtUtil} bean when this
     * controller is created. Constructor injection is preferred over field
     * injection for clarity and testability.
     *
     * @param jwtUtil the JWT utility service bean
     */
    public AuthenticationController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // -------------------------------------------------------
    // Endpoints
    // -------------------------------------------------------

    /**
     * POST /authenticate - Authenticates a user and returns a JWT token.
     *
     * <p>Accepts a JSON request body containing {@code username} and {@code password}.
     * Validates the credentials against hardcoded values. On success, generates a
     * JWT token and wraps it in an {@link AuthenticationResponse}. On failure,
     * returns HTTP 401 Unauthorized.
     *
     * <p>Example success response (HTTP 200 OK):
     * <pre>
     * {
     *   "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIi..."
     * }
     * </pre>
     *
     * <p>Example failure response (HTTP 401 Unauthorized):
     * Body is empty; the status code communicates the failure.
     *
     * @param request the incoming JSON request body deserialized as {@link AuthenticationRequest}
     * @return a {@link ResponseEntity} with a JWT token (200) or Unauthorized status (401)
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {

        logger.debug("Authentication attempt for username: {}", request.getUsername());

        // Validate the provided credentials against the hardcoded values.
        // In production, this would query a UserDetailsService or a database.
        if (VALID_USERNAME.equals(request.getUsername())
                && VALID_PASSWORD.equals(request.getPassword())) {

            // Credentials are valid — generate a JWT token for the authenticated user
            String token = jwtUtil.generateToken(request.getUsername());

            logger.info("Authentication successful for username: {}", request.getUsername());

            // Return HTTP 200 OK with the token in the response body
            return ResponseEntity.ok(new AuthenticationResponse(token));
        }

        // Credentials are invalid — log the failure and return HTTP 401 Unauthorized.
        // We deliberately avoid disclosing whether the username or password was wrong.
        logger.warn("Authentication failed for username: {}", request.getUsername());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
