package com.picker.trip.service;

import com.picker.trip.domain.UserBookmark;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.repository.UserBookmarkRepository;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BookmarkService {

    private final UserBookmarkRepository userBookmarkRepository;

    public BookmarkService(final UserBookmarkRepository userBookmarkRepository) {
        this.userBookmarkRepository = userBookmarkRepository;
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
}
