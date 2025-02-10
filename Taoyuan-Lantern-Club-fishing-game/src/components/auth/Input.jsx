import { useState } from "react";
import InputBg from "../../assets/main/InputBg.png";

const Input = ({ placeholder, onChange, maxLength = 12 }) => {
  const [inputState, setInputState] = useState({
    value: "",
    isComposing: false,
  });

  function handleInput(value) {
    let totalLength = 0;
    let validValue = "";
    for (let char of value) {
      const charLength = /[\u4e00-\u9fa5]/.test(char) ? 2 : 1;
      if (totalLength + charLength > maxLength) break;
      totalLength += charLength;
      validValue += char;
    }
    setInputState((prev) => ({ ...prev, value: validValue }));
    onChange && onChange(validValue);
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center w-50  h4"
      style={{
        backgroundImage: `url(${InputBg})`,
        height: "90px",
        borderRadius: 20,
      }}
    >
      <input
        type="text"
        className=" text-center border-0 m-0 darkText"
        placeholder={placeholder}
        style={{
          width: "90%",
          backgroundColor: "transparent",
        }}
        value={inputState.value}
        onChange={(e) => {
          if (!inputState.isComposing) {
            handleInput(e.target.value);
          } else {
            setInputState((prev) => ({ ...prev, value: e.target.value }));
          }
        }}
        onCompositionStart={() =>
          setInputState((prev) => ({ ...prev, isComposing: true }))
        }
        onCompositionEnd={(e) => {
          setInputState((prev) => ({ ...prev, isComposing: false }));
          handleInput(e.target.value);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const pasteData = e.clipboardData?.getData("text");
          if (pasteData) {
            handleInput(pasteData);
          }
        }}
      />
    </div>
  );
};
export default Input;
