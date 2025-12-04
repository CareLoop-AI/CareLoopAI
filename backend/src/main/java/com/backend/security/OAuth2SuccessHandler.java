package com.backend.security;

import com.backend.DTO.LoginResponseDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final AuthService authService;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String registrationId = token.getAuthorizedClientRegistrationId();

        ResponseEntity<LoginResponseDto> loginResponse = authService.handleOAuth2LoginRequest(oAuth2User,
                registrationId);

        LoginResponseDto loginResponseDto = loginResponse.getBody();

        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        // Set token in HTTP-only cookie (secure)
        Cookie tokenCookie = new Cookie("jwtToken", loginResponseDto.getJwt());
        tokenCookie.setHttpOnly(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        tokenCookie.setSecure(false); // Set to true in production with HTTPS
        response.addCookie(tokenCookie);

        // Set userId in regular cookie
        Cookie userIdCookie = new Cookie("userId", String.valueOf(loginResponseDto.getUserId()));
        userIdCookie.setPath("/");
        userIdCookie.setMaxAge(7 * 24 * 60 * 60);
        userIdCookie.setSecure(false);
        response.addCookie(userIdCookie);

        // Set user name in cookie
        if (name != null) {
            Cookie nameCookie = new Cookie("userName", URLEncoder.encode(name, StandardCharsets.UTF_8));
            nameCookie.setPath("/");
            nameCookie.setMaxAge(7 * 24 * 60 * 60);
            nameCookie.setSecure(false);
            response.addCookie(nameCookie);
        }

        // Set profile picture in cookie
        if (picture != null) {
            Cookie pictureCookie = new Cookie("userPicture", URLEncoder.encode(picture, StandardCharsets.UTF_8));
            pictureCookie.setPath("/");
            pictureCookie.setMaxAge(7 * 24 * 60 * 60);
            pictureCookie.setSecure(false);
            response.addCookie(pictureCookie);
        }


        String redirectUrl = "https://www.careloopai.co.in/?login=success"
                + "&userId=" + loginResponseDto.getUserId()
                + (name != null ? "&name=" + URLEncoder.encode(name, StandardCharsets.UTF_8) : "")
                + (picture != null ? "&picture=" + URLEncoder.encode(picture, StandardCharsets.UTF_8) : "");

        response.sendRedirect(redirectUrl);
    }
}
