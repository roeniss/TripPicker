package com.picker.trip.service;

import com.picker.trip.domain.*;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.model.enums.PersonalityType;
import com.picker.trip.repository.*;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class LikeService {
    private final UserRepository userRepository;
    private final ItemLikeRepository itemLikeRepository;
    private final PersonalityRepository personalityRepository;
    private final PersonalityCategoryRepository personalityCategoryRepository;
    private final UserPersonalityRepository userPersonalityRepository;
    private final ItemRepository itemRepository;

    public LikeService(final UserRepository userRepository,
                       final ItemLikeRepository itemLikeRepository,
                       final PersonalityRepository personalityRepository,
                       final PersonalityCategoryRepository personalityCategoryRepository,
                       final UserPersonalityRepository userPersonalityRepository,
                       final ItemRepository itemRepository) {
        this.userRepository = userRepository;
        this.itemLikeRepository = itemLikeRepository;
        this.personalityRepository = personalityRepository;
        this.personalityCategoryRepository = personalityCategoryRepository;
        this.userPersonalityRepository = userPersonalityRepository;
        this.itemRepository = itemRepository;
    }

    /**
     * 좋아요 저장
     * @return
     */
    public DefaultRes saveItemLike(final ItemLike itemLike){
        try {
            int userIdx = itemLike.getUserIdx();

            // 퍼스널리티 좋아요 저장

            Optional<UserPersonality> userPersonality = userPersonalityRepository.findByUserIdx(userIdx);
            if(!userPersonality.isPresent())
                return DefaultRes.res(StatusCode.DB_ERROR, "해당 회원의 퍼스널리티가 없습니다.");

            PersonalityType personalityType =
                    userPersonality.get().getPersonalityType();

            Optional<Personality> currentPersonality =
                    personalityRepository.findByPersonalityType(personalityType);

            Personality personality = new Personality();
            personality.setPersonalityType(personalityType);

            if(!currentPersonality.isPresent()) { personality.setLikesCount(1); }
            else{ personality.setLikesCount(currentPersonality.get().getLikesCount() + 1); }

            // 퍼스널리티 카테고리 좋아요 저장

            Optional<PersonalityCategory> currentPersonalityCategory =
                    personalityCategoryRepository.findByPersonalityTypeAndCategoryCode
                            (personalityType, itemLike.getCategoryCode());

            PersonalityCategory personalityCategory = new PersonalityCategory();
            personalityCategory.setPersonalityType(personalityType);
            personalityCategory.setCategoryCode(itemLike.getCategoryCode());

            if(!currentPersonalityCategory.isPresent()) {
                personalityCategory.setLikesCount(1);
            }
            else{
                personalityCategory.setLikesCount
                        (currentPersonalityCategory.get().getLikesCount() + 1);
                personalityCategory.setPersonalityCategoryIdx
                        (currentPersonalityCategory.get().getPersonalityCategoryIdx());
            }

            // 아이템 좋아요 저장

            Item item = new Item();
            item.setCategoryCode(itemLike.getCategoryCode());
            item.setContentIdx(itemLike.getContentIdx());
            item.setSubCategoryCode(itemLike.getSubCategoryCode());
            item.setImageUrl(itemLike.getImageUrl());
            item.setTitle(itemLike.getTitle());

            if(!itemRepository.findByContentIdx(itemLike.getContentIdx()).isPresent()){
                item.setLikesCount(1);
            }
            else{
                int likesCount =
                        itemRepository.findByContentIdx(itemLike.getContentIdx()).get().getLikesCount();
                item.setLikesCount(likesCount);
            }
            personalityRepository.save(personality);
            personalityCategoryRepository.save(personalityCategory);
            itemLikeRepository.save(itemLike);
            itemRepository.save(item);
            return DefaultRes.res(StatusCode.CREATED, "좋아요 저장 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "좋아요 저장 실패");
        }
    }

    /**
     * 좋아요 취소
     * @return
     */
    public DefaultRes deleteItemLike(final ItemLike itemLike){
        try {
            int userIdx = itemLike.getUserIdx();

            // 퍼스널리티 좋아요 저장

            Optional<UserPersonality> userPersonality = userPersonalityRepository.findByUserIdx(userIdx);
            if(!userPersonality.isPresent())
                return DefaultRes.res(StatusCode.NOT_FOUND, "해당 회원의 퍼스널리티가 없습니다.");

            PersonalityType personalityType =
                    userPersonality.get().getPersonalityType();

            Optional<Personality> currentPersonality =
                    personalityRepository.findByPersonalityType(personalityType);

            Personality personality = new Personality();
            personality.setPersonalityType(personalityType);

            personality.setLikesCount(currentPersonality.get().getLikesCount() - 1);

            // 퍼스널리티 카테고리 좋아요 저장

            Optional<PersonalityCategory> currentPersonalityCategory =
                    personalityCategoryRepository.findByPersonalityTypeAndCategoryCode
                            (personalityType, itemLike.getCategoryCode());

            PersonalityCategory personalityCategory = new PersonalityCategory();
            personalityCategory.setPersonalityType(personalityType);
            personalityCategory.setCategoryCode(itemLike.getCategoryCode());

            if(!currentPersonalityCategory.isPresent()) {
                personalityCategory.setLikesCount(1);
            }
            else{
                personalityCategory.setLikesCount
                        (currentPersonalityCategory.get().getLikesCount() - 1);
                personalityCategory.setPersonalityCategoryIdx
                        (currentPersonalityCategory.get().getPersonalityCategoryIdx());
            }

            // 아이템 좋아요 저장

            Item item = new Item();
            item.setCategoryCode(itemLike.getCategoryCode());
            item.setContentIdx(itemLike.getContentIdx());
            item.setSubCategoryCode(itemLike.getSubCategoryCode());

            int likesCount =
                    itemRepository.findByContentIdx(itemLike.getContentIdx()).get().getLikesCount();
            item.setLikesCount(likesCount-1);

            if(currentPersonality.get().getLikesCount() == 1)
                personalityRepository.deleteByPersonalityType(personality.getPersonalityType());
            else personalityRepository.save(personality);

            if(currentPersonalityCategory.get().getLikesCount() == 1)
                personalityCategoryRepository.deleteByPersonalityTypeAndCategoryCode
                        (personalityCategory.getPersonalityType(), personalityCategory.getCategoryCode());
            else personalityCategoryRepository.save(personalityCategory);

            itemLikeRepository.deleteByUserIdxAndContentIdx(userIdx, itemLike.getContentIdx());

            if(likesCount == 1) itemRepository.deleteByContentIdx(itemLike.getContentIdx());
            else itemRepository.save(item);

            return DefaultRes.res(StatusCode.CREATED, "좋아요 취소 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "좋아요 취소 실패");
        }
    }
}
