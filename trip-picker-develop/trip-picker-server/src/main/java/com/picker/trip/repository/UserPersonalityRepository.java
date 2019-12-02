package com.picker.trip.repository;

import com.picker.trip.domain.UserPersonality;
import com.picker.trip.model.enums.PersonalityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserPersonalityRepository extends JpaRepository<UserPersonality, Integer> {
    Optional<UserPersonality> findByUserIdx(int userIdx);

    Optional<Integer> countByPersonalityType(PersonalityType personalityType);
    Optional<List<UserPersonality>> findAllByPersonalityType(PersonalityType personalityType);
}
