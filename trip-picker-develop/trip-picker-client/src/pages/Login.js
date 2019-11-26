import React, { useContext } from "react";
import { DispatchContext } from "../App";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";

const Login = () => {
  const [email, emailBind] = useInputState("lipilman@naver.com"); // TODO: 지워
  const [password, passwordBind] = useInputState("123456"); // TODO: 지워

  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    axios("LOGIN", dispatch, { email, password });
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
      <button onClick={_ => dispatch({ type: "GOTO_REGISTER" })}>회원가입 화면으로 가기</button>
    </div>
  );
};

export default Login;
