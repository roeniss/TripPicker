package com.picker.trip.api;

import com.picker.trip.model.DefaultRes;
import com.picker.trip.model.LoginReq;

import com.picker.trip.service.AuthService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.picker.trip.model.DefaultRes.FAIL_DEFAULT_RES;

@Slf4j
@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    /**
     * 로그인
     * @param loginReq
     * @return ResponseEntity<DefaultRes>
     */
    @PostMapping("/users/signin")
    public ResponseEntity<DefaultRes> login(@RequestBody final LoginReq loginReq) {
        try {
            return new ResponseEntity<>(authService.login(loginReq), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}