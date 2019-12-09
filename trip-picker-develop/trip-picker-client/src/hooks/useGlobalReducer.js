import { useReducer } from "react";
import { Map } from "immutable";

const initialState = Map({
  loading: false,
  id: undefined, // 임시. 원래는 undefined
  error: "",
  page: "login",
  region: undefined, // 임시. 원래는 undefined
  personality: undefined,
  categoryRanking: [],
  feed: [],
  favorites: null, // null: 로딩중, []: 즐겨찾기 항목 없음, [...]: list
  showFavorites: false,
  detail: {}
});

const reducer = (state, action) => {
  // console.log(state, action, action.type);
  console.log("reduce: ", action.type);
  switch (action.type) {
    case "LOGIN_TRY":
      return state
        .set("loading", true)
        .set("id", undefined)
        .set("error", "로딩중...");
    case "LOGIN_SUCCESS":
      return state
        .set("loading", false)
        .set("id", action.payload)
        .set("error", undefined);
    case "LOGIN_FAIL":
      return state.set("loading", false).set("error", "로그인에 실패했습니다.");
    case "REGISTER_SUCCESS":
      return state
        .set("loading", false)
        .set("page", "login")
        .set("error", "회원가입에 성공했습니다. 로그인 해 주세요.");
    case "REGISTER_FAIL":
      return state.set("loading", false).set("error", action.payload);
    case "UPDATE_REGION":
      return state.set("region", action.payload);
    case "UPDATE_PERSONALITY":
      return state.set("personality", action.payload);
    case "UPDATE_FEED":
      const { itemResList, popularCategoryList } = action.payload.feed;
      return state.set("feed", itemResList).set("categoryRanking", popularCategoryList);
    case "UPDATE_FAVORITES":
      return state.set("favorites", action.payload);

    case "GET_FAVORITES":
      // 즐겨찾기 모드 on / off 무관하게 새 정보 받아오는 걸로
      return state.set("favorites", action.payload).set("showFavorites", !action.payload.showFavorites);
    case "TOGGLE_SHOW_FAVORITES":
      return state.set("showFavorites", !state.get("showFavorites"));

    case "UPDATE_DETAIL":
      return state.set("detail", action.payload);
    case "FAIL_UPDATE_DETAIL":
      return state.set("detail", {});

    case "CLEAR_REGION":
      return state.set("region", undefined);
    case "CLEAR_PERSONALITY":
      return state.set("personality", undefined);

    case "GOTO_REGISTER":
      return state.set("page", "register");
    case "GOTO_LOGIN":
      return state.set("page", "login");

    case "CUSTOM_ERROR":
      return state.set("error", action.payload);
    case "CLAER_ERROR":
      return state.set("error", undefined);
    default:
      return state;
  }
};

const useGlobalReducer = () => {
  return useReducer(reducer, initialState);
};

export default useGlobalReducer;
