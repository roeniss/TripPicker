package com.picker.trip.service;

import com.picker.trip.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LikeService {
    private final UserRepository userRepository;

    public LikeService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
