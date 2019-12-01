import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { axios } from "../customAxios";
import Axios from "axios";
import BookmarkIcon from "../components/BookmarkIcon";
import LikeIcon from "../components/LikeIcon";
import { StateContext, DispatchContext } from "../App";
const detailModalElem = document.getElementById("detail-modal");

const Detail = ({ userIdx, closeModal }) => {
  const [item, setItem] = useState(false);

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    // Axios.get("?").then(res => setItem(res));

    // Below: Test
    setItem({ aa: 123 });
  }, []);

  const gotoRelatedItem = target => Axios.get("?").then(res => setItem(res));

  const getHomepageLinkTag = (link, text = "홈페이지 링크") => <a href={link}>{text}</a>;

  const getImages = imageLinks => imageLinks.map(link => <div key={link} style={{ backgroundImage: `url(${link})` }}></div>);

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx } = item;
    const data = { userIdx: state.get("id"), contentIdx };
    if (e.target.classList.contains("fas")) {
      axios("REMOVE_FAVORITE", dispatch, data);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else {
      axios("ADD_FAVORITE", dispatch, data);
      e.target.classList.add("fas");
      e.target.classList.remove("far");
    }
  };

  const toggleLike = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode };
    if (e.target.classList.contains("fas")) {
      axios("REMOVE_LIKE", dispatch, data);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else {
      axios("ADD_LIKE", dispatch, data);
      e.target.classList.add("fas");
      e.target.classList.remove("far");
    }
  };

  const getDefailInfo = () => {
    if (!item)
      return (
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      );
    else
      return (
        <DetailModalContainer>
          <BookmarkIcon id="detailBookmarkIcon" handler={e => toggleFavorite(e, item)} clicked={item.bookmarked ? true : false} />
          <LikeIcon id="detailLikeIcon" handler={e => toggleLike(e, item)} clicked={item.liked ? true : false} />

          <h1>{item.title || "타이틀 들어가는 자리"}</h1>
          <hr />
          <div>주소: 주소정보주소정보주소정보주소정보주소정보</div>
          <div>개요:</div>
          <div>
            {item.short_description ||
              "개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리 개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리 개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리ㅍ 개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리개요 들어가는 자리"}
          </div>
          <ImageContainer>
            {getImages([
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg",
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg",
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg",
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg",
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg",
              "http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg"
            ])}
            <div style={{ backgroundImage: 'url("http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg")' }}></div>
            <div style={{ backgroundImage: 'url("http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg")' }}></div>{" "}
            <div style={{ backgroundImage: 'url("http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg")' }}></div>
            <div style={{ backgroundImage: 'url("http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg")' }}></div>
            <div style={{ backgroundImage: 'url("http://tong.visitkorea.or.kr/cms/resource/58/980658_image2_1.jpg")' }}></div>
          </ImageContainer>
          <div id="homepage-info">{getHomepageLinkTag()}</div>
          <div>연관 여행지:</div>
          <div id="ButtonContainer">
            <button id="relatedItem1" onClick={e => gotoRelatedItem("item1")}>
              연관 여행지 1의 타이틀{" "}
            </button>
            <button id="relatedItem2" onClick={e => gotoRelatedItem("item2")}>
              연관 여행지 2의 타이틀{" "}
            </button>
          </div>
        </DetailModalContainer>
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
  width: 100%;
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

const DetailModalContainer = styled.div`
  position: relative;
  height: 100%;
  line-break: auto;
  overflow-x: hidden;
  padding: 20px;
  > div {
    margin-bottom: 20px;
  }
  div#ButtonContainer {
    text-align: center;
    button {
      width: 300px;
      margin: 0 auto;
      height: 30px;
      border-radius: 10px;
      cursor: pointer;
    }
    #relatedItem1 {
      margin-bottom: 10px;
    }
  }
  #homepage-info {
    text-align: center;
  }
  #detailBookmarkIcon,
  #detailLikeIcon {
    position: absolute;
    top: 20px;
  }
  #detailBookmarkIcon {
    right: 85px;
  }
  #detailLikeIcon {
    right: 20px;
  }
`;
const ImageContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  div {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px;
    text-align: center;
    background-size: cover;
    border-radius: 10px;
    display: inline-block;
  }
`;
export default Detail;
