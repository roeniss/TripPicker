package com.picker.trip.service;

import com.picker.trip.domain.ItemLike;
import com.picker.trip.domain.UserBookmark;
import com.picker.trip.model.BookmarkItem;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.model.ItemRes;
import com.picker.trip.model.TourApiItem;
import com.picker.trip.model.enums.CustomCategoryType;
import com.picker.trip.repository.ItemLikeRepository;
import com.picker.trip.repository.UserBookmarkRepository;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BookmarkService {

    private final UserBookmarkRepository userBookmarkRepository;
    private final TourApiService tourApiService;
    private final ItemLikeRepository itemLikeRepository;

    public BookmarkService(final UserBookmarkRepository userBookmarkRepository,
                           final TourApiService tourApiService,
                           final ItemLikeRepository itemLikeRepository) {
        this.userBookmarkRepository = userBookmarkRepository;
        this.tourApiService = tourApiService;
        this.itemLikeRepository = itemLikeRepository;
    }

    /**
     * 즐겨찾기 저장
     * @return
     */
    public DefaultRes saveUserBookmark(final UserBookmark userBookmark){
        try {
            userBookmarkRepository.save(userBookmark);
            return DefaultRes.res(StatusCode.CREATED, "즐겨찾기 저장 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "즐겨찾기 저장 실패");
        }
    }
    /**
     * 즐겨찾기 취소
     * @return
     */
    public DefaultRes deleteUserBookmark(final UserBookmark userBookmark){
        try {
            userBookmarkRepository.deleteByUserIdxAndContentIdx(userBookmark.getUserIdx(), userBookmark.getContentIdx());
            return DefaultRes.res(StatusCode.OK, "즐겨찾기 취소 성공");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "즐겨찾기 취소 실패");
        }
    }

    /**
     * 즐겨찾기 아이템 전체 조회
     * @return
     */
    public DefaultRes findAllBookmarkedItems(final int userIdx){
        try {
            if(!userBookmarkRepository.findAllByUserIdx(userIdx).isPresent()){
                return DefaultRes.res(StatusCode.NOT_FOUND, "즐겨찾기한 아이템이 없습니다.");
            }
            List<UserBookmark> userBookmarkList =
                    userBookmarkRepository.findAllByUserIdx(userIdx).get();

            List<BookmarkItem> bookmarkItemList = new ArrayList<>();
            for(int i = 0; i < userBookmarkList.size(); i++){
                BookmarkItem bookmarkItem =
                        tourApiService.findDataByContentIdx(userBookmarkList.get(i).getContentIdx());
                bookmarkItem.setCategoryCode(userBookmarkList.get(i).getCategoryCode());
                bookmarkItem.setSubCategoryCode(userBookmarkList.get(i).getSubCategoryCode());

                Optional itemLike = itemLikeRepository.findByUserIdxAndContentIdx
                        (userBookmarkList.get(i).getUserIdx(), userBookmarkList.get(i).getContentIdx());

                if(!itemLike.isPresent()) bookmarkItem.setLiked(false);
                else bookmarkItem.setLiked(true);

                Optional userBookmark = userBookmarkRepository.findByUserIdxAndContentIdx
                        (userBookmarkList.get(i).getUserIdx(), userBookmarkList.get(i).getContentIdx());

                if(!userBookmark.isPresent()) bookmarkItem.setBookmarked(false);
                else bookmarkItem.setBookmarked(true);

                bookmarkItemList.add(bookmarkItem);
            }
            return DefaultRes.res(StatusCode.OK, "즐겨찾기 아이템 조회 성공", bookmarkItemList);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "즐겨찾기 아이템 조회 실패");
        }
    }
}
