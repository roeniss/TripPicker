import React from "react";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

import useGlobalReducer from "./hooks/useGlobalReducer";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useGlobalReducer();

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="App">
          {state.get("error") ? <Error /> : null}
          {state.get("id") ? <Home /> : state.get("page") === "register" ? <Register /> : <Login />}
          {/* Below: TEST */}
          {/* <Login /> */}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
