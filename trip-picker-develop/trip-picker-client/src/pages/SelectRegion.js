import React, { useState } from "react";
import RegionSelectMap from "../components/RegionSelectMap";
import RegionSelectForm from "../components/RegionSelectForm";
import styled from "styled-components";

const SelectRegion = () => {
  const [option, setOption] = useState(0);

  const render = () => {
    switch (option) {
      case 0:
        return (
          <SelectRegionButton>
            <button onClick={_ => setOption(1)}>직접입력</button>
            <button onClick={_ => setOption(2)}>추천받기</button>
          </SelectRegionButton>
        );
      case 1:
        return <RegionSelectMap />;
      case 2:
        return <RegionSelectForm />;
      default:
        return <></>;
    }
  };
  return <div>{render()}</div>;
};

export default SelectRegion;

const SelectRegionButton = styled.div`
  padding-top: 100px;

  > button {
    width: 200px;
    height: 300px;
    font-size: 30px;
    border-radius: 10px;
    cursor: pointer;
  }
  > button:nth-of-type(1) {
    margin-right: 40px;
    background-color: pink;
  }
  > button:nth-of-type(2) {
    background-color: skyblue;
  }
`;
