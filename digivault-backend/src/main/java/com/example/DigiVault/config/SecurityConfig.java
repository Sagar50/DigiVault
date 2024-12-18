package com.example.DigiVault.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .addFilter(new JwtAuthenticationFilter()) // Add JWT filter
                // Disable CSRF protection (Use only for stateless APIs like JWT)
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register",
                                "/api/login",
                                "/api/users/find/{username}",
                                "/api/users/{username}",
                                "/updatePortfolio/{username}",
                                "/api/db/addWallet",
                                "/api/db/lastUpdated/{username}",
                                "/api/db/updatePortfolio/{username}",
                                "/api/db/exportHoldings/{username}",
                                "/api/getCryptoData",
                                "/api/news",
                                "/api/db/remove/{user}/{walletId}"
                        ).permitAll()  // Allow public access to login/register endpoints
                        .anyRequest().authenticated()  // Other requests require authentication
                );


        return http.build();
    }
}
