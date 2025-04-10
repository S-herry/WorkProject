import { memo } from "react";
import { useTranslation } from "react-i18next";
interface StateDisplayProps {
  state: string;
}

const StateDisplay: React.FC<StateDisplayProps> = ({ state }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col text-lg my-auto font-medium whitespace-nowrap">
      <p className="self-start text-stone-300">{t("OtherCommon.State")}</p>
      <p className="text-white">{state}</p>
    </div>
  );
};

export default memo(StateDisplay);
