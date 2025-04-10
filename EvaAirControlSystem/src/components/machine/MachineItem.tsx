import { useCallback, useContext, useEffect, useState } from "react";
import { clsx } from "clsx";
import { useSubmit } from "react-router-dom";
import { MenusItem, Stage } from "../store/machineType";
import machineContext from "../store/Machine-Context";
import Button from "../common/Button";
import VideoControlButton from "./VideoControlButton";
import Records from "./Records";
import Image from "../common/Image";

interface Props {
  title: string;
  records?: MenusItem[];
  id: number;
  json_key: string;
  category: string;
  type?: string;
  activeId: string | number | null;
  current_stage?: Stage;
  setActiveId: (id: string | number | null) => void;
  SetCurrent_stage: ({ id, room, category, data }: Stage) => void;
}

function MediaItem({
  title,
  records = [],
  id,
  json_key,
  category,
  type,
  activeId,
  setActiveId,
  current_stage,
  SetCurrent_stage,
}: Props) {
  const isCurrentStage =
    current_stage?.category === category &&
    current_stage?.id.toString() === id.toString();

  const machine = useContext(machineContext);
  const submit = useSubmit();
  const [currentStage, setIsCurrentStage] = useState(isCurrentStage);
  const { language } = machine;

  const isActive = activeId === id;
  const hasRecords = records.length > 0;

  const toggleExpand = () => {
    if (isActive) return;
    setActiveId(id);
  };

  const [video, setVideo] = useState<number>(Number(current_stage?.video) || 0);

  const handleSubmit = useCallback(
    (
      itemId: number,
      dataId: string,
      customCategory?: string,
      video?: number | string
    ) => {
      if (hasRecords && !isActive) return;

      const formData = new FormData();
      formData.append("room", json_key);
      formData.append("category", customCategory || category);
      formData.append("id", itemId.toString());
      formData.append("data", dataId.toString());
      formData.append("menu", hasRecords ? "1" : "0");
      formData.append("video", video ? video.toString() : "-1");
      formData.append("volume", "-1");

      submit(formData, { method: "post" });

      SetCurrent_stage({
        room: json_key,
        id: itemId,
        category: customCategory ? customCategory : category,
        data: dataId,
      });
    },
    [hasRecords, isActive, json_key, category]
  );

  const handleVideoChange = (newVideo: number) => {
    setVideo(newVideo);
    handleSubmit(id, "3", type, newVideo);
  };

  useEffect(() => {
    if (current_stage?.video !== undefined) {
      if (Number(current_stage.video) <= 0) return;
      setVideo(Number(current_stage.video));
    }
  }, [current_stage?.video]);

  useEffect(() => {
    if (current_stage) {
      const state =
        current_stage?.category === category &&
        current_stage?.id.toString() === id.toString();
      setIsCurrentStage(state);
    }
  }, [category, current_stage, id]);

  return (
    <div
      className={clsx("bg-[#434343] mt-3", {
        "collapse collapse-arrow": hasRecords,
      })}
    >
      {hasRecords && (
        <input
          type="radio"
          name="machineItem"
          id={`item-${id}`}
          onChange={toggleExpand}
        />
      )}

      <div
        className={clsx(
          "collapse-title max-sm:text-lg rounded-md text-xl flex flex-col lg:flex-row gap-3 m-0 p-2",
          { "bg-[#10cf7a] text-black": currentStage }
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <h3 className="my-auto">{title}</h3>
          {type === "mp4" && currentStage && (
            <input
              type="range"
              min={0}
              max={100}
              value={video}
              className="range range-info w-full"
              onChange={(event) =>
                handleVideoChange(Number(event.target.value))
              }
            />
          )}
        </div>

        <div className="w-full z-10 flex my-auto justify-end gap-2">
          {currentStage && (
            <VideoControlButton
              type={type}
              handleSubmit={handleSubmit}
              id={id}
              hasRecords={hasRecords}
              isActive={isActive}
            />
          )}
          <Button
            show={currentStage && current_stage?.data === "mp4"}
            color="bg-red-400 hover:bg-red-400 z-10"
            onClick={() => handleSubmit(id, "1", type)}
            disabled={hasRecords ? !isActive : false}
          >
            <Image
              src="/static/images/volume-up.png"
              alt="images"
              className="w-8 h-8"
            />
          </Button>

          <Button
            show={currentStage && current_stage?.data === "mp4"}
            color="bg-red-400 hover:bg-red-400 z-10"
            onClick={() => handleSubmit(id, "2", type)}
            disabled={hasRecords ? !isActive : false}
          >
            <Image
              src="/static/images/volume-down.png"
              alt="images"
              className="w-8 h-8"
            />
          </Button>

          <Button
            show={type === "pdf" && !currentStage}
            color="bg-red-400 hover:bg-red-400 z-10 px-2"
            onClick={() => handleSubmit(id, "1", type)}
            disabled={hasRecords ? !isActive : false}
          >
            下一張
          </Button>

          <Button
            show={!hasRecords && !currentStage}
            color="bg-red-400 hover:bg-red-400 z-10 px-2"
            onClick={() => {
              handleSubmit(id, "0");
            }}
            disabled={hasRecords ? !isActive : false}
          >
            資料播放
          </Button>
        </div>
      </div>

      {hasRecords && (
        <Records
          records={records}
          id={id}
          category={category}
          current_stage={current_stage}
          handleSubmit={handleSubmit}
          language={language}
        />
      )}
    </div>
  );
}

export default MediaItem;
