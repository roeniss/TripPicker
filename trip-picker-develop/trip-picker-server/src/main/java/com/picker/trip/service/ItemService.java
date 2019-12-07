package com.picker.trip.service;

import com.picker.trip.domain.*;
import com.picker.trip.model.*;
import com.picker.trip.model.enums.CustomCategoryType;
import com.picker.trip.model.enums.PersonalityType;
import com.picker.trip.repository.*;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

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
    private final ItemRepository itemRepository;

    private final int TOTAL_NUM_OF_ITEMS = 100;
    private final List<String> categoryCodeList = new ArrayList<>(
            Arrays.asList("A0101", "A0201", "A0202", "A0203", "A0204", "A0205", "A0206", "A0207", "A0208"
                    , "A0302", "A0303", "A0304", "A0305"
                    , "A0401", "A0502"));

    private static Map<CustomCategoryType, ArrayList<String>> categoryCodeMap = new HashMap() {{
        put(CustomCategoryType.NATURE, new ArrayList<>(
                Arrays.asList("A0101", "A0102")
        ));
        put(CustomCategoryType.HISTORY, new ArrayList<>(
                Arrays.asList("A0201")
        ));
        put(CustomCategoryType.REST, new ArrayList<>(
                Arrays.asList("A0202")
        ));
        put(CustomCategoryType.EXPERIENCE, new ArrayList<>(
                Arrays.asList("A0203")
        ));
        put(CustomCategoryType.INDUSTRY, new ArrayList<>(
                Arrays.asList("A0204", "A0205")
        ));
        put(CustomCategoryType.CULTURE, new ArrayList<>(
                Arrays.asList("A0206")
        ));
        put(CustomCategoryType.FESTIVAL, new ArrayList<>(
                Arrays.asList("A0207", "A0208")
        ));
        put(CustomCategoryType.REPORTS, new ArrayList<>(
                Arrays.asList("A0302", "A0303", "A0304", "A0305")
        ));
        put(CustomCategoryType.SHOPPING, new ArrayList<>(
                Arrays.asList("A0401")
        ));
        put(CustomCategoryType.RESTAURANT, new ArrayList<>(
                Arrays.asList("A0502")
        ));
    }};


    public ItemService(final TourApiService tourApiService,
                       final UserPreferenceRepository userPreferenceRepository,
                       final UserLocationRepository userLocationRepository,
                       final UserPersonalityRepository userPersonalityRepository,
                       final PersonalityRepository personalityRepository,
                       final PersonalityCategoryRepository personalityCategoryRepository,
                       final ItemLikeRepository itemLikeRepository,
                       final UserBookmarkRepository userBookmarkRepository,
                       final ItemRepository itemRepository) {
        this.tourApiService = tourApiService;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userLocationRepository = userLocationRepository;
        this.userPersonalityRepository = userPersonalityRepository;
        this.personalityRepository = personalityRepository;
        this.personalityCategoryRepository = personalityCategoryRepository;
        this.itemLikeRepository = itemLikeRepository;
        this.userBookmarkRepository = userBookmarkRepository;
        this.itemRepository = itemRepository;
    }

    /**
     * 모든 아이템 조회
     *
     * @return
     */
    public DefaultRes<List<ItemRes>> findAllItems(final int userIdx, final boolean isSelected) {
        try {
            int areaCode, sggCode;

            if (isSelected && userLocationRepository.findByUserIdx(userIdx).isPresent()) {
                areaCode = userLocationRepository.findByUserIdx(userIdx).get().getAreaCode();
                sggCode = userLocationRepository.findByUserIdx(userIdx).get().getSggCode();
            } else if (!isSelected && userPreferenceRepository.findByUserIdx(userIdx).isPresent()) {
                areaCode = userPreferenceRepository.findByUserIdx(userIdx).get().getAreaCode();
                sggCode = userPreferenceRepository.findByUserIdx(userIdx).get().getSggCode();
            } else {
                return DefaultRes.res(StatusCode.NOT_FOUND, "아이템을 찾을 수 없습니다.");
            }

            PersonalityType personalityType =   // 해당 회원이 속하는 퍼스널리티
                    userPersonalityRepository.findByUserIdx(userIdx).get().getPersonalityType();

            // 해당 퍼스널리티의 각 카테고리별 반영 비율 및 개수
            Optional<List<PersonalityCategoryRatioAndNumber>> personalityCategoryRatioAndNumberList =
                    findAllCategoryRatioAndNumberByPersonalityType(personalityType);

            // 반영 비율 및 개수를 계산 할 수 없을 때
            if (!personalityCategoryRatioAndNumberList.isPresent()) {
                List<TourApiItem> tourApiItemList =
                        tourApiService.findAllData(areaCode, sggCode);

                List<ItemRes> itemResList = new ArrayList<>();
                for(int i = 0; i < tourApiItemList.size(); i++){
                    TourApiItem tourApiItem = tourApiItemList.get(i);
                    ItemRes itemRes = new ItemRes();
                    itemRes.setCategoryCode
                            (transCategoryCodeIntoCustomCategoryType(tourApiItem.getCategoryCode()));
                    itemRes.setImageUrl(tourApiItem.getImageUrl());
                    itemRes.setSubCategoryCode(tourApiItem.getSubCategoryCode());
                    itemRes.setTitle(tourApiItem.getTitle());
                    itemRes.setContentIdx(tourApiItem.getContentIdx());

                    itemResList.add(itemRes);
                }
                itemResList = itemResList.subList(0,100);

                List<ItemRes> itemResListAfterSetLikesAndBookmarks =
                        setLikesAndBookmarks(itemResList, userIdx);

                return DefaultRes.res(StatusCode.OK, "아이템 전체 조회 성공",
                        itemResListAfterSetLikesAndBookmarks);
            }

            // 반영 비율 및 개수를 계산 할 수 있을 때
            else {
                List<PersonalityCategoryRatioAndNumber> pcList =
                        personalityCategoryRatioAndNumberList.get();
                Collections.sort(pcList);

                List<UserPersonality> userPersonalityList =
                        userPersonalityRepository.findAllByPersonalityType(personalityType).get();

                List<Integer> userIdxList = new ArrayList<>();
                for (UserPersonality upl : userPersonalityList) {
                    userIdxList.add(upl.getUserIdx());
                }

                List<ItemLike> itemLikeList = new ArrayList<>();
                for (Integer id : userIdxList) {
                    for (PersonalityCategoryRatioAndNumber pcrn : pcList) {
                        Optional<List<ItemLike>> itemLikeTempList =
                                itemLikeRepository.findAllByUserIdxAndCategoryCode(id.intValue(), pcrn.getCategoryCode());
                        if (!itemLikeTempList.isPresent()) continue;
                        itemLikeList.addAll(itemLikeTempList.get());
                    }
                }


                List<Item> itemList = new ArrayList<>();
                for (ItemLike itemLike : itemLikeList) {
                    itemList.add(itemRepository.findByContentIdx(itemLike.getContentIdx()).get());
                }

                // 반영 비율 적용해서 최종적으로 리턴할 아이템 리스트
                List<ItemRes> tourApiItemListAfterApplyRatio = new ArrayList<>();

                for (int i = 0; i < itemList.size(); i++) {
                    CustomCategoryType customCategoryType = itemList.get(i).getCategoryCode();
                    for (int k = 0; k < pcList.size(); k++) {
                        if (customCategoryType.equals(pcList.get(k).getCategoryCode())) {
                            if (pcList.get(k).getStackedNumber() == pcList.get(k).getNumber()) continue;

                            Item item = itemList.get(i);
                            ItemRes itemRes = new ItemRes();

                            itemRes.setContentIdx(item.getContentIdx());
                            itemRes.setCategoryCode(item.getCategoryCode());
                            itemRes.setSubCategoryCode(item.getSubCategoryCode());
                            itemRes.setImageUrl(item.getImageUrl());
                            itemRes.setTitle(item.getTitle());

                            tourApiItemListAfterApplyRatio.add(itemRes);
                            pcList.get(k).setStackedNumber(pcList.get(k).getStackedNumber() + 1);
                            break;
                        }
                    }
                }


                System.out.println("------------------ (1) 좋아요 받은 아이템  ------------------");
                for (PersonalityCategoryRatioAndNumber p : pcList) {
                    System.out.println("Category : " + p.getCategoryCode() + "   " + p.getStackedNumber() + " / " +
                            p.getNumber());
                }

                //여기까지//
                List<TourApiItem> tourApiItemList =
                        tourApiService.findAllData(areaCode, sggCode);

                for (int j = 0; j < tourApiItemList.size(); j++) {
                    String categoryCode = tourApiItemList.get(j).getCategoryCode();
                    if (transCategoryCodeIntoCustomCategoryType(categoryCode) == null) {
                        continue;
                    }
                    CustomCategoryType customCategoryType =
                            transCategoryCodeIntoCustomCategoryType(categoryCode);
                    for (int k = 0; k < pcList.size(); k++) {
                        if (pcList.get(k).getStackedNumber() == pcList.get(k).getNumber()) continue;
                        if (customCategoryType.equals(pcList.get(k).getCategoryCode())) {
                            boolean isDoubled = false;
                            for (ItemRes itemRes : tourApiItemListAfterApplyRatio) {
                                if (itemRes.getContentIdx() == tourApiItemList.get(j).getContentIdx())
                                    isDoubled = true;
                                continue;
                            }
                            if (isDoubled) continue;
                            TourApiItem tourApiItem = tourApiItemList.get(j);
                            ItemRes itemRes = new ItemRes();
                            itemRes.setContentIdx(tourApiItem.getContentIdx());
                            itemRes.setImageUrl(tourApiItem.getImageUrl());
                            itemRes.setTitle(tourApiItem.getTitle());
                            itemRes.setCategoryCode
                                    (transCategoryCodeIntoCustomCategoryType(tourApiItem.getCategoryCode()));
                            itemRes.setSubCategoryCode(tourApiItem.getSubCategoryCode());

                            tourApiItemListAfterApplyRatio.add(itemRes);
                            pcList.get(k).setStackedNumber(pcList.get(k).getStackedNumber() + 1);
                            break;
                        }
                    }
                }

                System.out.println("\n------------------ (2) 좋아요 받지 못한 아이템 ------------------\n");
                for (PersonalityCategoryRatioAndNumber p : pcList) {
                    System.out.println("Category : " + p.getCategoryCode() + "   " + p.getStackedNumber() + " / " +
                            p.getNumber());
                }

                //List<ItemRes> itemResList = setLikesAndBookmarks(tourApiItemList, userIdx);
                List<ItemRes> itemResList = setLikesAndBookmarks(tourApiItemListAfterApplyRatio, userIdx);
                return DefaultRes.res(StatusCode.OK, "아이템 전체 조회 성공", itemResList);
            }
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            return DefaultRes.res(StatusCode.NOT_FOUND, "아이템을 찾을 수 없습니다.");
        }
    }

    /**
     * 상세 아이템 조회
     *
     * @return
     */
    public DefaultRes<ItemSpecRes> findSpecItem(final int userIdx, final int contentIdx, final boolean isSelected) {
        try {
            int areaCode, sggCode;

            if (isSelected && userLocationRepository.findByUserIdx(userIdx).isPresent()) {
                areaCode = userLocationRepository.findByUserIdx(userIdx).get().getAreaCode();
                sggCode = userLocationRepository.findByUserIdx(userIdx).get().getSggCode();
            } else if (!isSelected && userPreferenceRepository.findByUserIdx(userIdx).isPresent()) {
                areaCode = userPreferenceRepository.findByUserIdx(userIdx).get().getAreaCode();
                sggCode = userPreferenceRepository.findByUserIdx(userIdx).get().getSggCode();
            } else {
                return DefaultRes.res(StatusCode.NOT_FOUND, "아이템을 찾을 수 없습니다.");
            }

            TourApiItem tourApiItem =
                    tourApiService.findSpecDataByContentIdx(contentIdx);

            ItemSpecRes itemSpecRes = new ItemSpecRes();
            ItemRes itemRes = new ItemRes();
            ItemExtraRes itemExtraRes = new ItemExtraRes();

            itemRes.setContentIdx(tourApiItem.getContentIdx());
            itemRes.setTitle(tourApiItem.getTitle());
            itemRes.setSubCategoryCode(tourApiItem.getSubCategoryCode());
            itemRes.setImageUrl(tourApiItem.getImageUrl());

            itemRes.setCategoryCode(transCategoryCodeIntoCustomCategoryType(tourApiItem.getCategoryCode()));

            itemRes = setLikeAndBookmark(itemRes, userIdx);

            itemExtraRes.setAddress(tourApiItem.getTourApiItemCommon().getAddress());
            int start = tourApiItem.getTourApiItemCommon().getHomepageUrl().indexOf("\"");
            String lastPhrase = tourApiItem.getTourApiItemCommon().getHomepageUrl().substring(start+1);
            int end  = lastPhrase.indexOf("\"");
            String parsedHomepageUrl = lastPhrase.substring(0, end);

            itemExtraRes.setHomepageUrl(parsedHomepageUrl);
            itemExtraRes.setOverview(tourApiItem.getTourApiItemCommon().getOverview()
                    .replaceAll("<br>", ""));

            List<String>imageUrlList = tourApiService.findAllImageData(contentIdx);
            itemExtraRes.setSubImageUrlList(imageUrlList);

            List<RelatedItem> relatedItemList = tourApiService.findDataByAreaCodeAndCategoryCodeAndSubCategoryCode
                    (areaCode, tourApiItem.getCategoryCode(), tourApiItem.getSubCategoryCode());

            List<RelatedItem> finalRelateItemList = new ArrayList<>();

            for(RelatedItem r : relatedItemList){
                if(finalRelateItemList.size() == 2) break;
                if(!itemRepository.findByContentIdx(r.getContentIdx()).isPresent()
                        && tourApiItem.getContentIdx() != r.getContentIdx()){
                    finalRelateItemList.add(r);
                }
            }
            itemExtraRes.setRelatedItemList(finalRelateItemList);

            itemSpecRes.setItemRes(itemRes);
            itemSpecRes.setItemExtraRes(itemExtraRes);

            return DefaultRes.res(StatusCode.OK, "아이템 상세 조회 성공",
                    itemSpecRes);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.OK, "아이템 상세 조회 실패");
        }
    }


    public CustomCategoryType transCategoryCodeIntoCustomCategoryType(String categoryCode) {
        for (CustomCategoryType customCategoryType : categoryCodeMap.keySet()) {
            List<String> categoryCodeList = categoryCodeMap.get(customCategoryType);
            for (String c : categoryCodeList) {
                if (c.equals(categoryCode)) {
                    return customCategoryType;
                }
            }
        }
        return null;
    }

    public Optional<List<PersonalityCategoryRatioAndNumber>>
    findAllCategoryRatioAndNumberByPersonalityType(PersonalityType personalityType) {
        try {
            Optional<Personality> personality = personalityRepository.findByPersonalityType(personalityType);
            if (!personality.isPresent()) return Optional.empty();
            else {
                double personalityLikesCount = (double) personality.get().getLikesCount();

                Optional<List<PersonalityCategory>> personalityCategoryList =
                        personalityCategoryRepository.findAllByPersonalityType(personalityType);
                if (!personalityCategoryList.isPresent()) return Optional.empty();
                else {
                    List<PersonalityCategoryRatioAndNumber> personalityCategoryRatioList = new ArrayList<>();
                    int numOfUserInPersonality =
                            userPersonalityRepository.countByPersonalityType(personalityType).get().intValue();
                    final double numOfCategory = 10.0;
                    for (CustomCategoryType categoryCode : categoryCodeMap.keySet()) {
                        double personalityCategoryLikesCount = 0;
                        for (int i = 0; i < personalityCategoryList.get().size(); i++) {
                            if (categoryCode.equals(personalityCategoryList.get().get(i).getCategoryCode())) {
                                personalityCategoryLikesCount =
                                        (double) personalityCategoryList.get().get(i).getLikesCount();
                                break;
                            }
                        }

                        // (1/C) + ((x/y) - (1/C))/n

                        double ratio = 1.0 / (numOfCategory) +
                                (((personalityCategoryLikesCount / personalityLikesCount) -
                                        (1 / (numOfCategory))) / (numOfUserInPersonality));

                        int num = (int) (TOTAL_NUM_OF_ITEMS * ratio);
                        PersonalityCategoryRatioAndNumber personalityCategoryRatio = new PersonalityCategoryRatioAndNumber();
                        personalityCategoryRatio.setCategoryCode(categoryCode);
                        personalityCategoryRatio.setRatio(ratio);
                        personalityCategoryRatio.setNumber(num);
                        personalityCategoryRatio.setStackedNumber(0);
                        personalityCategoryRatioList.add(personalityCategoryRatio);
                    }
                    return Optional.of(personalityCategoryRatioList);
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            return Optional.empty();
        }
    }

    public List<ItemRes> setLikesAndBookmarks(final List<ItemRes> tourApiItemList, final int userIdx) {
        List<ItemRes> itemResList = new ArrayList<>();
        Optional<List<ItemLike>> likeList = itemLikeRepository.findAllByUserIdx(userIdx);
        Optional<List<UserBookmark>> bookmarkList = userBookmarkRepository.findAllByUserIdx(userIdx);
        for (int i = 0; i < tourApiItemList.size(); i++) {

            ItemRes itemRes = new ItemRes();
            itemRes.setContentIdx(tourApiItemList.get(i).getContentIdx());
            itemRes.setImageUrl(tourApiItemList.get(i).getImageUrl());
            itemRes.setTitle(tourApiItemList.get(i).getTitle());
            itemRes.setCategoryCode(tourApiItemList.get(i).getCategoryCode());
            itemRes.setSubCategoryCode(tourApiItemList.get(i).getSubCategoryCode());
            itemRes.setLiked(false);
            itemRes.setBookmarked(false);

            if (likeList.isPresent()) {
                for (int k = 0; k < likeList.get().size(); k++) {
                    int likedContentIdx = likeList.get().get(k).getContentIdx();
                    if (likedContentIdx == tourApiItemList.get(i).getContentIdx()) {
                        itemRes.setLiked(true);
                        break;
                    }
                }
            }

            if (bookmarkList.isPresent()) {
                for (int k = 0; k < bookmarkList.get().size(); k++) {
                    int bookmarkedContentIdx = bookmarkList.get().get(k).getContentIdx();
                    if (bookmarkedContentIdx == tourApiItemList.get(i).getContentIdx()) {
                        itemRes.setBookmarked(true);
                        break;
                    }
                }
            }
            itemResList.add(itemRes);
        }
        return itemResList;
    }

    public ItemRes setLikeAndBookmark(final ItemRes tourApiItem, final int userIdx) {
        Optional<List<ItemLike>> likeList = itemLikeRepository.findAllByUserIdx(userIdx);
        Optional<List<UserBookmark>> bookmarkList = userBookmarkRepository.findAllByUserIdx(userIdx);
        ItemRes itemRes = new ItemRes();
        itemRes.setContentIdx(tourApiItem.getContentIdx());
        itemRes.setImageUrl(tourApiItem.getImageUrl());
        itemRes.setTitle(tourApiItem.getTitle());
        itemRes.setCategoryCode(tourApiItem.getCategoryCode());
        itemRes.setSubCategoryCode(tourApiItem.getSubCategoryCode());
        itemRes.setLiked(false);
        itemRes.setBookmarked(false);

        if (likeList.isPresent()) {
            for (int k = 0; k < likeList.get().size(); k++) {
                int likedContentIdx = likeList.get().get(k).getContentIdx();
                if (likedContentIdx == tourApiItem.getContentIdx()) {
                    itemRes.setLiked(true);
                    break;
                }
            }
        }

        if (bookmarkList.isPresent()) {
            for (int k = 0; k < bookmarkList.get().size(); k++) {
                int bookmarkedContentIdx = bookmarkList.get().get(k).getContentIdx();
                if (bookmarkedContentIdx == tourApiItem.getContentIdx()) {
                    itemRes.setBookmarked(true);
                    break;
                }
            }
        }
        return itemRes;
    }
}