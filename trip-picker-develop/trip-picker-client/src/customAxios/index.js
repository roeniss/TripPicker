import Axios from "axios";

const getUrl = subject => {
  const rootUrl = "https://jsonplaceholder.typicode.com";
  switch (subject) {
    case "LOGIN":
      return rootUrl + "/user/";
    case "REGISTER":
      return rootUrl + "/users/signup/";
    case "IS_DUPLICATED":
      return rootUrl + "/users/signup/validateEmail?email=";
    default:
      return rootUrl;
  }
};

const login = (dispatch, data) => {
  dispatch({ type: "LOGIN_TRY" });
  // Axios.post(getUrl("LOGIN"), data)
  //   .then(({ data }) => dispatch({ type: "LOGIN_SUCCESS", payload: data.id }))
  //   .catch(error => dispatch({ type: "LOGIN_FAIL" }));

  // Below: TEST
  dispatch({ type: "LOGIN_SUCCESS", payload: 5 });
};

const register = async (dispatch, data) => {
  dispatch({ type: "LOGIN_TRY" });
  // const isDuplicated = await Axios.get(getUrl("IS_DUPLICATED") + data.email).then(({ data }) => {
  //   if (data.status === 204) {
  //     dispatch({ type: "REGISTER_FAIL", payload: "중복된 이메일입니다" });
  //     return true;
  //   }
  //   else return false;
  // }).catch(_=>dispatch({ type: "REGISTER_FAIL", payload: "회원가입에 실패했습니다" });
  //
  // if (isDuplicated) return;

  // Axios.post(getUrl("REGISTER"), data).then(({ data }) => {
  //   if (data.status === 201) return dispatch({ type: "REGISTER_SUCCESS", payload: data.id });
  //   else throw Error("")
  // }).catch(_=>dispatch({ type: "REGISTER_FAIL", payload: "회원가입에 실패했습니다" });

  // Below: TEST
  // dispatch({ type: "REGISTER_FAIL", payload: "중복된 이메일입니다" });
  dispatch({ type: "REGISTER_SUCCESS" });
};

const axios = (action, dispatch, data) => {
  switch (action) {
    case "login":
      return login(dispatch, data);
    case "register":
      return register(dispatch, data);
    default:
      return;
  }
};

export { axios };
