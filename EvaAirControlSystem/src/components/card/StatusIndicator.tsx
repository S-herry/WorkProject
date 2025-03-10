import React from "react";

interface StatusIndicatorProps {
  isPoweredOn: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isPoweredOn }) => {
  return (
    <p
      className={`self-start text-lg font-medium text-nowrap  ${
        isPoweredOn ? "text-PowerOn" : "text-ButtonShutdown"
      }`}
    >
      {isPoweredOn ? "已開機" : "關機"}
    </p>
  );
};

export default StatusIndicator;
