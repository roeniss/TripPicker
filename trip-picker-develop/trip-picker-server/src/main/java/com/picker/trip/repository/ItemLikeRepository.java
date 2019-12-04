package com.picker.trip.repository;

import com.picker.trip.domain.ItemLike;
import com.picker.trip.model.enums.CustomCategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ItemLikeRepository extends JpaRepository<ItemLike, Integer> {
    Optional<List<ItemLike>> findAllByUserIdx(int userIdx);
    Optional<List<ItemLike>> findAllByUserIdxAndCategoryCode(int userIdx, CustomCategoryType customCategoryType);

    Optional<ItemLike> findByUserIdxAndContentIdx(int userIdx, int contentIdx);

    @Transactional
    void deleteByUserIdxAndContentIdx(int userIdx, int contentIdx);
}
