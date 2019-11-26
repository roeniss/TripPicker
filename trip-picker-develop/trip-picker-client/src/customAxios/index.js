import Axios from "axios";
import { regionInfo } from "../helper/regionInfo";

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
      return rootUrl + "???";
    case "UPDATE_REGION":
      return rootUrl + "???";
    case "RECOMMEND_REGION":
      return "???";
    case "GET_PERSONALITY":
      return rootUrl + "/users/personalities/";
    case "UPDATE_PERSONALITY":
      return rootUrl + "/users/personalities/";
    default:
      return rootUrl;
  }
};

const login = async (dispatch, data) => {
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
  // TODO: 현재 해당 url이 작동하지 않음 + 원하는 결과(지역값)가 아님.
  // const response = await Axios.get(getUrl("GET_REGION" + data.id));
  // if (response.status === 200) dispatch({ type: "UPDATE_REGION", payload: data.region });
  // Below: TEST
  // dispatch({ type: "UPDATE_REGION", payload: "서울 마포구" });
};
const updateRegion = async (dispatch, data) => {
  // TODO: 보내는 URL 체크, data 형태 체크
  // await Axios.post(getUrl("UPDATE_REGION"), data);
  dispatch({ type: "UPDATE_REGION", payload: data.region });
};

const recommenDRegion = async (dispatch, data) => {
  // TODO: 미성님 서버에 데이터 보내서 "지역코드" 리턴받기
  // const response = Axios.post(getUrl("RECOMMEND_REGION"), data);
  // const regionCode = response.code;
  // const fullRegion = regionInfo[regionCode]["fullRegion"];
  // dispatch({ type: "UPDATE_REGION", payload: fullRegion });
  // Below: TEST
  dispatch({ type: "UPDATE_REGION", payload: "서울 마포구" });
};

const getPersonality = async (dispatch, data) => {
  const response = await Axios.get(getUrl("GET_PERSONALITY") + data.id);
  if (response.status === 200) dispatch({ type: "UPDATE_PERSONALITY", payload: response.data.data.personalityType });

  // Below: TEST
  // dispatch({ type: "UPDATE_PERSONALITY", payload: "EXTREME_PERSONAL" });
};

const updatePersonality = async (dispatch, data) => {
  await Axios.post(getUrl("UPDATE_PERSONALITY"), data);
  // 실패해도, 일단 로컬에서는 정상적으로 보여주기로 함
  dispatch({ type: "UPDATE_PERSONALITY", payload: data.personalityType });
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
      return recommenDRegion(dispatch, data);
    case "GET_PERSONALITY":
      return getPersonality(dispatch, data);
    case "UPDATE_PERSONALITY":
      return updatePersonality(dispatch, data);
    default:
      return;
  }
};

export { axios };
