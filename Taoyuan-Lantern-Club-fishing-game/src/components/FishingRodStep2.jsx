import React from "react";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import HitTitle from "./HitTitle";
import { useSelector } from "react-redux";
const FishingRodStep2 = ({
  reelBar = 0,
  setReelPoleBar,
  onNoReel,
  reelBarSelf,
}) => {
  const { language } = useSelector((state) => state.connState);
  const { 加油快上鉤了 } = language;

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ProgressBar now={reelBar} />
      </div>
      <HitTitle
        title={加油快上鉤了}
        styles={{
          marginTop: 20,
          visibility: reelBarSelf ? "" : "hidden",
        }}
      />
      <Footer
        lang={language}
        onFishing={setReelPoleBar}
        reelProgress={reelBar}
        onNoReel={onNoReel}
      />
    </>
  );
};

export default FishingRodStep2;
