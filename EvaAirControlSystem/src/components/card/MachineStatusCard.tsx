import React, { useState } from "react";
import StatusIndicator from "./StatusIndicator";
import MachineInfo from "./MachineInfo";
import StateDisplay from "./StateDisplay";
import ActionButtons from "./ActionButtons";
import { MachineStatus } from "./types";

interface MachineStatusCardProps {
  machine?: MachineStatus;
  onPowerOff?: () => void;
  onContentControl?: () => void;
}

const MachineStatusCard: React.FC<MachineStatusCardProps> = ({
  machine = {
    isPoweredOn: true,
    machineName: "一號機",
  },
  onPowerOff,
  onContentControl,
}) => {
  const [powerOff, setPowerOff] = useState(machine.isPoweredOn);
  return (
    <section className="rounded-none w-full ">
      <div className="flex max-sm:flex-col max-sm:gap-3 justify-between p-10 w-full rounded-3xl bg-neutral-800 shadow-[0px_9px_57px_rgba(0,0,0,0.07)] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col flex-nowrap">
          <StatusIndicator isPoweredOn={powerOff} />
          <MachineInfo name={machine.machineName} />
        </div>
        <div className=" flex gap-5">
          <div
            className={`${
              powerOff ? "bg-[#09BD3C]" : "bg-[#FC2E53]"
            } w-12 h-12 rounded-full max-sm:hidden`}
          ></div>
          <StateDisplay state={powerOff ? "播放中" : "關機"} />
        </div>
        <ActionButtons
          state={powerOff}
          onPowerOff={() => {
            setPowerOff(!powerOff);
            if (onPowerOff) {
              onPowerOff();
            }
          }}
          onContentControl={onContentControl}
        />
      </div>
    </section>
  );
};

export default MachineStatusCard;
