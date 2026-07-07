package com.cognizant.springlearn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * SecurityConfig - Spring Security configuration for the JWT Authentication Service.
 *
 * <p>This class defines the security filter chain that governs how HTTP requests
 * are handled from a security perspective. Key configurations:
 *
 * <ul>
 *   <li><b>CSRF Disabled</b>: Not needed for stateless REST APIs (no session cookies).</li>
 *   <li><b>Stateless Session</b>: No HTTP session is created; each request must carry a JWT.</li>
 *   <li><b>POST /authenticate Permitted</b>: The login endpoint is publicly accessible.</li>
 *   <li><b>All other requests authenticated</b>: Any other endpoint requires a valid token.</li>
 * </ul>
 *
 * <p>Note: In a full implementation, a JWT filter would be added to the chain to validate
 * the Bearer token on each request. For this exercise, only token generation is demonstrated.
 *
 * @author Cognizant
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // -------------------------------------------------------
    // Security Filter Chain Bean
    // -------------------------------------------------------

    /**
     * Configures and registers the {@link SecurityFilterChain} bean.
     *
     * <p>This method customizes Spring Security's HTTP security behavior:
     * <ol>
     *   <li>Disables CSRF protection (safe for stateless REST APIs).</li>
     *   <li>Sets session management to STATELESS (no server-side sessions).</li>
     *   <li>Permits unauthenticated access to POST /authenticate.</li>
     *   <li>Requires authentication for all other endpoints.</li>
     * </ol>
     *
     * @param http the {@link HttpSecurity} object provided by Spring Security
     * @return the configured {@link SecurityFilterChain}
     * @throws Exception if any security configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF: REST APIs using JWT don't rely on browser sessions,
            // so CSRF protection is unnecessary and would block POST requests.
            .csrf(AbstractHttpConfigurer::disable)

            // Set session management to STATELESS: Spring Security will not create
            // or use HTTP sessions. Every request is independently authenticated via JWT.
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Configure URL authorization rules
            .authorizeHttpRequests(auth -> auth
                // Allow all requests to POST /authenticate without authentication.
                // This is the public login endpoint where the JWT is issued.
                .requestMatchers("/authenticate").permitAll()

                // All other endpoints require the request to be authenticated.
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
