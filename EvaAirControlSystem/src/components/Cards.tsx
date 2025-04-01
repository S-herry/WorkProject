import Card from "./card/MachineStatusCard";
import { useNavigate } from "react-router-dom";
import url from "../assets/data/url.json";
import { useContext } from "react";
import MenuContext from "../components/store/Menu-Context";
import { useTranslation } from "react-i18next";

const Cards = ({ id }: { id: number | string | null }) => {
  const Menus = useContext(MenuContext);
  const { selectedMenu } = Menus;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleContentControl = (id: string | number) => {
    navigate(`/machine_control/${id}`);
  };

  async function handlePowerOff(status: boolean) {
    const host = url.test ? url.host : "";
    const path = status ? url.machine_control.close : url.machine_control.open;
    const newPath = `${host}${path.replace("{id}", id?.toString() || "")}`;
    const power = await fetch(newPath);

    if (!power.ok) {
      console.log("power 錯誤");
    }
  }

  return (
    <section className=" grid gap-5">
      {selectedMenu == null && <p>{t("OtherCommon.NoData")}</p>}
      {selectedMenu &&
        selectedMenu.computers &&
        selectedMenu.computers.map((menu) => (
          <Card
            key={menu.id}
            is_control={menu.is_control}
            machine={{
              id: menu.id,
              isPoweredOn: menu.status == "online", // online
              machineName: t(menu.computer_name),
            }}
            onPowerOff={() => handlePowerOff(menu.status == "online")} // online
            onContentControl={() => handleContentControl(menu.id)}
          />
        ))}
    </section>
  );
};

export default Cards;
