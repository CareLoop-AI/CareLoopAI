package com.backend.controller;

import com.backend.DTO.EmailLoginRequest;
import com.backend.DTO.LoginResponseDto;
import com.backend.DTO.SignUpRequestDto;
import com.backend.Entity.User;
import com.backend.Entity.type.AuthProviderType;
import com.backend.security.AuthService;
import com.backend.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/user/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthUtil authUtil;

    @PostMapping("/email")
    public ResponseEntity<LoginResponseDto> loginViaEmail (@RequestBody EmailLoginRequest emailLoginRequest) {

        SignUpRequestDto signupRequestDto = new SignUpRequestDto();
        signupRequestDto.setUsername(emailLoginRequest.getEmail());
        signupRequestDto.setName("");

        User user = authService.signUpInternal(signupRequestDto , AuthProviderType.EMAIL , "email");

        LoginResponseDto loginResponseDto = new LoginResponseDto(authUtil.generateAccessToken(user), user.getId() , user.getUsername());

        return ResponseEntity.ok(loginResponseDto);
    }
}
