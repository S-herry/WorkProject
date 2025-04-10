import { Outlet } from "react-router-dom";
import ChooseLanguageModal from "../components/model/ChooseLanguage";
import { useDispatch, useSelector } from "react-redux";
import { connStateAction } from "../store/ConnState";
import { useState, useEffect, useCallback } from "react";
import GoldFishUI_bg from "../assets/main/GoldFishUI_bg.png";
function Layout() {
  const dispatch = useDispatch();
  const permissionGranted = useSelector(
    (state) => state.connState.permissionGranted
  );
  const { 沒有陀螺儀權限請至設定開啟 } = useSelector(
    (state) => state.connState.language
  );
  const [languageSelectBox, setLanguageBox] = useState(false);

  function handleChooseLang(selectValue) {
    dispatch(connStateAction.ChangeLang(selectValue));
    setLanguageBox(false);
    requestPermission();
  }

  useEffect(() => {
    if (!permissionGranted) {
      requestPermission();
    }
  }, [permissionGranted]);

  useEffect(() => {
    setLanguageBox(true);
    dispatch(connStateAction.GetDeviceType());
  }, []);

  const requestPermission = useCallback(async () => {
    if (
      window.DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === "granted") {
        dispatch(connStateAction.PermissionGrantedChange(true));
      }
    } else {
      dispatch(connStateAction.PermissionGrantedChange(true));
    }
  }, []);

  return (
    <>
      <ChooseLanguageModal
        languageSelectBox={languageSelectBox}
        onClick={handleChooseLang}
      />
      <Outlet />

      {/* {!permissionGranted && (
        <div
          className="text-center d-flex flex-column justify-content-center"
          style={{
            overflow: "hidden",
            minHeight: "100vh",
            backgroundImage: `url(${GoldFishUI_bg})`,
          }}
        >
          <h3>{沒有陀螺儀權限請至設定開啟}</h3>
        </div>
      )} */}
    </>
  );
}

export default Layout;
