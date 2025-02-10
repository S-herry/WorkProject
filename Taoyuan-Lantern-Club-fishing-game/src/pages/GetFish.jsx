import React, { useEffect, useState, useContext, useRef } from "react";
import Input from "../components/auth/Input";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { UnityContext, scaleToCenter } from "../content/GetFishUnity";

const GetFish = ({ onChangePage }) => {
  const [isInput, setIsInput] = useState(false);
  const [next, setNext] = useState("successGetFish");
  const [resetBtn, setResetBtn] = useState(false);
  const {
    UnityCallResult_CanvasMessage,
    ChangeShowButton,
    handleFetchData,
    ResetAll,
    handleSetNowAllData,
    showButton,
    nowAllData,
  } = useContext(UnityContext);
  const { language, nation } = useSelector((state) => state.connState);
  const { 沒填寫, 結束, 已完成, 下一步, 字數, 輸入暱稱, 重新開始 } = language;

  const handleClickButton = (e) => {
    e.stopPropagation();
    if (next == "successGetFish") {
      setNext("getContent");
      setTimeout(() => {
        setIsInput(true);
      }, 1200);

      UnityCallResult_CanvasMessage?.("Page2");
      ChangeShowButton(false);
    } else if (next == "getContent") {
      setNext("inputName");
      UnityCallResult_CanvasMessage?.("Page3");
      UnityCallResult_CanvasMessage?.(
        "ChangeNameText",
        nowAllData.name || 沒填寫
      );

      setIsInput(false);
      ChangeShowButton(false);
    } else if (next == "inputName") {
      handleFetchData("送出", nowAllData);
      setNext("lookScreen");
      ChangeShowButton(false);
    }
  };

  useEffect(() => {
    if (next == "lookScreen") {
      setTimeout(() => {
        setResetBtn(true);
      }, 3000);
    }
  }, [next]);

  return (
    <>
      <footer
        className="text-center  fixed-bottom d-flex flex-column justify-content-center align-items-center  "
        style={{
          bottom: "50px",
          zIndex: 100,
        }}
      >
        {isInput && (
          <>
            <p className="text-danger">{字數}</p>
            <Input
              maxLength={12}
              placeholder={輸入暱稱}
              onChange={(val) => {
                handleSetNowAllData({ name: val });
              }}
            />
          </>
        )}

        <Button show={showButton} onClick={handleClickButton}>
          {next == "inputName" ? 結束 : 下一步}
        </Button>

        {next == "lookScreen" && (
          <>
            <p className="p-0 m-0 text-danger h5 w-75 ">{已完成}</p>
            <Button
              size="50"
              show={resetBtn}
              onClick={() => {
                setResetBtn(false);
                ResetAll();
                onChangePage(1);
              }}
              style={{
                margin: nation != "CH" ? "-10px" : "0",
              }}
            >
              {重新開始}
            </Button>
          </>
        )}
      </footer>
    </>
  );
};

export default GetFish;
