import React, { useState } from "react";
import useInputState from "../hooks/useInputState";
import RegionSelectMap from "../components/RegionSelectMap";
import RegionSelectForm from "../components/RegionSelectForm";

const SelectRegion = () => {
  const [option, setOption] = useState(0);

  const render = () => {
    switch (option) {
      case 0:
        return (
          <div>
            <button onClick={_ => setOption(1)}>직접입력</button>
            <button onClick={_ => setOption(2)}>추천받기</button>
          </div>
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
