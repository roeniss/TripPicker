package com.picker.trip.repository;

import com.picker.trip.domain.ItemLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemLikeRepository extends JpaRepository<ItemLike, Integer> {
    Optional<List<ItemLike>> findAllByUserIdx(int userIdx);
}
