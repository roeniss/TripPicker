package com.picker.trip.repository;

import com.picker.trip.domain.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLocationRepository extends JpaRepository<UserLocation, Integer> {
    Optional<UserLocation> findByUserIdx(int userIdx);
}
