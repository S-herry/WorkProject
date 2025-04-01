import React from "react";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";

interface ActionButtonsProps {
  onPowerOff?: () => void;
  onContentControl?: () => void;
  state: boolean;
  is_control: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPowerOff,
  onContentControl,
  state,
  is_control,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        color={`px-3 py-1 ${state ? "bg-ButtonShutdown " : "bg-PowerOn "}`}
        onClick={onPowerOff}
      >
        {state ? t("OtherCommon.PowerOff") : t("OtherCommon.PowerOn")}
      </Button>
      <Button
        color={`px-3 py-1 ${!state ? "bg-[#6A6A6A]" : "bg-PowerOn"}`}
        onClick={onContentControl}
        disabled={!state}
        show={is_control}
      >
        {t("OtherCommon.ContentControl")}
      </Button>
    </>
  );
};

export default ActionButtons;
