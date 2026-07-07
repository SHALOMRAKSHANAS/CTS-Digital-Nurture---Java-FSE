package com.cognizant.springlearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringLearnApplication - Entry point for the Spring Boot JWT Authentication Service.
 *
 * <p>This application demonstrates how to implement JWT-based authentication
 * using Spring Boot 3 and the JJWT library. On startup, Spring Boot
 * auto-configures the embedded Tomcat server, Spring Security, and all
 * registered beans in the component scan.
 *
 * <p>Endpoint exposed:
 * <ul>
 *   <li>POST /authenticate - Returns a JWT token for valid credentials</li>
 * </ul>
 *
 * @author Cognizant
 */
@SpringBootApplication
public class SpringLearnApplication {

    /**
     * Main method - bootstraps and launches the Spring Boot application.
     *
     * @param args command-line arguments (not used)
     */
    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
    }
}
