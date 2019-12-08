import React from "react";

// 13.124.55.214

import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

import useGlobalReducer from "./hooks/useGlobalReducer";

import styled from "styled-components";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useGlobalReducer();

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Header>
          <h1>Trip-Picker</h1>
          <h5>"여행지 선정부터 관광지 추천까지"</h5>
        </Header>
        <AppContainer className="App">
          {state.get("error") ? <Error /> : null}
          {state.get("id") ? <Home /> : state.get("page") === "register" ? <Register /> : <Login />}
          {/* Below: TEST */}
          {/* <Login /> */}
        </AppContainer>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  width: 100%;
  h5 {
    text-decoration: underline;
  }
  padding-bottom: 10px;
`;

const Header = styled.div`
  // position: fixed;
  height: 100px;
  display: block;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid gray;
`;
