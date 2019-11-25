package com.picker.trip.api;

import com.picker.trip.domain.User;
import com.picker.trip.domain.UserPreference;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.picker.trip.model.DefaultRes.FAIL_DEFAULT_RES;

/**
 * Created By yw on 2019-09-25.
 */

@Slf4j
@RestController
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/signup")
    public ResponseEntity<DefaultRes> signup(@RequestBody final User user) {
        try {
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/check")
    public ResponseEntity<DefaultRes> checkEmail(@RequestParam("email") final String email) {
        try {
            return new ResponseEntity<>(userService.validateEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/preferences")
    public ResponseEntity<DefaultRes> saveUserPreference(@RequestBody final UserPreference userPreference) {
        try {
            return new ResponseEntity<>(userService.saveUserPreference(userPreference), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<DefaultRes> getAllUsers() {
        try {
            return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/mypage")
    public ResponseEntity<DefaultRes> getUser(final int userIdx) {
        try {
            return new ResponseEntity<>(userService.findByUserIdx(userIdx), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}