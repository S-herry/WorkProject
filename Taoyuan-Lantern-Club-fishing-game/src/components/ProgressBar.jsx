import React from "react";
import progressBarBg from "../assets/main/progressBarBg.png";
import barValue from "../assets/main/BarValue.png";

const ProgressBar = ({ now = 50 }) => {
  return (
    <div className="position-relative  mt-5 d-flex align-items-center w-75 ">
      <img
        src={progressBarBg}
        height={15}
        className="z-0 position-absolute w-100"
      />
      <img
        src={barValue}
        className=" position-absolute"
        height={15}
        style={{
          width: `${Math.max(0, Math.min(100, now))}%`,
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ProgressBar;
