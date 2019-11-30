import React, { useContext } from "react";
import { DispatchContext } from "../App";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";

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
    <div>
      <h1>회원가입화면 (Register) </h1>

      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" {...emailBind} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" {...passwordBind} />
        </div>
        <div>
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <input type="password" {...passwordConfirmBind} />
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" {...nameBind} />
        </div>
        {/* <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div> */}
        <button>회원가입</button>
      </form>
      <button onClick={_ => dispatch({ type: "GOTO_LOGIN" })}>로그인 화면으로 돌아가기</button>
    </div>
  );
};

export default Register;
