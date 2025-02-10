import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import HintSpring from "./Animated/Spring/HintSpring";
import { UnityContext } from "../content/GetFishUnity";
import { useSelector } from "react-redux";
const Footer = ({ onFishing, onNoReel }) => {
  const { 旋轉收線器拉起金魚 } = useSelector(
    (state) => state.connState.language
  );

  const {
    UnityCallMessage,
    handleFishingRodReelSpin,
    handleFishingRodReelSpinStop,
  } = useContext(UnityContext);

  const [circlePath, setCirclePath] = useState([]);
  const [touch, setTouch] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const boundaryRef = useRef(null);

  const isCircle = (path) => {
    if (path.length < 10) return false; // 如果點數過少，無法形成圓形
    // 1. 計算平均圓心
    const centerX = path.reduce((sum, point) => sum + point.x, 0) / path.length;
    const centerY = path.reduce((sum, point) => sum + point.y, 0) / path.length;
    // 2. 計算每個點到圓心的距離
    const distances = path.map((point) =>
      Math.hypot(point.x - centerX, point.y - centerY)
    );
    // 3. 檢查距離的變化幅度（可以允許小的變動）
    const avgDistance =
      distances.reduce((sum, d) => sum + d, 0) / distances.length;
    const tolerance = 1.2; // 差量
    for (let distance of distances) {
      if (Math.abs(distance - avgDistance) / avgDistance > tolerance) {
        return false; // 如果距離偏差過大，則非圓形
      }
    }
    // 4. 檢查起始與結束點距離
    const start = path[0];
    const end = path[path.length - 1];
    const startEndDistance = Math.hypot(end.x - start.x, end.y - start.y);
    if (startEndDistance / avgDistance > tolerance) {
      return false; // 非圓形
    }
    return true; //圓形
  };

  const isCircleShape = useMemo(() => {
    return isCircle(circlePath);
  }, [circlePath]);

  useEffect(() => {
    if (isCircleShape) {
      setCirclePath([]);
      onFishing();
    }
  }, [circlePath]);

  const handleTouchMove = (event) => {
    UnityCallMessage("SetRodGet");
    setTouch(true);
    if (boundaryRef.current && event.changedTouches?.[0]) {
      const touch = event.changedTouches[0];
      const clampedX = touch.clientX;
      const clampedY = touch.clientY;

      setCirclePath((prev) => {
        const newPath = [...prev, { x: clampedX, y: clampedY }];
        return newPath.length > 100 ? newPath.slice(-100) : newPath;
      });

      setPos({ x: clampedX, y: clampedY });
    }
  };

  const handleTouchEnd = () => {
    UnityCallMessage("NoReel");
    setTouch(false);
    setCirclePath([]);
  };

  useEffect(() => {
    if (touch) {
      handleFishingRodReelSpin();
      return;
    } else {
      handleFishingRodReelSpinStop();
    }

    const timer = setInterval(() => {
      onNoReel();
    }, 200);

    return () => clearInterval(timer);
  }, [touch]);

  return (
    <footer
      draggable={false}
      ref={boundaryRef}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed-bottom w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <HintSpring>
          <p>{旋轉收線器拉起金魚}</p>
        </HintSpring>

        <div
          className="rounded-circle position-absolute bg-info"
          style={{
            top: `${pos.y}px`,
            left: `${pos.x}px`,
            transform: "translate(-50%, -50%)",
            width: "5rem",
            height: "5rem",
            visibility: touch ? "" : "hidden",
          }}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
