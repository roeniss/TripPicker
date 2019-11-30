import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const detailModalElem = document.getElementById("detail-modal");

const Detail = ({ target, closeModal }) => {
  return ReactDOM.createPortal(
    <DetailModal id="detail-modal-container" onClick={e => closeModal(e)}>
      <div onClick={e => e.stopPropagation()}>{target.number}</div>
    </DetailModal>,
    detailModalElem
  );
};

export default Detail;

const DetailModal = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(101, 101, 101, 0.65);
  top: 0;
  left: 0;
  div {
    position: absolute;
    width: 500px;
    height: 700px;
    border: 1px red solid;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }
`;
