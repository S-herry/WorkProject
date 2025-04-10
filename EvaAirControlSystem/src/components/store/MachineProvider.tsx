import { useState } from "react";
import MachineContext from "./Machine-Context";
import { Json_filed } from "./machineType";
import { useTranslation } from "react-i18next";

const MachineProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  const [machine, setMachine] = useState<Json_filed | null>(null);
  const [language, setLanguage] = useState<"tw" | "en">("tw");

  function SetMachineData(data: Json_filed | null) {
    setMachine(data);
  }
  function SetLanguage(lg: "tw" | "en") {
    setLanguage(lg);
    i18n.changeLanguage(lg);
  }

  return (
    <MachineContext.Provider
      value={{
        language: language,
        machine: machine,
        SetMachineData,
        SetLanguage,
      }}
    >
      {children}
    </MachineContext.Provider>
  );
};
export default MachineProvider;
