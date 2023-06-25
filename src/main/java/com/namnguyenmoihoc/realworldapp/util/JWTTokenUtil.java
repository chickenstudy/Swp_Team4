package com.namnguyenmoihoc.realworldapp.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.TokenPayload;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTTokenUtil {
    private final String secret = "NAM_HIHI";

    public String generateToken(Account user, long expiredDate) {
        Map<String, Object> claims = new HashMap<>();

        TokenPayload tokenPayload = TokenPayload.builder().userID(user.getId()).email(user.getEmail()).build();

        claims.put("payload", tokenPayload);

        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredDate * 1000))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public TokenPayload getTokenPayLoad(String token) {

        return getClaimsFromToken(token, (Claims claim) -> {
            Map<String, Object> mapResult = (Map<String, Object>) claim.get("payload");
            return TokenPayload.builder().userID((int) mapResult.get("userID")).email((String) mapResult.get("email"))
                    .build();
        });
    }

    private <T> T getClaimsFromToken(String token, Function<Claims, T> ClaimsResolver) {
        final Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return ClaimsResolver.apply(claims);
    }

    public boolean validate(String token, Account user) {
        TokenPayload tokenPayload = getTokenPayLoad(token);
        
        return tokenPayload.getUserID() == user.getId() && tokenPayload.getEmail().equals(user.getEmail()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiredDate = getClaimsFromToken(token, Claims::getExpiration);
        return expiredDate.before(new Date());
    }
}
