import { useState } from "react";

// form에 사용되는 value와 바인딩을 한번에 해결하는 custom hook

const useInputState = initialValue => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);
  const bind = {
    onChange,
    value
  };
  return [value, bind];
};

export default useInputState;
