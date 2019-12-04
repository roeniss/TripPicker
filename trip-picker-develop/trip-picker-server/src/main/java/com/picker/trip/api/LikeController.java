package com.picker.trip.api;

import com.picker.trip.domain.ItemLike;
import com.picker.trip.model.DefaultRes;
import com.picker.trip.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.picker.trip.model.DefaultRes.FAIL_DEFAULT_RES;

@Slf4j
@RestController
public class LikeController {
    private final LikeService likeService;

    public LikeController(final LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/likes")
    public ResponseEntity<DefaultRes> saveItemLike(@RequestBody final ItemLike itemLike) {
        try {
            return new ResponseEntity<>(likeService.saveItemLike(itemLike), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/likes/cancel")
    public ResponseEntity<DefaultRes> cancelItemLike(@RequestBody final ItemLike itemLike) {
        try {
            return new ResponseEntity<>(likeService.deleteItemLike(itemLike), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
