import React from "react";

interface MachineInfoProps {
  name: string;
}

const MachineInfo: React.FC<MachineInfoProps> = ({ name }) => {
  return (
    <h2 className=" text-3xl max-sm:text-xl text-nowrap  font-bold text-white">
      {name}
    </h2>
  );
};

export default MachineInfo;
