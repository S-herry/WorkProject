import React, { useEffect, useState, useContext } from "react";
import { UnityContext } from "../content/GetFishUnity";
import { useSelector } from "react-redux";
import FishingRodStep1, { vibrationMode } from "../components/FishingRodStep1";
import FishingRodStep2 from "../components/FishingRodStep2";
const CatchFish = ({ onChangePage }) => {
  const { nation } = useSelector((state) => state.connState);
  const [reelBar, setReelPoleBar] = useState(0);

  const {
    UnityCallMessage,
    handleFishingRodReelSpinStop,
    UnityCallResult_CanvasMessage,
    handleFetchData,
    SwingTheRodStep,
  } = useContext(UnityContext);

  useEffect(() => {
    if (reelBar >= 100) {
      handleFishingRodReelSpinStop();
      UnityCallResult_CanvasMessage("ChangeSuccessText", nation);
      UnityCallMessage("SetRodGetFish");
      handleFetchData("捲線", {
        finished_at: formattedDate(),
      });
      setReelPoleBar(0);
      onChangePage();
    }
  }, [reelBar]);

  function onNoReel() {
    setReelPoleBar((prev) => Math.max(prev - 5, 0));
  }
  function onReel() {
    setReelPoleBar((prev) => prev + 5);
    vibrationMode();
  }

  return (
    <>
      {SwingTheRodStep == 1 && <FishingRodStep1 />}
      {SwingTheRodStep == 2 && (
        <FishingRodStep2
          onNoReel={onNoReel}
          setReelPoleBar={onReel}
          reelBarSelf={reelBar >= 50}
          reelBar={reelBar}
        />
      )}
    </>
  );
};

export default CatchFish;

const formattedDate = () => {
  const nowData = new Date();

  return `${nowData.getFullYear()}/${String(nowData.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(nowData.getDate()).padStart(2, "0")} ${String(
    nowData.getHours()
  ).padStart(2, "0")}:${String(nowData.getMinutes()).padStart(2, "0")}:${String(
    nowData.getSeconds()
  ).padStart(2, "0")}`;
};
