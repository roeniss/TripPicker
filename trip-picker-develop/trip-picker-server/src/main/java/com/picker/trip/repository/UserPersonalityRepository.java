package com.picker.trip.repository;

import com.picker.trip.domain.UserPersonality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPersonalityRepository extends JpaRepository<UserPersonality, Integer> {
    Optional<UserPersonality> findByUserIdx(int userIdx);
}
