import React from "react";

interface StateDisplayProps {
  state: string;
}

const StateDisplay: React.FC<StateDisplayProps> = ({ state }) => {
  return (
    <div className="flex flex-col text-lg font-medium whitespace-nowrap">
      <p className="self-start text-stone-300">狀態</p>
      <p className="text-white">{state}</p>
    </div>
  );
};

export default StateDisplay;
