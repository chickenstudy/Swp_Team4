package com.namnguyenmoihoc.realworldapp.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.namnguyenmoihoc.realworldapp.entity.User;
import com.namnguyenmoihoc.realworldapp.model.TokenPayload;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.util.JWTTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
        // System.out.println("filter ok");
        final String requestTokenHeader = request.getHeader("Authorization");

        String token = null;
        TokenPayload tokenPayload = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Token ")) {
            token = requestTokenHeader.substring(6).trim();

            try {
                tokenPayload = jwtTokenUtil.getTokenPayLoad(token);
            } catch (SignatureException e) {
                // TODO: handle exception
                System.out.println("invalid signature jwt token");
            } catch (IllegalArgumentException ex) {
                System.out.println("unable to get jwt");
            } catch (ExpiredJwtException eje) {
                System.out.println("token has expired");
            }

        } else {
            System.out.println("JWT Token does not start with token.");
        }

        if (tokenPayload != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<User> userOptional = userRepository.findById(tokenPayload.getUserID());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (jwtTokenUtil.validate(token, user)) {
                    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    UserDetails userDetails = new org.springframework.security.core.userdetails.
                            User(user.getEmail(),
                            user.getPassword(), authorities);

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }
        System.out.println(tokenPayload);
        filterChain.doFilter(request, response);
    }
}
