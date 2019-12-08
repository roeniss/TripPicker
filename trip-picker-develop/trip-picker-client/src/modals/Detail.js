import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import BookmarkIcon from "../components/BookmarkIcon";
import LikeIcon from "../components/LikeIcon";
import { StateContext, DispatchContext } from "../App";
import { axios } from "../customAxios";
import Axios from "axios";

const detailModalElem = document.getElementById("detail-modal");

const Detail = ({ contentIdx, userIdx, closeModal }) => {
  const [item, setItem] = useState(false);

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const fetchFailhandling = () =>
    // error handling
    setTimeout(() => {
      if (Object.keys(state.get("detail")).length === 0) {
        dispatch({ type: "CUSTOM_ERROR", payload: "현재 서버 접속이 원활하지 않습니다. 잠시 후 다시 시도해주세요." });
      }
    }, 10000);

  const getDetailContent = (userIdx, contentIdx) => {
    console.log(userIdx, contentIdx);

    const params = `userIdx=${userIdx}&contentIdx=${contentIdx}`;
    Axios.get("http://13.125.191.60:8080/items/detail?isSelected=true&" + params).then(({ data }) => {
      setItem(data.data);
    });
    // fetchFailhandling();
  };

  useEffect(() => {
    getDetailContent(userIdx, contentIdx);

    const preventWheel = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("wheel", preventWheel);
    // Below: Test
    // setItem({ aa: 123 });
    return () => {
      document.removeEventListener("wheel", preventWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotoRelatedItem = (e, targetContentIdx) => {
    setItem(false);
    e.preventDefault();
    e.stopPropagation();
    getDetailContent(userIdx, targetContentIdx);
  };

  const getHomepageLinkTag = (link, text = "홈페이지 바로가기") => (
    <a href={link || "http://54.180.29.122/"} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  const getImages = imageLinks => imageLinks.map(link => <div key={link} style={{ backgroundImage: `url(${link})` }}></div>);

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode, title, imageUrl } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode, title, imageUrl };
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
    const { contentIdx, categoryCode, subCategoryCode, title, imageUrl } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode, title, imageUrl };
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

  const getDetailInfo = () => {
    if (!item)
      return (
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      );
    else {
      const { address, overview, subImageUrlList, homepageUrl, relatedItemList } = item.itemExtraRes;
      const { bookmarked, liked, subCategoryCode, title, contentIdx, categoryCode, imageUrl } = item.itemRes;
      const customData = { contentIdx, categoryCode, subCategoryCode, title, imageUrl }; // for update like or favorite status

      return (
        <DetailModalContainer>
          <BookmarkIcon id="detailBookmarkIcon" handler={e => toggleFavorite(e, customData)} clicked={bookmarked ? true : false} />
          <LikeIcon id="detailLikeIcon" handler={e => toggleLike(e, customData)} clicked={liked ? true : false} />

          <CutstomH1>{title || "타이틀 들어가는 자리"}</CutstomH1>
          <hr />
          <div>{address || "주소를 확인할 수 없습니다."}</div>
          <br />
          <br />
          <CustomPre>{<div dangerouslySetInnerHTML={{ __html: overview }} /> || "개요를 확인할 수 없습니다"}</CustomPre>
          <br />
          <br />
          <ImageContainer>{getImages(subImageUrlList)}</ImageContainer>
          <div id="homepage-info">{getHomepageLinkTag(homepageUrl)}</div>
          <div>연관 여행지:</div>
          <div id="ButtonContainer">
            <button id="relatedItem1" onClick={e => gotoRelatedItem(e, relatedItemList[0].contentIdx)}>
              {relatedItemList[0].title}
            </button>
            <button id="relatedItem2" onClick={e => gotoRelatedItem(e, relatedItemList[1].contentIdx)}>
              {relatedItemList[1].title}
            </button>
          </div>
        </DetailModalContainer>
      );
    }
  };

  console.log(item);

  return ReactDOM.createPortal(
    <DetailModal id="detail-modal-container" onClick={e => closeModal(e)}>
      <div onClick={e => e.stopPropagation()}>{getDetailInfo()}</div>
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
    overflow-x: hidden;
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
    top: 10px;
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

const CutstomH1 = styled.h1`
  font-size: 22px;
  width: 60%;
`;
const CustomPre = styled.pre`
  white-space: normal;
`;
export default Detail;
