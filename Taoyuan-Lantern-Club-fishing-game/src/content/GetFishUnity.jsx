import React, {
  useEffect,
  createContext,
  useState,
  useCallback,
  memo,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import usePostFetch from "../../hook/usePostFetch";
import ProgressBar from "react-bootstrap/ProgressBar";
import useAudioManager from "../../hook/useAudioManager";
// http://192.168.0.8
const postUrl = "https://websocket.golden-slash.com/web/api";

export const UnityContext = createContext({
  UnityCallMessage: (function_name, parameter) => {},
  UnityCallResult_CanvasMessage: (function_name, parameter) => {},
  handleFetchData: () => {},
  handleSetNowAllData: (data) => {},
  ChangeShowButton: (data) => {},
  OnChangFishColor: (data) => {},
  ResetAll: () => {},
  handleFishingRodWhipInAir: () => {},
  handleButtonClick: () => {},
  handleFishingRodReelSpin: () => {},
  handleCastingRod: (int) => {},
  handleFishingRodReelSpinStop: () => {},
  SwingTheRodStep: 1,
  showButton: false,
  nowAllData: {},
});

const url = "/static/animations";
let GoOnline = true;
const GetFishUnity = memo(function GetFishUnity({ children }) {
  const [_, setMaterial] = usePostFetch(null);
  const [nowAllData, setNowAllData] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [SwingTheRodStep, setSwingTheRodStep] = useState(1);
  const { device } = useSelector((state) => state.connState);

  useEffect(() => {
    const isIEOrEdge = () => {
      const ua = window.navigator.userAgent;
      return /MSIE|Trident|Edg|Edge/.test(ua);
    };

    if (isIEOrEdge()) {
      console.log("This is Internet Explorer or Edge.");
    } else {
      console.log("This is not Internet Explorer or Edge.");
    }
  }, []);

  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    codeUrl: GoOnline ? `${url}/Build/fish.wasm.br` : "/Build/fish.wasm",
    dataUrl: GoOnline ? `${url}/Build/fish.data.br` : "/Build/fish.data",
    loaderUrl: GoOnline
      ? `${url}/Build/fish.loader.js`
      : "/Build/fish.loader.js",
    frameworkUrl: GoOnline
      ? `${url}/Build/fish.framework.js.br`
      : "/Build/fish.framework.js",
    streamingAssetsUrl: `${url}/StreamingAssets`,
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // useEffect(() => {
  //   if (!GoOnline) {
  //     if (isLoaded && loadingProgression === 1) {
  //       const timeout = setTimeout(() => {
  //         setIsDataReady(true);
  //       }, 1000);
  //       return () => clearTimeout(timeout);
  //     }
  //   }
  // }, [isLoaded, loadingProgression]);

  const handleOnAdEnd = () => {
    setIsDataReady(true);
  };

  const UnityCallMessage = (function_name, parameter) => {
    sendMessage("MainManager", function_name, parameter);
  };

  const UnityCallResult_CanvasMessage = (function_name, parameter) => {
    sendMessage("Result_Canvas", function_name, parameter);
  };

  const ChangeShowButton = (open) => {
    setShowButton(open);
  };

  const handleSetNowAllData = (data) => {
    setNowAllData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleFetchData = (behavior, data) => {
    const nowData = new Date();
    if (GoOnline) {
      setMaterial({
        url: postUrl,
        data: {
          source: device,
          behavior: behavior,
          timestamp: nowData.getTime(),
          other: data,
        },
      });
    }
  };

  const OnChangFishColor = () => {
    UnityCallResult_CanvasMessage("ChangFishColor", nowAllData?.fish);
  };

  const ResetAll = () => {
    setShowButton(false);
    UnityCallResult_CanvasMessage("ResetAnim");
    UnityCallMessage("ResetAnim");
    setNowAllData({});
    handleSwingTheRodStep(1);
    scaleToCenter();
  };

  const useEventListener = (eventName, handler) => {
    useEffect(() => {
      addEventListener(eventName, handler);

      return () => {
        removeEventListener(eventName, handler);
      };
    }, [addEventListener, removeEventListener, eventName, handler]);
  };

  // 使用通用函數
  useEventListener("OnLoadingEnd", handleOnAdEnd);
  useEventListener("OnClickPage2AnimEnd", () => setShowButton(true));
  useEventListener("OnClickPage3AnimEnd", () => setShowButton(true));
  useEventListener("OnClickEndButton", () => setShowButton(true));
  useEventListener("OnChangFishColor", OnChangFishColor);

  useEffect(() => {
    const gesture = (event) => {
      event.preventDefault();
    };
    const preventScroll = (event) => {
      event.preventDefault();
    };
    scaleToCenter();

    window.addEventListener("resize", scaleToCenter);
    window.addEventListener("focusout", scaleToCenter);
    document.addEventListener("gesturestart", gesture);
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("resize", scaleToCenter);
      window.removeEventListener("focusout", scaleToCenter);
      document.removeEventListener("gesturestart", gesture);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const { refs: audioRefs, musicLoaded } = useAudioManager([
    { src: "/static/mp3/ButtonClick.mp3", loop: false },
    { src: "/static/mp3/FishingRodWhipInAir.mp3", loop: false },
    { src: "/static/mp3/FishingRodReelSpin.mp3", loop: true },
  ]);

  // 按鈕音效
  const handleButtonClick = useCallback(() => {
    const whipAudio = audioRefs[0];
    whipAudio
      ?.play()
      .catch((error) =>
        console.error("ButtonClickMusic to play sound:", error)
      );
  }, [audioRefs]);

  // 甩竿音效
  const handleFishingRodWhipInAir = useCallback(() => {
    const whipAudio = audioRefs[1];
    whipAudio
      ?.play()
      .catch((error) =>
        console.error("FishingRodWhipInAirMusic to play sound:", error)
      );
  }, [audioRefs]);

  // 旋轉器音效
  const handleFishingRodReelSpin = useCallback(() => {
    const whipAudio = audioRefs[2];
    whipAudio?.play().catch((err) => {
      console.error("播放音效时出错：", err);
    });
  }, [audioRefs]);

  // 停
  const handleFishingRodReelSpinStop = useCallback(() => {
    const whipAudio = audioRefs[2];
    if (whipAudio) {
      whipAudio.pause();
      whipAudio.currentTime = 0;
    }
  }, [audioRefs]);

  function handleSwingTheRodStep(int) {
    setSwingTheRodStep(int);
  }

  return (
    <>
      {(!isDataReady || !musicLoaded) && (
        <div className="unity-loading d-flex  flex-column justify-content-center align-items-center w-100 vh-100">
          <img src="/static/loading.gif" alt="" />
          <ProgressBar
            animated
            variant="warning"
            now={loadingProgression * 100}
            style={{ width: "75%" }}
          />
        </div>
      )}
      <Unity
        matchWebGLToCanvasSize={true}
        className="unity-container"
        unityProvider={unityProvider}
        tabIndex={1}
        style={{
          position: "absolute",
          display: isDataReady && musicLoaded ? "flex" : "none",
          width: "100%",
          height: "100%",
        }}
      />
      <UnityContext.Provider
        value={{
          UnityCallMessage,
          UnityCallResult_CanvasMessage,
          handleFetchData,
          handleSetNowAllData,
          ChangeShowButton,
          ResetAll,
          OnChangFishColor,
          handleButtonClick,
          handleFishingRodWhipInAir,
          handleFishingRodReelSpin,
          handleFishingRodReelSpinStop,
          handleSwingTheRodStep,
          nowAllData,
          showButton,
          SwingTheRodStep,
        }}
      >
        {isDataReady && musicLoaded && children}
      </UnityContext.Provider>
    </>
  );
});

export default GetFishUnity;
export const scaleToCenter = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
};
