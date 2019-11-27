package com.picker.trip.repository;

import com.picker.trip.domain.Personality;
import com.picker.trip.model.enums.PersonalityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalityRepository extends JpaRepository<Personality, Integer> {
    Optional<Personality> findByPersonalityType(PersonalityType personalityType);
}
