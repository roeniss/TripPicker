package com.picker.trip.service;

import com.picker.trip.domain.*;
import com.picker.trip.model.*;

import com.picker.trip.repository.*;
import com.picker.trip.utils.AES256Util;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserPersonalityRepository userPersonalityRepository;
    private final UserLocationRepository userLocationRepository;

    public UserService(final UserRepository userRepository,
                       final UserPreferenceRepository userPreferenceRepository,
                       final UserPersonalityRepository userPersonalityRepository,
                       final UserLocationRepository userLocationRepository) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userPersonalityRepository = userPersonalityRepository;
        this.userLocationRepository = userLocationRepository;
    }

    /**
     * 회원 정보 저장
     * @param user
     * @return
     */
    public DefaultRes saveUser(final User user){
        try {
            AES256Util aes256Util = new AES256Util("SINSUDONG-SERVER-ENCRYPT");
            user.setPassword(aes256Util.encrypt(user.getPassword()));
            userRepository.save(user);
            return DefaultRes.res(StatusCode.CREATED, "회원 가입 완료");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "회원 가입 실패");
        }
    }

    /**
     * 이메일 중복 확인
     * @param email
     * @return
     */
    public DefaultRes validateEmail(final String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(value -> DefaultRes.res(StatusCode.NO_CONTENT, "중복된 이메일입니다.")).orElseGet(() -> DefaultRes.res(StatusCode.OK, "사용 가능 합니다."));
    }

    /**
     * 회원 선호 정보 저장
     * @param userPreference
     * @return
     */
    public DefaultRes saveUserPreference(final UserPreference userPreference){
        try {
            userPreferenceRepository.save(userPreference);
            return DefaultRes.res(StatusCode.CREATED, "회원 선호 정보 저장 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "회원 선호 정보 저장 실패");
        }
    }

    /**
     * 회원 선호 정보 조회
     * @param userIdx
     * @return
     */
    public DefaultRes<UserPreference> findUserPreferenceByUserIdx(final int userIdx) {
        final Optional <UserPreference> userPreference =
                userPreferenceRepository.findByUserIdx(userIdx);
        return userPreference.map(value -> DefaultRes.res(StatusCode.OK, "회원 선호 정보 조회 성공", value))
                .orElseGet(() -> DefaultRes.res(StatusCode.NOT_FOUND, "회원 선호 정보를 찾을 수 없습니다."));
    }

    /**
     * 회원 퍼스널리티 저장
     * @param userPersonality
     * @return
     */
    public DefaultRes saveUserPersonality(final UserPersonality userPersonality){
        try {
            userPersonalityRepository.save(userPersonality);
            return DefaultRes.res(StatusCode.CREATED, "회원 퍼스널리티 저장 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "회원 퍼스널리티 저장 실패");
        }
    }

    /**
     * 회원 퍼스널리티 조회
     * @param userIdx
     * @return
     */
    public DefaultRes<UserPersonality> findUserPersonalityByUserIdx(final int userIdx) {
        final Optional <UserPersonality> userPersonality =
                userPersonalityRepository.findByUserIdx(userIdx);
        return userPersonality.map(value -> DefaultRes.res(StatusCode.OK, "회원 퍼스널리티 조회 성공", value))
                .orElseGet(() -> DefaultRes.res(StatusCode.NOT_FOUND, "회원 퍼스널리티를 찾을 수 없습니다."));
    }

    /**
     * 회원 선택 지역 저장
     * @return
     */
    public DefaultRes saveUserLocation(final UserLocation userLocation){
        try {
            userLocationRepository.save(userLocation);
            return DefaultRes.res(StatusCode.CREATED, "회원 선택 지역 저장 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "회원 선택 지역 저장 실패");
        }
    }

    /**
     * 회원 선택 지역 조회
     * @param userIdx
     * @return
     */
    public DefaultRes<UserLocation> findUserLocationByUserIdx(final int userIdx) {
        final Optional <UserLocation> userLocation =
                userLocationRepository.findByUserIdx(userIdx);
        return userLocation.map(value -> DefaultRes.res(StatusCode.OK, "회원 선택 지역 조회 성공", value))
                .orElseGet(() -> DefaultRes.res(StatusCode.NOT_FOUND, "회원 선택 지역을 찾을 수 없습니다."));
    }
}
