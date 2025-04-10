import clsx from "clsx";
import { MenusItem, Stage } from "../store/machineType";
import { memo } from "react";
import Image from "../common/Image";
interface RecordsProps {
  records?: MenusItem[];
  id: number;
  category: string;
  current_stage?: Stage;
  handleSubmit: (id: number, control: string) => void;
  language: string;
}
const Records = memo(function Records({
  id,
  records,
  category,
  current_stage,
  language,
  handleSubmit,
}: RecordsProps) {
  return (
    <div className="collapse-content text-sm flex flex-col gap-4 ps-12">
      {records &&
        records.map((item) => {
          const isCurrentRecord =
            current_stage?.id.toString() === id.toString() &&
            current_stage?.category === category &&
            current_stage?.data.toString() === item.id.toString();

          return (
            <button
              key={item.id}
              className={clsx(
                "p-5 mt-2 self-start hover:bg-[#10cf7a] hover:text-black font-medium  rounded-xl flex  w-full text-left items-center",
                { "bg-[#10cf7a] text-black": isCurrentRecord },
                { "bg-[#6A6A6A] text-white": !isCurrentRecord }
              )}
              onClick={() => handleSubmit(id, `${item.id}`)}
            >
              {isCurrentRecord && (
                <Image
                  src="/static/images/blackArrow.png"
                  alt=""
                  className="w-6 h-6 me-1"
                />
              )}
              <p>{language === "tw" ? item.title_tw : item.title_en}</p>
            </button>
          );
        })}
    </div>
  );
});

export default Records;
