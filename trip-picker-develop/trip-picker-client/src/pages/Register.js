import React, { useContext } from "react";
import { DispatchContext } from "../App";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";
import styled from "styled-components";

const Register = () => {
  const [email, emailBind] = useInputState("");
  const [password, passwordBind] = useInputState("");
  const [passwordConfirm, passwordConfirmBind] = useInputState("");
  const [name, nameBind] = useInputState("");

  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!email || !password || !passwordConfirm || !name) return alert("입력하지 않은 항목이 있습니다");
    if (password !== passwordConfirm) return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
    axios("REGISTER", dispatch, { email, password, name });
  };

  return (
    <>
      <Blank />
      <RegisterForm>
        <h1>회원가입</h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email">이메일</label> <br />
            <input type="text" {...emailBind} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label> <br />
            <input type="password" {...passwordBind} />
          </div>
          <div>
            <label htmlFor="passwordConfirm">비밀번호(다시)</label> <br />
            <input type="password" {...passwordConfirmBind} />
          </div>
          <div>
            <label htmlFor="name">이름</label> <br />
            <input type="text" {...nameBind} />
          </div>
          <button id="register-btn">회원가입</button>
        </form>
        <button id="goto-login-btn" onClick={_ => dispatch({ type: "GOTO_LOGIN" })}>
          로그인 화면으로 돌아가기
        </button>
      </RegisterForm>
    </>
  );
};

export default Register;

const RegisterForm = styled.div`
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
      cursor:pointer
    }

  #register-btn {
    background-color: pink;
  }
  #goto-login-btn {
    background-color: gray;
  }
`;

const Blank = styled.div`
  height: 100px;
`;
