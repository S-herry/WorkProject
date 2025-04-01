import { createContext } from "react";
import { Json_filed } from "./machineType";

const MachineContext = createContext<{
  machine: Json_filed | null;
  language: "tw" | "en";
  SetMachineData: (data: Json_filed | null) => void;
  SetLanguage: (lang: "tw" | "en") => void;
}>({
  machine: null,
  language: "tw",
  SetMachineData: () => undefined,
  SetLanguage: () => undefined,
});

export default MachineContext;
