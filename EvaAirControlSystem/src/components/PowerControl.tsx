import { useTranslation } from "react-i18next";
import Button from "./common/Button";
import url from "../assets/data/url.json";
import { useContext } from "react";
import clsx from "clsx";
import MenuContext from "./store/Menu-Context";

const PowerControl = () => {
  const { t } = useTranslation();
  const menu = useContext(MenuContext);
  const { menuItems } = menu;

  async function handleAllOpen() {
    const host = url.test ? url.host : "";
    await fetchData(host + url.transfer_information.controlAllOpen);
  }
  async function handleAllClose() {
    const host = url.test ? url.host : "";
    await fetchData(host + url.transfer_information.controlAllClose);
  }
  async function fetchData(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`請求失敗: ${res.status} ${res.statusText}`);
      }
      return true;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "未知錯誤");
      return false;
    }
  }

  return (
    <div className="text-white flex gap-4  flex-col p-5 rounded-md ">
      {menuItems &&
        menuItems.map((scene) => {
          return (
            scene.computers &&
            scene.computers.map((item, idx) => {
              return (
                <div
                  key={item.id + "-" + idx}
                  className="bg-[#434343] w-full h-16 rounded-3xl flex justify-between items-center px-8"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={clsx(
                        "h-12 w-12 rounded-full",
                        item.status == "online"
                          ? "bg-green-500"
                          : "bg-[#FC2E53]"
                      )}
                    ></div>
                    <h3>{t(item.computer_name)}</h3>
                  </div>
                  <div className="flex gap-5">
                    <p className="text-[#BDBDBD]">
                      {t("OtherCommon.PowerStatus")}
                    </p>
                    <p>
                      {item.status == "online"
                        ? t("OtherCommon.On")
                        : t("OtherCommon.Off")}
                    </p>
                  </div>
                </div>
              );
            })
          );
        })}

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
