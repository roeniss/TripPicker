import React from "react";

const BookmarkIcon = ({ handler, clicked }) => {
  const dynamicClassName = () => {
    if (clicked) return "fas";
    else return "far";
  };
  return (
    <span onClick={handler} style={{ fontSize: 3 + "em", color: "rgb(246, 255, 120)" }}>
      <i className={`${dynamicClassName()} fa-bookmark`} style={{ paddingTop: 10 + "px" }}></i>
    </span>
  );
};

export default BookmarkIcon;
