package com.picker.trip.repository;

import com.picker.trip.domain.UserBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserBookmarkRepository extends JpaRepository<UserBookmark, Integer> {
    Optional<List<UserBookmark>> findAllByUserIdx(int userIdx);
}
