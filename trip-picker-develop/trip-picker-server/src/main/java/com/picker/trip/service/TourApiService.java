package com.picker.trip.service;

import com.picker.trip.model.*;
import com.picker.trip.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class TourApiService {

    private final String serviceKey = "FCP2QZqd3Gp4WgFjf6p72gznY9WKTFusvefoLCiMwtOO1nwhbOWw%2FeG62h1ArYKKEn0cSKDbeE6ZznAEsDsT9w%3D%3D";

    /**
     * 관광 정보 API 호출
     * @return
     */
    public List<TourApiItem>findAllData(final int areaCode) {
        try {
            List<SggCode> sggCodeList = findAreaCode(areaCode);
            for(SggCode sggCode : sggCodeList ){
                System.out.println(sggCode.getSggCodeIdx() + "    /     " + sggCode.getName());
            }

            StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey); /*Service Key*/

            //urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*현재 페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명=어플명*/
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS (아이폰), AND (안드로이드),WIN (원도우폰), ETC*/
            urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*(A=제목순, B=조회순, C=수정일순, D=생성일순) , 대표이미지가 반드시 있는 정렬 (O=제목순, P=조회순, Q=수정일순, R=생성일순)*/
            urlBuilder.append("&" + URLEncoder.encode("cat1","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*대분류 코드*/
            //urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(관광지, 숙박 등) ID*/
            urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + areaCode); /*지역코드*/
            urlBuilder.append("&" + URLEncoder.encode("sigunguCode","UTF-8") + "=" + sggCodeList.get(0).getSggCodeIdx()); /*시군구코드(areaCode 필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("cat2","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*중분류 코드(cat1필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("cat3","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*소분류 코드(cat1,cat2필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록 구분 (Y=목록, N=개수)*/

            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
            List<TourApiItem> tourApiItemList = new ArrayList<>();
            for(int i = 0; i<jsonArray.length(); i++){
                TourApiItem tourApiItem = new TourApiItem();
                int contentId = jsonArray.getJSONObject(i).getInt("contentid");
                int contentTypeId = jsonArray.getJSONObject(i).getInt("contenttypeid");
                String title = jsonArray.getJSONObject(i).getString("title");
                String categoryCode = jsonArray.getJSONObject(i).getString("cat2");
                String subCategoryCode = jsonArray.getJSONObject(i).getString("cat3");

                String address = ""; String phoneNumber = ""; String imageUrl = "";

                if(jsonArray.getJSONObject(i).isNull("addr1")) continue;
                else address = jsonArray.getJSONObject(i).getString("addr1");

                if(jsonArray.getJSONObject(i).isNull("tel")) continue;
                else phoneNumber = jsonArray.getJSONObject(i).getString("tel");

                if(jsonArray.getJSONObject(i).isNull("firstimage")) continue;
                else imageUrl = jsonArray.getJSONObject(i).getString("firstimage");

                tourApiItem.setContentId(contentId);
                tourApiItem.setContentTypeId(contentTypeId);
                tourApiItem.setTitle(title);
                tourApiItem.setCategoryCode(categoryCode);
                tourApiItem.setSubCategoryCode(subCategoryCode);
                tourApiItem.setAddress(address);
                tourApiItem.setPhoneNumber(phoneNumber);
                tourApiItem.setImageUrl(imageUrl);

                TourApiItemCommon tourApiItemCommon =
                        findCommonData(tourApiItem.getContentId(), tourApiItem.getContentTypeId());
                tourApiItem.setTourApiItemCommon(tourApiItemCommon);
                tourApiItemList.add(tourApiItem);
            }

            return tourApiItemList;
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    /**
     * 관광 정보 API 호출
     * @return
     */
    public DefaultRes<List<TourApiItem>>findAllDetailData() {
        try {
            StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey); /*Service Key*/

            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*현재 페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("20", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명=어플명*/
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS (아이폰), AND (안드로이드),WIN (원도우폰), ETC*/
            urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); /*(A=제목순, B=조회순, C=수정일순, D=생성일순) , 대표이미지가 반드시 있는 정렬 (O=제목순, P=조회순, Q=수정일순, R=생성일순)*/
            urlBuilder.append("&" + URLEncoder.encode("cat1","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*대분류 코드*/
            //urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode("15", "UTF-8")); /*관광타입(관광지, 숙박 등) ID*/
            //urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + URLEncoder.encode("4", "UTF-8")); /*지역코드*/
            //urlBuilder.append("&" + URLEncoder.encode("sigunguCode","UTF-8") + "=" + URLEncoder.encode("4", "UTF-8")); /*시군구코드(areaCode 필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("cat2","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*중분류 코드(cat1필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("cat3","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*소분류 코드(cat1,cat2필수)*/
            //urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*목록 구분 (Y=목록, N=개수)*/

            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");

            List<TourApiItem> tourApiItemList = new ArrayList<>();
            for(int i = 0; i<jsonArray.length(); i++){
                TourApiItem tourApiItem = new TourApiItem();
                int contentId = jsonArray.getJSONObject(i).getInt("contentid");
                String title = jsonArray.getJSONObject(i).getString("title");
                tourApiItem.setContentId(contentId);
                tourApiItem.setTitle(title);
                tourApiItemList.add(tourApiItem);
            }

            return DefaultRes.res(StatusCode.OK, "사용자 정보 조회 완료",
                    tourApiItemList);
        }
        catch (Exception e){
            System.out.println(e);
            return DefaultRes.res(StatusCode.OK, "에러");
        }
    }

    public TourApiItemCommon findCommonData(final int contentIdx, final int contentTypeIdx){
        try{
            StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + URLEncoder.encode("인증키", "UTF-8")); /*공공데이터포털에서*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*현재 페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명=어플명*/
            urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + contentIdx); /*콘텐츠ID*/
            urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" +contentTypeIdx); /*관광타입(관광지, 숙박 등) ID*/
            urlBuilder.append("&" + URLEncoder.encode("defaultYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*기본정보 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("firstImageYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*원본, 썸네일 대표이미지 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("areacodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*지역코드, 시군구코드 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("catcodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*대,중,소분류코드 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("addrinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*주소, 상세주소 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("mapinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*좌표 X,Y 조회여부*/
            urlBuilder.append("&" + URLEncoder.encode("overviewYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*콘텐츠 개요 조회여부*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            JSONObject jsonObject = XML.toJSONObject(sb.toString());

            JSONObject target = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONObject("item");

            TourApiItemCommon tourApiItemCommon = new TourApiItemCommon();

            if(target.isNull("zipcode")) tourApiItemCommon.setZipCode("");
            else tourApiItemCommon.setZipCode(target.getString("zipcode"));
            if(target.isNull("homepage")) tourApiItemCommon.setHomepageUrl("");
            else tourApiItemCommon.setHomepageUrl(target.getString("homepage"));
            if(target.isNull("overview")) tourApiItemCommon.setOverView("");
            else tourApiItemCommon.setOverView(target.getString("overview"));
            return tourApiItemCommon;
        }
        catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

    public List<SggCode> findAreaCode(final int areaCode){
        try {
            StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과수*/
            //urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*현재 페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS (아이폰), AND (안드로이드), WIN (원도우폰), ETC*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명=어플명*/
            urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + areaCode); /*지역코드, 시군구코드*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            System.out.println(sb.toString());
            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
            List<SggCode> sggCodeList = new ArrayList<>();
            for(int i = 0; i<jsonArray.length(); i++){
                SggCode sggCode = new SggCode();
                sggCode.setSggCodeIdx(jsonArray.getJSONObject(i).getInt("code"));
                sggCode.setName(jsonArray.getJSONObject(i).getString("name"));
                sggCodeList.add(sggCode);
            }
            return sggCodeList;
        }
        catch (Exception e){
            return null;
        }
    }

    public void findAreaCodeTest(){
        try {
            StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + serviceKey); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과수*/
            //urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*현재 페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS (아이폰), AND (안드로이드), WIN (원도우폰), ETC*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8")); /*서비스명=어플명*/
            //urlBuilder.append("&" + URLEncoder.encode("areaCode","UTF-8") + "=" + areaCode); /*지역코드, 시군구코드*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            System.out.println(sb.toString());
        }
        catch (Exception e){
        }
    }
}
