import { useTranslation } from "react-i18next";
import Button from "./common/Button";
import url from "../assets/data/url.json";

const PowerControl = () => {
  const { t } = useTranslation();

  function handleAllOpen() {
    const text = url.test ? url.host : "";
    fetchData(text + url.transfer_information.controlAllOpen);
  }
  function handleAllClose() {
    const text = url.test ? url.host : "";
    fetchData(text + url.transfer_information.controlAllClose);
  }

  async function fetchData(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("錯誤");
    }
  }

  return (
    <div className="text-white flex gap-10  flex-col p-5 rounded-md ">
      <div className="bg-[#434343]   w-full h-16 rounded-3xl flex justify-between items-center px-8">
        <div className="h-12 w-12 bg-[#FC2E53] rounded-full"></div>
        <div className="flex gap-5">
          <p className="text-[#BDBDBD]">{t("OtherCommon.PowerStatus")}</p>
          <p>{t("OtherCommon.Off")}</p>
        </div>
      </div>
      <div className=" flex gap-10 ms-auto ">
        <Button size="lg" color="bg-PowerOn px-2" onClick={handleAllOpen}>
          {t("OtherCommon.OneClickPowerOn")}
        </Button>
        <Button
          size="lg"
          color="bg-ButtonShutdown px-2"
          onClick={handleAllClose}
        >
          {t("OtherCommon.OneClickPowerOff")}
        </Button>
      </div>
    </div>
  );
};

export default PowerControl;
