package com.picker.trip.repository;

import com.picker.trip.domain.UserPersonality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPersonalityRepository extends JpaRepository<UserPersonality, Integer> {
}
