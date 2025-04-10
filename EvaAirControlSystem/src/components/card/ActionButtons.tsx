import { useCallback, useState } from "react";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";
import url from "../../assets/data/url.json";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  state: boolean;
  is_control: boolean;
  id: string | number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  state,
  is_control,
  id,
}) => {
  const [powerOff, setPowerOff] = useState(state);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handlePowerOff = useCallback(
    async (status: boolean) => {
      const host = url.test ? url.host : "";
      const path = status
        ? url.machine_control.close
        : url.machine_control.open;
      const newPath = `${host}${path.replace("{id}", `${id}`)}`;

      try {
        const power = await fetch(newPath, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!power.ok) {
          return;
        }
        const data = await power.json();
        if (data) {
          setPowerOff((prev) => !prev);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [id]
  );

  return (
    <>
      <Button
        color={`px-2 py-1 ${powerOff ? "bg-ButtonShutdown " : "bg-PowerOn "}`}
        onClick={() => handlePowerOff(powerOff)}
      >
        {powerOff ? t("OtherCommon.PowerOff") : t("OtherCommon.PowerOn")}
      </Button>
      <Button
        color={`px-2 py-1 ${!powerOff ? "bg-[#6A6A6A]" : "bg-PowerOn"}`}
        onClick={() => navigate(`/machine_control/${id}`)}
        disabled={!powerOff}
        show={is_control}
      >
        {t("OtherCommon.ContentControl")}
      </Button>
    </>
  );
};

export default ActionButtons;
