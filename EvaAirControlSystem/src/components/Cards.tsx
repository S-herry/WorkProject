import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Card from "./card/MachineStatusCard";
import MenuContext from "../components/store/Menu-Context";

const Cards = ({ id }: { id: number | string | null }) => {
  const Menus = useContext(MenuContext);
  const { selectedMenu } = Menus;
  const { t } = useTranslation();

  if (!selectedMenu) return <p>{t("OtherCommon.NoData")}</p>;

  return (
    <section className=" grid gap-5">
      {selectedMenu.computers &&
        selectedMenu.computers.map((menu) => (
          <Card
            key={menu.id}
            card_id={id}
            is_control={menu.is_control}
            id={menu.id}
            isPoweredOn={menu.status == "online"} // online
            machineName={t(menu.computer_name)}
          />
        ))}
    </section>
  );
};

export default Cards;
