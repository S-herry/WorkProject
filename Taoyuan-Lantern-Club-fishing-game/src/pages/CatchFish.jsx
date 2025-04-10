import React, { useEffect, useState, useContext, useRef } from "react";
import { UnityContext } from "../content/GetFishUnity";
import { useSelector } from "react-redux";
import FishingRodStep1, { vibrationMode } from "../components/FishingRodStep1";
import FishingRodStep2 from "../components/FishingRodStep2";
const CatchFish = ({
  onChangePage,
  startReeling,
  handleChangeStartReeling,
}) => {
  const { nation } = useSelector((state) => state.connState);
  const [reelBar, setReelPoleBar] = useState(0);
  const start_at = useRef({
    formatted: null,
    timestamp: null,
  });

  const {
    UnityCallMessage,
    handleFishingRodReelSpinStop,
    UnityCallResult_CanvasMessage,
    handleFetchData,
    SwingTheRodStep,
    handleSetNowAllData,
  } = useContext(UnityContext);

  useEffect(() => {
    if (reelBar >= 100) {
      handleFishingRodReelSpinStop();
      UnityCallResult_CanvasMessage("ChangeSuccessText", nation);
      UnityCallMessage("SetRodGetFish");
      handleSetNowAllData();
      const finished_at = formattedDate();
      handleFetchData("捲線", {
        finished_at: finished_at.formatted,
        start_at: start_at.current.formatted,
        cost_second: Math.ceil(
          (finished_at.timestamp - start_at.current.timestamp) / 1000
        ),
      });
      setReelPoleBar(0);
      onChangePage();
    }
  }, [reelBar]);

  useEffect(() => {
    if (startReeling) {
      start_at.current.formatted = formattedDate().formatted;
      start_at.current.timestamp = formattedDate().timestamp;
    }
  }, [startReeling]);

  function onNoReel() {
    setReelPoleBar((prev) => Math.max(prev - 5, 0));
  }
  function onReel() {
    setReelPoleBar((prev) => prev + 5);
    vibrationMode();
  }

  return (
    <>
      {SwingTheRodStep == 1 && (
        <FishingRodStep1 handleChangeStartReeling={handleChangeStartReeling} />
      )}
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

  return {
    formatted: `${nowData.getFullYear()}/${String(
      nowData.getMonth() + 1
    ).padStart(2, "0")}/${String(nowData.getDate()).padStart(2, "0")} ${String(
      nowData.getHours()
    ).padStart(2, "0")}:${String(nowData.getMinutes()).padStart(
      2,
      "0"
    )}:${String(nowData.getSeconds()).padStart(2, "0")}`,
    timestamp: nowData.getTime(),
  };
};
