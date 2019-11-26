package com.picker.trip.repository;

import com.picker.trip.domain.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLocationRepository extends JpaRepository<UserLocation, Integer> {
}
