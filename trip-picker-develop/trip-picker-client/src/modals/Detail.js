import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { axios } from "../customAxios";
import Axios from "axios";
const detailModalElem = document.getElementById("detail-modal");

const Detail = ({ target, closeModal }) => {
  const [item, setItem] = useState(false);

  useEffect(() => {
    // Axios.get("?").then(res => setItem(res));

    // Below: Test
    setItem({ title: "asd", content: "123", phone: "asd" });
  }, []);

  const getDefailInfo = () => {
    if (!item)
      return (
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      );
    else
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.content}</div>
          <div>{item.phone}</div>
        </div>
      );
  };

  console.log(item);

  return ReactDOM.createPortal(
    <DetailModal id="detail-modal-container" onClick={e => closeModal(e)}>
      <div onClick={e => e.stopPropagation()}>{getDefailInfo()}</div>
    </DetailModal>,
    detailModalElem
  );
};

const DetailModal = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(101, 101, 101, 0.65);
  top: 0;
  left: 0;
  > div {
    position: absolute;
    width: 500px;
    height: 700px;
    // border: 1px red solid;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }
`;

const Loading = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 100px;
`;

export default Detail;
