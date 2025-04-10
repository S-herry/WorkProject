import { useContext, useState, useRef, useEffect } from "react";
import Illustrate from "./Illustrate";
import CatchFish from "./CatchFish";
import GetFish from "./GetFish";
import { UnityContext } from "../content/GetFishUnity";
import { useLoaderData, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { vibrationMode } from "../components/FishingRodStep1";

const Index = () => {
  const {
    UnityCallResult_CanvasMessage,
    handleSetNowAllData,
    handleFishingRodWhipInAir,
    UnityCallMessage,
    handleFetchData,
    handleSwingTheRodStep,
    SwingTheRodStep,
  } = useContext(UnityContext);

  const params = useParams();
  const FetchDataAll = useLoaderData();
  const [connPage, setConnPage] = useState(0);
  const { language, nation, permissionGranted } = useSelector(
    (state) => state.connState
  );
  const [startReeling, setStartReeling] = useState(false);

  function handleChangePage() {
    const note_Random = Math.floor(Math.random() * FetchDataAll.length);
    const fish = Math.floor(Math.random() * 5) + 1;

    setConnPage(2);
    UnityCallResult_CanvasMessage?.(
      "ChangeTWText",
      FetchDataAll[note_Random]?.note_tw || ""
    );
    UnityCallResult_CanvasMessage?.(
      "ChangeENText",
      FetchDataAll[note_Random]?.note_en || ""
    );
    UnityCallResult_CanvasMessage?.(
      "ChangeLuck_TextText",
      `${nation},${language[FetchDataAll[note_Random]?.luck] || ""}`
    );
    handleSetNowAllData({
      note_en: FetchDataAll[note_Random]?.note_en,
      note_tw: FetchDataAll[note_Random]?.note_tw,
      fish: fish,
      luck: FetchDataAll[note_Random]?.luck,
      area: params.id,
    });
  }
  function handleChangeStartReeling(bool) {
    setStartReeling(bool);
  }

  const lastOrientation = useRef({ x: 0, y: 0, z: 0 });
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
  const isTriggered = useRef(false);

  const speedThreshold = 10;

  const handleOrientation = (event) => {
    const x = parseFloat((event.beta || 0).toFixed(3));
    const y = parseFloat((event.gamma || 0).toFixed(3));
    const z = parseFloat((event.alpha || 0).toFixed(3));

    if (
      lastOrientation.current.x === x &&
      lastOrientation.current.y === y &&
      lastOrientation.current.z === z
    ) {
      return;
    }

    lastOrientation.current = { x, y, z };
  };

  const handleDevicemotion = (event) => {
    if (!event.accelerationIncludingGravity || isTriggered.current) return;

    const x = parseFloat(
      (event.accelerationIncludingGravity.x || 0).toFixed(3)
    );
    const y = parseFloat(
      (event.accelerationIncludingGravity.y || 0).toFixed(3)
    );
    const z = parseFloat(
      (event.accelerationIncludingGravity.z || 0).toFixed(3)
    );

    if (
      lastAcceleration.current.x === x &&
      lastAcceleration.current.y === y &&
      lastAcceleration.current.z === z
    ) {
      return;
    }

    if (connPage == 1 && SwingTheRodStep == 1) {
      if (
        Math.abs(x - lastAcceleration.current.x) > speedThreshold ||
        Math.abs(y - lastAcceleration.current.y) > speedThreshold ||
        Math.abs(z - lastAcceleration.current.z) > speedThreshold
      ) {
        isTriggered.current = true;
        OnClickDevicemotion();
      }
    }

    lastAcceleration.current = { x, y, z };
  };

  function OnClickDevicemotion() {
    //alert("甩竿");
    handleFishingRodWhipInAir();
    handleFetchData("甩竿", {
      dx: lastOrientation.current.x,
      dy: lastOrientation.current.y,
      dz: lastOrientation.current.z,
      x: lastAcceleration.current.x || 0,
      y: lastAcceleration.current.y || 0,
      z: lastAcceleration.current.z || 0,
    });

    lastAcceleration.current = { x: 0, y: 0, z: 0 };
    lastOrientation.current = { x: 0, y: 0, z: 0 };
    console.log("lastAcceleration " + lastAcceleration.current);
    console.log("lastOrientation " + lastOrientation.current);

    handleChangeStartReeling(true); // 開始捲線

    UnityCallMessage("SetRodWait");
    vibrationMode();

    handleSwingTheRodStep(2);

    setTimeout(() => {
      isTriggered.current = false;
    }, 1000);
  }

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("devicemotion", handleDevicemotion);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("devicemotion", handleDevicemotion);
      };
    }
  }, [permissionGranted, connPage, SwingTheRodStep]);

  return (
    <div
      className={classNames("position-relative vh-100", {
        "pt-4": connPage === 2,
      })}
    >
      {connPage === 0 && (
        <Illustrate
          onChangePage={() => {
            setConnPage(1);
          }}
        />
      )}
      {connPage === 1 && (
        <CatchFish
          handleChangeStartReeling={OnClickDevicemotion}
          onChangePage={() => {
            handleChangeStartReeling(false);
            handleChangePage();
          }}
          startReeling={startReeling}
        />
      )}
      {connPage === 2 && <GetFish onChangePage={() => setConnPage(1)} />}
    </div>
  );
};

export default Index;

export async function fetchAllData() {
  try {
    const response = await fetch("/data/Data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

export const loadChineseFont = async () => {
  try {
    const fontPath = "/static/fonts/DFLiShu-W5-WINP-BF-02.woff2";
    const font = new FontFace("font1", `url(${fontPath})`, {
      weight: "normal",
      style: "normal",
      display: "swap",
    });
    const isFontLoaded = document.fonts.check("1em 'font1'");
    if (isFontLoaded) {
      console.log("font1 already loaded");
      return;
    }
    await font.load();
    document.fonts.add(font);
    console.log("Chinese font loaded successfully.");
  } catch (error) {
    console.log("Error loadChineseFont:", error);
  }
};
