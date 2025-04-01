import { memo } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";

interface StatusHeaderProps {
  machineNumber: string | null;
  status: boolean;
}

const StatusHeader = memo(function StatusHeader({
  machineNumber,
  status,
}: StatusHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const powerText = t("OtherCommon.PowerOn");
  const statusText = status
    ? t("OtherCommon.Playing")
    : t("OtherCommon.NotPlay");
  const statusClass = status
    ? "text-PowerOn bg-[#09BD3C]"
    : "text-ButtonShutdown bg-[#FC2E53]";
  const statusTextClass = status
    ? "text-PowerOn text-[#09BD3C]"
    : "text-ButtonShutdown text-[#FC2E53]";
  return (
    <header className="flex items-center gap-2">
      <div className="flex flex-col self-start">
        <span
          className={clsx("self-start text-lg font-medium", statusTextClass)}
        >
          {powerText}
        </span>
        <h1 className="text-3xl font-bold text-white max-sm:text-xl">
          {t(machineNumber)}
        </h1>
      </div>
      <div />
      <div className="flex items-center justify-center">
        <div className={clsx("w-[50px] h-[50px] rounded-full", statusClass)} />
      </div>

      <div className="flex flex-col text-lg font-medium whitespace-nowrap">
        <span className="self-start text-stone-300">
          {t("OtherCommon.State")}
        </span>
        <span className="text-white">{statusText}</span>
      </div>
      <div className="ms-auto">
        <Button color="bg-[#455471] px-4 py-1" onClick={() => navigate("..")}>
          {t("OtherCommon.Return")}
        </Button>
      </div>
    </header>
  );
});

export default StatusHeader;
