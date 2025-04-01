import React from "react";
import { useTranslation } from "react-i18next";

interface StatusIndicatorProps {
  isPoweredOn: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isPoweredOn }) => {
  const { t } = useTranslation();
  return (
    <p
      className={`self-start text-lg font-medium text-nowrap  ${
        isPoweredOn ? "text-PowerOn" : "text-ButtonShutdown"
      }`}
    >
      {isPoweredOn ? t("OtherCommon.PowerOn") : t("OtherCommon.PowerOff")}
    </p>
  );
};

export default StatusIndicator;
