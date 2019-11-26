import React, { useContext } from "react";
import { DispatchContext } from "../App";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";

const Login = () => {
  const [email, emailBind] = useInputState("");
  const [password, passwordBind] = useInputState("");

  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    axios("login", dispatch, { email, password });
  };

  const onClickHandler = e => {
    e.preventDefault();
    dispatch({ type: "GOTO_REGISTER" });
  };

  return (
    <div>
      <h1>로그인 (Login) </h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="text" {...emailBind} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" {...passwordBind} />
        </div>
        <button>로그인</button>
      </form>
      <button onClick={onClickHandler}>회원가입 화면으로 가기</button>
    </div>
  );
};

export default Login;
