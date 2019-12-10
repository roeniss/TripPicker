import Axios from "axios";
import regionInfo from "../helper/regionInfo";

const getUrl = subject => {
  const rootUrl = "http://13.125.191.60:8080";
  switch (subject) {
    case "LOGIN":
      return rootUrl + "/users/signin";
    case "REGISTER":
      return rootUrl + "/users/signup/";
    case "IS_DUPLICATED":
      return rootUrl + "/users/check?email=";
    case "GET_REGION":
      return rootUrl + "/users/locations/";
    case "UPDATE_REGION":
      return rootUrl + "/users/locations";
    case "RECOMMEND_REGION":
      return "http://localhost:5000/predict";
    case "GET_PERSONALITY":
      return rootUrl + "/users/personalities/";
    case "UPDATE_PERSONALITY":
      return rootUrl + "/users/personalities/";
    case "GET_FEED":
      return rootUrl + "/items?isSelected=true&userIdx=";
    case "ADD_FAVORITE":
      return rootUrl + "/bookmarks";
    case "REMOVE_FAVORITE":
      return rootUrl + "/bookmarks/cancel";
    case "ADD_LIKE":
      return rootUrl + "/likes/";
    case "REMOVE_LIKE":
      return rootUrl + "/likes/cancel";
    case "GET_FAVORITES":
      return rootUrl + "/bookmarks/";
    case "GET_DETAIL":
      return rootUrl + "/items/detail?isSelected=true&";
    default:
      console.log("13948614848231090001"); // wrong URL call!
      return rootUrl;
  }
};

const login = async (dispatch, data) => {
  // 기능 체크 완료
  dispatch({ type: "LOGIN_TRY" });
  Axios.post(getUrl("LOGIN"), data)
    .then(({ data }) => {
      if (data.status === 200) dispatch({ type: "LOGIN_SUCCESS", payload: data.data.userIdx });
      else throw new Error("");
    })
    .catch(_ => dispatch({ type: "LOGIN_FAIL" }));

  // Below: TEST
  // dispatch({ type: "LOGIN_SUCCESS", payload: 5 });
};

const register = async (dispatch, data) => {
  // 기능 체크 완료
  dispatch({ type: "LOGIN_TRY" });
  const isDuplicated = await Axios.get(getUrl("IS_DUPLICATED") + data.email)
    .then(({ data }) => {
      if (data.status === 204) {
        dispatch({ type: "REGISTER_FAIL", payload: "중복된 이메일입니다" });
        return true;
      } else return false;
    })
    .catch(_ => {
      dispatch({ type: "REGISTER_FAIL", payload: "회원가입에 실패했습니다" });
      return true;
    });

  if (isDuplicated) return;

  Axios.post(getUrl("REGISTER"), data)
    .then(({ data }) => {
      if (data.status === 201) return dispatch({ type: "REGISTER_SUCCESS", payload: data.id });
      else throw Error("");
    })
    .catch(_ => dispatch({ type: "REGISTER_FAIL", payload: "회원가입에 실패했습니다" }));

  // Below: TEST
  // dispatch({ type: "REGISTER_FAIL", payload: "중복된 이메일입니다" });
  // dispatch({ type: "REGISTER_SUCCESS" });
};

const getRegion = async (dispatch, data) => {
  // 기능 체크 완료
  const response = await Axios.get(getUrl("GET_REGION") + data.id);
  if (response.data.status === 200) {
    dispatch({ type: "UPDATE_REGION", payload: response.data.data.region });
  }

  // Below: TEST
  // dispatch({ type: "UPDATE_REGION", payload: "서울 마포구" });
};

const updateRegion = async (dispatch, data) => {
  // 기능 체크 완료
  const { region, userIdx } = data;
  let areaCode, sggCode;
  Object.keys(regionInfo).forEach(key => {
    const { fullRegion, sidoCode, sigunguCode } = regionInfo[key];
    if (fullRegion === region) {
      areaCode = sidoCode;
      sggCode = sigunguCode;
    }
  });
  await Axios.post(getUrl("UPDATE_REGION"), { userIdx, region, areaCode, sggCode });
  dispatch({ type: "UPDATE_REGION", payload: region });
};

const recommendRegion = async (dispatch, data) => {
  // 기능 확인 완료
  const { fullData, userIdx } = data;
  let response;
  response = await Axios.post(getUrl("RECOMMEND_REGION"), fullData).catch(_ => (response = { data: { predictions: 939010 } }));
  const { predictions } = response.data;
  const fullRegion = regionInfo[predictions]["fullRegion"];
  updateRegion(dispatch, { region: fullRegion, userIdx });
  // Below: TEST
  // dispatch({ type: "UPDATE_REGION", payload: "서울 마포구" });
};

const getPersonality = async (dispatch, data) => {
  // 기능 체크 완료
  const response = await Axios.get(getUrl("GET_PERSONALITY") + data.id);
  if (response.data.status === 200) dispatch({ type: "UPDATE_PERSONALITY", payload: response.data.data.personalityType });

  // Below: TEST
  // dispatch({ type: "UPDATE_PERSONALITY", payload: "EXTREME_PERSONAL" });
};

const updatePersonality = async (dispatch, data) => {
  // 기능 체크 완료
  await Axios.post(getUrl("UPDATE_PERSONALITY"), data);
  dispatch({ type: "UPDATE_PERSONALITY", payload: data.personalityType });
};

const getFeed = async (dispatch, data) => {
  dispatch({ type: "UPDATE_FEED", payload: { feed: { itemResList: [], popularCategoryList: [] } } });
  // 기능 체크 완료
  // 1. 전체 (내 퍼소널리티에 맞는) 아이템들
  let feed, likes, favorites;
  let payload = { feed: feed || [], favorites: favorites || [], likes: likes || [] }; // 로딩 화면을 보여주기 위해
  let response = await Axios.get(getUrl("GET_FEED") + data.userIdx).catch(_ => []);
  if (response.data.status === 200) feed = response.data.data;
  // console.log("fetch feed:", feed);
  payload = { feed: feed || [] };
  dispatch({ type: "UPDATE_FEED", payload: payload });
  // Below: TEST
  // const payload = { feed: [], favorites: [], likes: [] };
  // dispatch({ type: "GET_FEED", payload: payload });
};

const addFavorite = async (dispatch, data) => {
  // 기능 체크 완료
  // 1. 서버에 업데이트 콜 보내고
  await Axios.post(getUrl("ADD_FAVORITE"), data);
  // 2. 디스패치 (안해도 될 것 같은데)
  // dispatch({ type: "UPDATE_FAVORITE", payload: data.favorites });
};

const removeFavorite = async (dispatch, data) => {
  // 기능 체크 완료
  await Axios.post(getUrl("REMOVE_FAVORITE"), data);
};

const addLike = async (dispatch, data) => {
  // 기능 체크 완료
  // 1. 서버에 업데이트 콜 보내고
  await Axios.post(getUrl("ADD_LIKE"), data);
  // 2. 디스패치 (안해도 될 것 같은데)
  // dispatch({ type: "UPDATE_LIKE", payload: data.Likes });
};

const removeLike = async (dispatch, data) => {
  // 기능 체크 완료
  await Axios.post(getUrl("REMOVE_LIKE"), data);
};

const getFavorites = async (dispatch, data) => {
  // 기능 체크 완료
  dispatch({ type: "UPDATE_FAVORITES", payload: null });
  const response = await Axios.get(getUrl("GET_FAVORITES") + data.userIdx);
  if (response.data.status === 200) {
    dispatch({ type: "UPDATE_FAVORITES", payload: response.data.data });
  } else {
    dispatch({ type: "UPDATE_FAVORITES", payload: [] });
  }
};

const getDetail = async (dispatch, data) => {
  // 기능 체크 완료
  const { userIdx, contentIdx } = data;
  const params = `userIdx=${userIdx}&contentIdx=${contentIdx}`;
  const response = await Axios.get(getUrl("GET_DETAIL") + params);
  if (response.data.status === 200) {
    dispatch({ type: "UPDATE_DETAIL", payload: response.data.data });
  } else {
    dispatch({ type: "FAIL_UPDATE_DETAIL" });
  }
};

const axios = (action, dispatch, data) => {
  switch (action) {
    case "LOGIN":
      return login(dispatch, data);
    case "REGISTER":
      return register(dispatch, data);
    case "GET_REGION":
      return getRegion(dispatch, data);
    case "UPDATE_REGION":
      return updateRegion(dispatch, data);
    case "RECOMMEND_REGION":
      return recommendRegion(dispatch, data);
    case "GET_PERSONALITY":
      return getPersonality(dispatch, data);
    case "UPDATE_PERSONALITY":
      return updatePersonality(dispatch, data);
    case "GET_FEED":
      return getFeed(dispatch, data);
    case "ADD_FAVORITE":
      return addFavorite(dispatch, data);
    case "REMOVE_FAVORITE":
      return removeFavorite(dispatch, data);
    case "ADD_LIKE":
      return addLike(dispatch, data);
    case "REMOVE_LIKE":
      return removeLike(dispatch, data);
    case "GET_FAVORITES":
      return getFavorites(dispatch, data);
    case "GET_DETAIL":
      return getDetail(dispatch, data);
    default:
      return;
  }
};

export { axios };
