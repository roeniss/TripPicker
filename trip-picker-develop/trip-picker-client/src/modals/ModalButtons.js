import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../App";
import { axios } from "../customAxios";

const modalElem = document.getElementById("modal");
const ModalButtons = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const refresh = e => {
    e.preventDefault();
    const data = { userIdx: state.get("id") };
    axios("GET_FEED", dispatch, data);
  };
  const toggleShowFavorites = () => {
    const payload = { feed: state.get("feed"), favorites: state.get("favorites"), showFavorites: state.get("showFavorites") };
    dispatch({ type: "TOGGLE_SHOW_FAVORITES", payload: payload });
  };
  return ReactDOM.createPortal(
    <Modal id="refresh-modal">
      <i className="fas fa-sync-alt fa-3x" onClick={e => refresh(e)}></i>
      <i className="fas fa-map-marker-alt fa-3x" onClick={_ => dispatch({ type: "CLEAR_REGION" })}></i>
      <i className="fas  fa-meh-rolling-eyes fa-3x" onClick={_ => dispatch({ type: "CLEAR_PERSONALITY" })}></i>
      <i className="fas  fa-bookmark fa-3x" onClick={_ => toggleShowFavorites()}></i>
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
  i {
    cursor: pointer;
    padding-left: 10px;
  }
`;

export default ModalButtons;
