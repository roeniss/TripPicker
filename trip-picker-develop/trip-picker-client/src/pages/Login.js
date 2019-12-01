import React, { useContext } from "react";
import { DispatchContext } from "../App";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";
import styled from "styled-components";

const Login = () => {
  const [email, emailBind] = useInputState("abcd@mail.com"); // TODO: 지워
  const [password, passwordBind] = useInputState("1234"); // TODO: 지워

  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    axios("LOGIN", dispatch, { email, password });
  };

  return (
    <>
      <Blank />
      <LoginForm>
        <h1>로그인</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email">이메일</label>
            <br />
            <input type="text" {...emailBind} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <br />
            <input type="password" {...passwordBind} />
          </div>
          <button id="login-btn">로그인</button>
        </form>
        <div>
          <button id="goto-register-btn" onClick={_ => dispatch({ type: "GOTO_REGISTER" })}>
            회원가입 화면으로 가기
          </button>
        </div>
      </LoginForm>
    </>
  );
};

export default Login;

const LoginForm = styled.div`
  margin-top: 100px;
  padding-top:10px;
  margin: 30px 0
  margin: 0 auto;
  width: 400px;
  background-color: skyblue;
  border-radius: 10px; 

  div {
    padding-bottom: 20px;
    text-align: center;
  }
  button {
    margin-bottom:10px
    border-radius: 5px;
    width: 150px;
    padding:10px 0 ;
  }

  button{
    cursor:pointer;
  }

  #login-btn {
    background-color: pink;
  }
  #goto-register-btn {
    background-color: gray;
  }
`;
const Blank = styled.div`
  height: 100px;
`;
