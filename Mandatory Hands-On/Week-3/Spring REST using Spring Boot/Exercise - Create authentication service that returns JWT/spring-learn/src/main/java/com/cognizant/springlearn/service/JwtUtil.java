package com.cognizant.springlearn.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.MacAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * JwtUtil - Utility service responsible for all JWT operations.
 *
 * <p>This component handles:
 * <ul>
 *   <li>Deriving a cryptographic signing key from the configured secret</li>
 *   <li>Generating a signed JWT token for an authenticated user</li>
 *   <li>Setting token subject (username) and expiration time</li>
 * </ul>
 *
 * <p>The secret key and expiration duration are read from {@code application.properties}
 * via {@code @Value} injection, keeping configuration external and easy to change.
 *
 * <p>Algorithm used: HS256 (HMAC-SHA-256) - a symmetric signing algorithm.
 *
 * @author Cognizant
 */
@Component
public class JwtUtil {

    /**
     * Secret key string loaded from application.properties (jwt.secret).
     * Must be at least 32 characters long to satisfy HS256's 256-bit key requirement.
     */
    private final String secret;

    /**
     * Token validity duration in milliseconds, loaded from application.properties
     * (jwt.expiration.ms). Default configured to 600000 ms (10 minutes).
     */
    private final long expirationMs;

    // -------------------------------------------------------
    // Constructor Injection
    // -------------------------------------------------------

    /**
     * Constructor that injects JWT configuration properties.
     *
     * @param secret       the HMAC secret key string (from jwt.secret)
     * @param expirationMs the token validity in milliseconds (from jwt.expiration.ms)
     */
    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration.ms}") long expirationMs) {
        this.secret = secret;
        this.expirationMs = expirationMs;
    }

    // -------------------------------------------------------
    // Private Helpers
    // -------------------------------------------------------

    /**
     * Derives a {@link SecretKey} from the configured secret string.
     *
     * <p>The secret string is converted to bytes and used to create an HMAC-SHA key
     * suitable for the HS256 algorithm. This key is used to both sign and later
     * verify JWT tokens.
     *
     * @return a {@link SecretKey} instance for HMAC-SHA signing
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = secret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // -------------------------------------------------------
    // Public API
    // -------------------------------------------------------

    /**
     * Generates a signed JWT token for the given username.
     *
     * <p>The token includes:
     * <ul>
     *   <li><b>Subject</b>: the username (who the token was issued for)</li>
     *   <li><b>Issued At</b>: the current timestamp</li>
     *   <li><b>Expiration</b>: current time + configured expiration duration</li>
     *   <li><b>Signature</b>: HMAC-SHA256 signature using the secret key</li>
     * </ul>
     *
     * @param username the username to embed as the JWT subject
     * @return a compact, URL-safe JWT token string (header.payload.signature)
     */
    public String generateToken(String username) {
        // Record the current time for both issuedAt and expiration calculation
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        // JJWT 0.12.x API: use MacAlgorithm constant Jwts.SIG.HS256 (replaces deprecated SignatureAlgorithm enum)
        MacAlgorithm alg = Jwts.SIG.HS256;

        return Jwts.builder()
                // Set the subject claim to the username
                .subject(username)
                // Record when the token was issued
                .issuedAt(now)
                // Set the expiration time (now + 10 minutes)
                .expiration(expiryDate)
                // Sign with HS256 algorithm using the derived secret key
                .signWith(getSigningKey(), alg)
                // Build the compact JWT string: base64(header).base64(payload).signature
                .compact();
    }
}
