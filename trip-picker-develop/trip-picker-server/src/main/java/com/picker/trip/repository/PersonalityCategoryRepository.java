package com.picker.trip.repository;

import com.picker.trip.domain.PersonalityCategory;
import com.picker.trip.model.enums.CustomCategoryType;
import com.picker.trip.model.enums.PersonalityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PersonalityCategoryRepository extends JpaRepository<PersonalityCategory, Integer> {
    Optional<List<PersonalityCategory>> findAllByPersonalityType(PersonalityType personalityType);
    Optional<PersonalityCategory> findByPersonalityTypeAndCategoryCode
            (PersonalityType personalityType, CustomCategoryType categoryCode);
    @Transactional
    void deleteByPersonalityTypeAndCategoryCode(PersonalityType personalityType, CustomCategoryType categoryCode);
}
