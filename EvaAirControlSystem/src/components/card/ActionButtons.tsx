import React from "react";
import Button from "../common/Button";

interface ActionButtonsProps {
  onPowerOff?: () => void;
  onContentControl?: () => void;
  state: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPowerOff,
  onContentControl,
  state,
}) => {
  return (
    <div className="flex gap-6">
      <Button
        color={state ? "bg-ButtonShutdown" : "bg-PowerOn"}
        onClick={onPowerOff}
      >
        {state ? "關 機" : "開 機"}
      </Button>
      <Button
        color={!state ? "bg-[#6A6A6A]" : "bg-PowerOn"}
        onClick={onContentControl}
        disabled={!state}
      >
        內容控制
      </Button>
    </div>
  );
};

export default ActionButtons;
