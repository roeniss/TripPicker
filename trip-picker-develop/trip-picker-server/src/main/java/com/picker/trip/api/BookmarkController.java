package com.picker.trip.api;

import com.picker.trip.domain.UserBookmark;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.service.BookmarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.picker.trip.model.DefaultRes.FAIL_DEFAULT_RES;

@Slf4j
@RestController
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(final BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    /**
     * 즐겨찾기
     * @param userBookmark
     * @return ResponseEntity<DefaultRes>
     */
    @PostMapping("/bookmarks")
    public ResponseEntity<DefaultRes> saveUserBookmark(@RequestBody final UserBookmark userBookmark) {
        try {
            return new ResponseEntity<>(bookmarkService.saveUserBookmark(userBookmark), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 즐겨찾기 취소
     * @param userBookmark
     * @return ResponseEntity<DefaultRes>
     */
    @PostMapping("/bookmarks/cancel")
    public ResponseEntity<DefaultRes> cancelUserBookmark(@RequestBody final UserBookmark userBookmark) {
        try {
            return new ResponseEntity<>(bookmarkService.deleteUserBookmark(userBookmark), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 즐겨찾기 아이템 전체
     * @param userIdx
     * @return ResponseEntity<DefaultRes>
     */
    @GetMapping("/bookmarks/{userIdx}")
    public ResponseEntity<DefaultRes> getAllBookmarkedItems(@PathVariable("userIdx") final int userIdx) {
        try {
            return new ResponseEntity<>(bookmarkService.findAllBookmarkedItems(userIdx), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}