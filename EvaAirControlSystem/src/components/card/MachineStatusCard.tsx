import React, { useCallback, useEffect, useState, memo } from "react";
import StatusIndicator from "./StatusIndicator";
import MachineInfo from "./MachineInfo";
import StateDisplay from "./StateDisplay";
import ActionButtons from "./ActionButtons";
import url from "../../assets/data/url.json";
import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router-dom";
import { fetchInformationCard } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
import RangeBar from "../RangeBar";
import StatusCircle from "../StatusCircle";
interface MachineStatusCardProps {
  is_control: boolean;
  id?: string | number;
  isPoweredOn: boolean;
  machineName: string;
  card_id?: number | string | null;
}

const MachineStatusCard: React.FC<MachineStatusCardProps> = ({
  id,
  is_control,
  isPoweredOn,
  machineName,
}) => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const [volume, setVolume] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["InformationCard", id],
    queryFn: async ({ signal }) => {
      const host = url.test === true ? url.host : "";
      const path = host + url.information.all.replace("{id}", `${id}`);
      if (!path) throw new Error("Missing path");
      return fetchInformationCard({ url: path, signal });
    },
    refetchOnWindowFocus: true,
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.current_stage?.volume) {
      setVolume((prevVolume) => {
        return prevVolume !== data.current_stage.volume
          ? data.current_stage.volume
          : prevVolume;
      });
    }
  }, [data]);

  const handleSubmit = useCallback(
    (volume: number | string) => {
      if (data == null) return;
      const formData = new FormData();
      formData.append("room", data.json_key);
      formData.append("volume", volume ? volume.toString() : "0");

      submit(formData, { method: "post" });
      setVolume(() =>
        typeof volume === "string" ? parseFloat(volume) : volume
      );
    },
    [data, submit]
  );

  return (
    <section className="rounded-3xl bg-[#202020] flex flex-col lg:flex-row gap-2 bg-neutral-800 p-5">
      <div className="flex flex-1 flex-col flex-nowrap ">
        <StatusIndicator isPoweredOn={isPoweredOn} />
        <MachineInfo name={machineName} />
      </div>
      <div className="flex flex-1 gap-2 ">
        <StatusCircle state={isPoweredOn} size="w-[50px] h-[50px]" />
        <StateDisplay
          state={
            isPoweredOn ? t("OtherCommon.PowerOn") : t("OtherCommon.PowerOff")
          }
        />
      </div>
      {isPoweredOn &&
        id !== 2 &&
        id !== 5 &&
        id !== 6 &&
        id !== 12 &&
        id !== 13 && (
          <RangeBar
            title={t("OtherCommon.volume")}
            volume={volume}
            handleSubmit={handleSubmit}
          />
        )}
      <div className="flex flex-1 justify-end gap-4 my-auto ">
        <ActionButtons
          id={id ?? ""}
          is_control={is_control}
          state={isPoweredOn}
        />
      </div>
    </section>
  );
};

// 使用 React.memo 包裝組件，避免不必要的重新渲染
export default memo(MachineStatusCard);
