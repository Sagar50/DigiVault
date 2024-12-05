package com.example.DigiVault.config;
import com.example.DigiVault.UtilityClasses.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import javax.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebFilter
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtUtil jwtUtil = new JwtUtil();

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // Remove "Bearer " prefix
            String username = jwtUtil.extractUsername(token);
            if (jwtUtil.validateToken(token, username)) {
                // Here you can set an authentication object (e.g., using a UserDetailsService)
                return super.attemptAuthentication(request, response);
            }
        }
        return null;
    }
}
