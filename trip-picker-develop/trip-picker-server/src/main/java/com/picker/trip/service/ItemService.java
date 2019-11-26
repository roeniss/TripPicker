package com.picker.trip.service;

import com.picker.trip.repository.UserLocationRepository;
import com.picker.trip.repository.UserPersonalityRepository;
import com.picker.trip.repository.UserPreferenceRepository;
import com.picker.trip.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ItemService {
    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserPersonalityRepository userPersonalityRepository;
    private final UserLocationRepository userLocationRepository;

    public ItemService(final UserRepository userRepository,
                       final UserPreferenceRepository userPreferenceRepository,
                       final UserPersonalityRepository userPersonalityRepository,
                       final UserLocationRepository userLocationRepository) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userPersonalityRepository = userPersonalityRepository;
        this.userLocationRepository = userLocationRepository;
    }
}
