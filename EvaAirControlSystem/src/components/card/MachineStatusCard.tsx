import React, { useState } from "react";
import StatusIndicator from "./StatusIndicator";
import MachineInfo from "./MachineInfo";
import StateDisplay from "./StateDisplay";
import ActionButtons from "./ActionButtons";
import { MachineStatus } from "./types";
import url from "../../assets/data/url.json";
import { useTranslation } from "react-i18next";

interface MachineStatusCardProps {
  is_control: boolean;
  machine?: MachineStatus;
  onPowerOff?: () => void;
  onContentControl?: () => void;
}

const MachineStatusCard: React.FC<MachineStatusCardProps> = ({
  is_control,
  machine = {
    id: "",
    isPoweredOn: true,
    machineName: "一號機",
  },
  onPowerOff,
  onContentControl,
}) => {
  const [powerOff, setPowerOff] = useState(machine.isPoweredOn);
  const { t } = useTranslation();

  async function OpenMachine(id: string | number, power: boolean) {
    const control = power
      ? url.machine_control.close
      : url.machine_control.open;

    const test = url.test ? url.host : "";
    const path = test + control.replace("{id}", id.toString());
    const machine_control = await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!machine_control.ok) {
      return new Response(
        JSON.stringify({ message: "Could not fetch events." }),
        { status: 500 }
      );
    }

    return machine_control.json();
  }

  return (
    <section className="rounded-3xl bg-[#202020] flex flex-col lg:flex-row   gap-2 bg-neutral-800 p-5">
      <div className="flex flex-1 flex-col flex-nowrap ">
        <StatusIndicator isPoweredOn={powerOff} />
        <MachineInfo name={machine.machineName} />
      </div>
      <div className="flex flex-1 gap-2 ">
        <div
          className={`${
            powerOff ? "bg-[#09BD3C]" : "bg-[#FC2E53]"
          } w-[50px] h-[50px] rounded-full max-sm:hidden my-auto`}
        ></div>
        <StateDisplay
          state={
            powerOff ? t("OtherCommon.PowerOn") : t("OtherCommon.PowerOff")
          }
        />
      </div>
      <div className="flex flex-1 justify-end gap-4 my-auto">
        <ActionButtons
          is_control={is_control}
          state={powerOff}
          onPowerOff={() => {
            setPowerOff(!powerOff);
            if (machine?.id !== undefined) {
              OpenMachine(machine.id, powerOff);
            }
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
