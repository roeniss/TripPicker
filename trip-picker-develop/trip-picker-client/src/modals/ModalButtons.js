import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../App";
import { axios } from "../customAxios";

const modalElem = document.getElementById("modal");
const ModalButtons = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const refresh = () => {
    const data = { userIdx: state.get("id") };
    axios("GET_FEED", dispatch, data);
  };
  const toggleShowFavorites = () => {
    const payload = { feed: state.get("feed"), favorites: state.get("favorites"), showFavorites: state.get("showFavorites") };
    dispatch({ type: "TOGGLE_SHOW_FAVORITES", payload: payload });
  };
  return ReactDOM.createPortal(
    <Modal id="refresh-modal">
      <button onClick={() => refresh()}>refresh</button>
      <button onClick={_ => dispatch({ type: "CLEAR_REGION" })}>reset region</button>
      <button onClick={_ => dispatch({ type: "CLEAR_PERSONALITY" })}>reset personality</button>
      <button onClick={_ => toggleShowFavorites()}>toggle favorites</button>
    </Modal>,
    modalElem
  );
};
const Modal = styled.div`
  display: inline-block;
  position: absolute;
  top: 40px;
  right: 40px;
  button {
    // height: 40px;
    // width: 100px;
  }
`;

export default ModalButtons;
