package com.picker.trip.repository;

import com.picker.trip.domain.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Integer> {
    Optional<UserPreference> findByUserIdx(int userIdx);
}
