import { useReducer } from "react";
import { Map } from "immutable";

// global state container (alternatives to Redux)

const initialState = Map({
  loading: false,
  id: 12, // 임시. 원래는 undefined
  error: "",
  page: "login",
  region: ""
});

const reducer = (state, action) => {
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

    case "GOTO_REGISTER":
      return state.set("page", "register");
    case "GOTO_LOGIN":
      return state.set("page", "login");
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
