package com.picker.trip.repository;

import com.picker.trip.domain.PersonalityCategory;
import com.picker.trip.model.enums.PersonalityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalityCategoryRepository extends JpaRepository<PersonalityCategory, Integer> {
    Optional<List<PersonalityCategory>> findAllByPersonalityType(PersonalityType personalityType);
}
