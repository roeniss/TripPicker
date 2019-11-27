package com.picker.trip.service;

import com.picker.trip.domain.*;
import com.picker.trip.model.*;
import com.picker.trip.model.enums.PersonalityType;
import com.picker.trip.repository.*;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ItemService {

    private final TourApiService tourApiService;
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserLocationRepository userLocationRepository;
    private final UserPersonalityRepository userPersonalityRepository;
    private final PersonalityRepository personalityRepository;
    private final PersonalityCategoryRepository personalityCategoryRepository;
    private final ItemLikeRepository itemLikeRepository;
    private final UserBookmarkRepository userBookmarkRepository;

    private final int TOTAL_NUM_OF_ITEMS = 100;

    public ItemService(final TourApiService tourApiService,
                       final UserPreferenceRepository userPreferenceRepository,
                       final UserLocationRepository userLocationRepository,
                       final UserPersonalityRepository userPersonalityRepository,
                       final PersonalityRepository personalityRepository,
                       final PersonalityCategoryRepository personalityCategoryRepository,
                       final ItemLikeRepository itemLikeRepository,
                       final UserBookmarkRepository userBookmarkRepository) {
        this.tourApiService = tourApiService;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userLocationRepository = userLocationRepository;
        this.userPersonalityRepository = userPersonalityRepository;
        this.personalityRepository = personalityRepository;
        this.personalityCategoryRepository = personalityCategoryRepository;
        this.itemLikeRepository = itemLikeRepository;
        this.userBookmarkRepository = userBookmarkRepository;
    }

    /**
     * 모든 아이템 조회
     * @return
     */
    public DefaultRes<List<ItemRes>> findAllItems(final int userIdx) {
        Optional<UserPreference> userPreference = userPreferenceRepository.findByUserIdx(userIdx);
        if(userPreference.isPresent()) {
            int areaCode = userPreference.get().getAreaCode();
            int sggCode = userPreference.get().getAreaCode();

            PersonalityType personalityType =   // 해당 회원이 속하는 퍼스널리티
                    userPersonalityRepository.findByUserIdx(userIdx).get().getPersonalityType();

            // 해당 퍼스널리티의 각 카테고리별 반영 비율 및 개수
            Optional<List<PersonalityCategoryRatioAndNumber>> personalityCategoryRatioAndNumberList =
                    findAllCategoryRatioAndNumberByPersonalityType(personalityType);

            // 반영 비율 및 개수를 계산 할 수 없을 때
            if(!personalityCategoryRatioAndNumberList.isPresent()){
                List<TourApiItem> tourApiItemList =
                        tourApiService.findAllData(areaCode, sggCode);
                List<ItemRes> itemResList = new ArrayList<>();
                Optional<List<ItemLike>> likeList = itemLikeRepository.findAllByUserIdx(userIdx);
                Optional<List<UserBookmark>> bookmarkList = userBookmarkRepository.findAllByUserIdx(userIdx);
                for(int i = 0; i < tourApiItemList.size(); i++){
                    ItemRes itemRes = new ItemRes();
                    itemRes.setContentIdx(tourApiItemList.get(i).getContentIdx());
                    itemRes.setImageUrl(tourApiItemList.get(i).getImageUrl());
                    itemRes.setLiked(false); itemRes.setBookmarked(false);

                    if(likeList.isPresent()){
                        for(int j = 0; j < likeList.get().size(); j++){
                            int likedContentIdx = likeList.get().get(j).getContentIdx();
                            if(likedContentIdx == tourApiItemList.get(i).getContentIdx()){
                                itemRes.setLiked(true);
                                break;
                            }
                        }
                    }

                    if(bookmarkList.isPresent()){
                        for(int j = 0; j < bookmarkList.get().size(); j++){
                            int bookmarkedContentIdx = bookmarkList.get().get(j).getContentIdx();
                            if(bookmarkedContentIdx == tourApiItemList.get(i).getContentIdx()){
                                itemRes.setBookmarked(true);
                                break;
                            }
                        }
                    }

                    itemResList.add(itemRes);
                }
                return DefaultRes.res(StatusCode.OK, "아이템 전체 조회 성공",itemResList);
            }
            else{

            }
        }
        return DefaultRes.res(StatusCode.NOT_FOUND, "아이템을 찾을 수 없습니다.");
    }

    public Optional<List<PersonalityCategoryRatioAndNumber>>
    findAllCategoryRatioAndNumberByPersonalityType(PersonalityType personalityType){
        Optional<Personality> personality = personalityRepository.findByPersonalityType(personalityType);
        if(!personality.isPresent()) return Optional.empty();
        else {
            int personalityLikesCount = personality.get().getLikesCount();
            Optional<List<PersonalityCategory>> personalityCategoryList =
                    personalityCategoryRepository.findAllByPersonalityType(personalityType);
            if(!personalityCategoryList.isPresent()) return Optional.empty();
            else{
                List<PersonalityCategoryRatioAndNumber> personalityCategoryRatioList = new ArrayList<>();
                for(int i = 0; i < personalityCategoryList.get().size(); i++){
                    int personalityCategoryLikesCount =
                            personalityCategoryList.get().get(i).getLikesCount();
                    double ratio = (double)personalityCategoryLikesCount / (double) personalityLikesCount;
                    int num = (int)(TOTAL_NUM_OF_ITEMS * ratio);
                    PersonalityCategoryRatioAndNumber personalityCategoryRatio = new PersonalityCategoryRatioAndNumber();
                    personalityCategoryRatio.setCategoryCode(personalityCategoryList.get().get(i).getCategoryCode());
                    personalityCategoryRatio.setRatio(ratio);
                    personalityCategoryRatio.setNumber(num);
                    personalityCategoryRatioList.add(personalityCategoryRatio);
                }
                return Optional.of(personalityCategoryRatioList);
            }
        }
    }
}
