import { memo } from "react";
import Button from "../common/Button";
import Image from "../common/Image";
interface VideoControlBtn {
  hasRecords: boolean;
  id: string | number;
  handleSubmit: (
    id: string | number,
    control: number | string,
    type?: string
  ) => void;
  type?: string;
  isActive: boolean;
}

const VideoControlButton = memo(function VideoControlButton({
  type,
  handleSubmit,
  id,
  hasRecords,
  isActive,
}: VideoControlBtn) {
  if (type != "mp4") return;

  return (
    <div className="w-full z-10 flex justify-end gap-2">
      {[
        [0, "2X"],
        [3, "1X"],
        [1, "stop"],
        [2, "play"],
        [5, "volume-up"],
        [6, "volume-down"],
      ].map(([control, label]) => (
        <Button
          key={control}
          color="bg-red-400 hover:bg-red-400 z-10 "
          onClick={() => handleSubmit(id, control, type)}
          disabled={hasRecords ? !isActive : false}
        >
          <Image
            src={`/static/images/${label}.png`}
            alt="images"
            className=" w-8 h-8"
          />
        </Button>
      ))}
    </div>
  );
});

export default VideoControlButton;
