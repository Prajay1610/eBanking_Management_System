package com.bank.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;

//@Configuration
//@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for API endpoints
//            .authorizeHttpRequests(auth -> auth
//                // Public endpoints
//                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
//                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
//                .requestMatchers(HttpMethod.GET, "/test").permitAll()
//
//                // Authentication-related endpoints
//                .requestMatchers(HttpMethod.POST, "/api/auth/**").authenticated()
//                .requestMatchers(HttpMethod.GET, "/api/auth/**").authenticated()
//
//                // Transfer endpoints
//                .requestMatchers(HttpMethod.POST, "/transfer").hasRole("CUSTOMER")
//
//                // Transaction endpoints
//                .requestMatchers(HttpMethod.POST, "/transaction/withdraw").hasRole("CUSTOMER")
//                .requestMatchers(HttpMethod.POST, "/transaction/deposit").hasRole("CUSTOMER")
//
//                // Bank Account endpoints
//                .requestMatchers(HttpMethod.POST, "/bankAccount").hasAnyRole("BANKMANAGER", "ADMIN")
//                .requestMatchers(HttpMethod.GET, "/bankAccount/{accountId}").hasAnyRole("CUSTOMER", "BANKMANAGER", "ADMIN")
//                .requestMatchers(HttpMethod.GET, "/bankAccount/all/{managerId}").hasRole("BANKMANAGER")
//
//                // Bank endpoints
//                .requestMatchers(HttpMethod.POST, "/bank/add").hasRole("ADMIN")
//                .requestMatchers(HttpMethod.GET, "/bank/allCustomers/{bankManagerId}").hasRole("BANKMANAGER")
//
//                // Customer endpoints
//                .requestMatchers(HttpMethod.GET, "/customer/**").hasRole("CUSTOMER")
//
//                // Admin endpoints
//                .requestMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
//
//                // Deny all other requests
//                .anyRequest().denyAll()
//            )
//            .formLogin(AbstractHttpConfigurer::disable) // Disable form login
//            .httpBasic(AbstractHttpConfigurer::disable); // Disable basic auth
//
//        return http.build();
    }
