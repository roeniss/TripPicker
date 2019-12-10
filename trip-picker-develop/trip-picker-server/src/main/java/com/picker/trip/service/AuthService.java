package com.picker.trip.service;

import com.picker.trip.domain.User;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.model.LoginReq;
import com.picker.trip.model.LoginRes;
import com.picker.trip.repository.UserRepository;
import com.picker.trip.utils.AES256Util;
import com.picker.trip.utils.StatusCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(final UserRepository userRepository, final JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    /**
     * 로그인 정보 Auth Check
     * @return
     */
    public DefaultRes login(final LoginReq loginReq) {
        try{
            AES256Util aes256Util = new AES256Util("SINSUDONG-SERVER-ENCRYPT");
            Optional<User> user = userRepository.findByEmailAndPassword(loginReq.getEmail(),
                    aes256Util.encrypt(loginReq.getPassword()));
            LoginRes loginRes = new LoginRes();
            loginRes.setUserIdx(user.get().getUserIdx());
            loginRes.setUserName(user.get().getName());
            if(user.isPresent()) {
                loginRes.setToken(jwtService.create(user.get().getUserIdx()));
                return DefaultRes.res(StatusCode.OK, "로그인 성공", loginRes);
            }
            return DefaultRes.res(StatusCode.NOT_FOUND, "로그인 실패");
        }
        catch(Exception e){
            return DefaultRes.res(StatusCode.NOT_FOUND, "로그인 실패");
        }
    }
}