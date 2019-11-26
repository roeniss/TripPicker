import React, { useContext, useEffect, useState } from "react";
import { DispatchContext, StateContext } from "../App";
import { axios } from "../customAxios";
import styled from "styled-components";

const dummyItems = [
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg",
    location: "서울시 마포구 신수동 정하상관 1032호",
    title: "타이틀2222222222",
    desc:
      "미국의 국도(US 하이웨이) 제66호선. 일리노이주 시카고와 캘리포니아주 로 스앤젤레스를 잇는 총연장 3,940km의 일반국도였다. 애리조나를 관통하여 시카고, LA, 라스베가스 등 주요 도시를 잇는 서부의 축선 중 하나였다.특히 이 도로는 Mother Road라고도 부를 정도로 미국인들에게는 촌동네 향수 비슷한 문화코드로 자리매김하고 있는데, 관련해서 냇 킹 콜의 노래 'Route 66'가 유명하다. 이 노래는 리듬 앤 블루스의 명곡이라 엘비스 프레슬 리 등 많은 가수가 커버하였다. 심지어 미국을 밟아본 적도, 저 도로를 들어본 적도 없는 한국인들이 맥주 파는 펍이나 재즈바에서 저 Route 66 간판은 소 품으로 봐서 익숙할 정도. #영문 위키피디아의 노래 설명 이러한 문화적 이유로 인해 2000년대 들어 국도 전 구간이 복원되었다. 복원 되었다는 말에서 보듯 원래는 44번 고속도로(인터스테이트 하이웨이)가 개통 된 후 구간구간이 뚝뚝 끊기고 전체적으로 교통량이 줄어 결국 1985년 6월 26일부로 국도지정 해제되었었다. 게다가 이 44번 인터스테이트 하이웨이는 미국 최초의 고속도로이기도 하다. 그러나 한 시대의 문화적 아이콘이 사람 들에게 주는 정서적 영감은 대단한 것이어서, 2003년에는 전 구간 복원이 완 료되어 주로 관광객이나 옛 추억을 떠올리려는 미국인들이 여전히 이 도로를 이용하고 있다. 이런 사정을 담은 영상물이 바로 디즈니의 카(애니메이션)."
  }
];

const FeedItems = () => {
  const [page, setPage] = useState(1);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleFavorite = (e, target) => {
    e.preventDefault();
    // TODO: axios로 서버에 전송. 나중에 즐겨찾기 페이지 볼 때는 서버에서 가져와서 확인
  };

  const toggleLike = (e, target, doesLike) => {
    e.preventDefault();
    // TODO: axios 서버로 보내고, 이 화면에서 갱신하는 것은 단순 js/css 노가다로 전환
  };

  const items = () => {
    // const itemsToShow = state.get("items").slice((page - 1) * 30, page * 30); // ex. (0, 30), (30, 60), (60, 90), ...
    // TODO: itemsToShow 로 대체
    return dummyItems.map((item, index) => (
      // TODO: 렌더링 때부터 (state를 따로 가지고 있길 바라는) 좋아요 데이터와 매칭시켜, like 또는 dislike 표시
      <FlexChild style={{ backgroundImage: `url(${item.imageUrl})` }} key={items.title + String(index)}>
        <ToggleFavoriteButton onClick={e => toggleFavorite(e, item.number)} /> {/* TODO: 어떤 값으로 즐겨찾기를 보관하는지 확인 */}
        <ToggleLikeButton onClick={e => toggleLike(e, item.number, true)} /> {/* TODO: 어떤 값으로 즐겨찾기를 보관하는지 확인 */}
        <ToggleDislikeButton onClick={e => toggleLike(e, item.number, false)} /> {/* TODO: 어떤 값으로 즐겨찾기를 보관하는지 확인 */}
      </FlexChild>
    ));
  };

  return (
    <>
      <div>현재 선택된 지역: {state.get("region")}</div>
      <div>현재 선택된 퍼소널리티 : {state.get("personality")}</div>
      <FlexParent>{items()}</FlexParent>
      <button onClick={_ => (page > 1 ? setPage(prev => prev - 1) : null)}>Prev page</button>
      <button onClick={_ => setPage(prev => prev + 1)}>Next page</button>
    </>
  );
};

const FlexParent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const FlexChild = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px red solid;
  text-align: center;
  background-size: cover;
`;
const ToggleFavoriteButton = styled.div`
  position:absolute;
  height:20px;
  width:20px;
  border:1px red solid;
  background-color:yellow
  top:10px;
  left:10px;
`;
const ToggleLikeButton = styled.div`
  position:absolute;
  height:20px;
  width:20px;
  border:1px red solid;
  background-color:blue
  bottom:10px;
  left:10px
`;
const ToggleDislikeButton = styled.div`
  position:absolute;
  height:20px;
  width:20px;
  border:1px red solid;
  background-color:red
  bottom:10px;
  right:10px
`;

export default FeedItems;
