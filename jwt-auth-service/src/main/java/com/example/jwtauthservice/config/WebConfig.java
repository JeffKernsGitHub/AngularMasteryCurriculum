package com.example.jwtauthservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for web-related settings, primarily CORS.
 */
@Configuration
public class WebConfig {

  /**
   * Configures CORS (Cross-Origin Resource Sharing) for the application.
   * Allows requests from a specific origin (http://localhost:4200) to access API endpoints.
   *
   * @return A WebMvcConfigurer with CORS mappings.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Configure CORS for all API endpoints
        registry.addMapping("/api/**")
          .allowedOrigins("http://localhost:4200") // Allow requests from this origin
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
          .allowedHeaders("*") // Allow all headers
          .allowCredentials(true); // Allow sending of cookies and authentication headers
      }
    };
  }
}
