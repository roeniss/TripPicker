package com.picker.trip.service;

import com.picker.trip.domain.UserBookmark;
import com.picker.trip.model.BookmarkItem;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.repository.UserBookmarkRepository;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BookmarkService {

    private final UserBookmarkRepository userBookmarkRepository;
    private final TourApiService tourApiService;

    public BookmarkService(final UserBookmarkRepository userBookmarkRepository,
                           final TourApiService tourApiService) {
        this.userBookmarkRepository = userBookmarkRepository;
        this.tourApiService = tourApiService;
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
            return DefaultRes.res(StatusCode.CREATED, "즐겨찾기 취소 성공");
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
                bookmarkItemList.add(bookmarkItem);
            }
            return DefaultRes.res(StatusCode.OK, "즐겨찾기 아이템 조회 성공", bookmarkItemList);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "즐겨찾기 아이템 조회 실패");
        }
    }
}
