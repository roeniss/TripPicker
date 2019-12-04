package com.picker.trip.service;

import com.picker.trip.model.DefaultRes;
import com.picker.trip.model.TourApiItem;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ItemService {

    private final TourApiService tourApiService;

    public ItemService(final TourApiService tourApiService) {
        this.tourApiService = tourApiService;
    }

    /**
     * 모든 회원 조회
     * @return
     */
    public DefaultRes<List<TourApiItem>> findAllItems(final int userIdx) {
        tourApiService.findAllData(userIdx);
        return DefaultRes.res(StatusCode.OK, "사용자 정보 조회 완료");
    }
}
