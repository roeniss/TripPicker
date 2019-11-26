import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalElem = document.getElementById("modal");
const RefreshButton = () =>
  ReactDOM.createPortal(
    <Modal id="refresh-modal">
      {/* TODO: 버튼 클릭하면 서버에서 다시 정보 가져오기 */}
      <button>refresh</button>
    </Modal>,
    modalElem
  );

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

export default RefreshButton;
