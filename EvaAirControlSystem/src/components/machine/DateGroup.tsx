import { clsx } from "clsx";
import { useContext, useState } from "react";
import MachineItem from "./MachineItem";
import { Json_Menus, Stage } from "../store/machineType";
import machineContext from "../store/Machine-Context";
import { useTranslation } from "react-i18next";
interface DateGroupProps {
  title: string;
  id?: number;
  subItems?: Json_Menus;
  json_key: string;
  current_stage?: Stage;
  SetCurrent_stage: ({ id, room, category, data }: Stage) => void;
}

function DateGroup({
  title,
  subItems,
  json_key,
  current_stage,
  SetCurrent_stage,
}: DateGroupProps) {
  const machine = useContext(machineContext);
  const { language } = machine;
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState<string | number | null>(null);
  const root =
    current_stage?.room == json_key && current_stage?.category == title;

  return (
    <div
      className={clsx("collapse bg-[#434343] border border-base-300", {
        "collapse-arrow": subItems,
      })}
    >
      {subItems && <input type="radio" name="dateGroup" id={`item-${title}`} />}

      <div
        className={clsx(
          "collapse-title text-2xl   flex max-sm:text-xl items-center gap-5 ",
          { "bg-PowerOn": root }
        )}
      >
        {t(title)}
      </div>
      <div className="collapse-content text-sm flex flex-col gap-5">
        {subItems?.menus.map((subItem, index) => {
          return (
            <MachineItem
              key={`${subItem.id}__${index}`}
              category={title}
              id={subItem.id}
              title={language === "tw" ? subItem.title_tw : subItem.title_en}
              json_key={json_key}
              records={subItem.item}
              type={subItem?.type}
              activeId={activeId}
              setActiveId={setActiveId}
              current_stage={current_stage}
              SetCurrent_stage={SetCurrent_stage}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DateGroup;
