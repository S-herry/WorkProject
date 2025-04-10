const RangeBar = ({
  title,
  volume,
  handleSubmit,
}: {
  volume: number;
  title: string;
  handleSubmit: (value: string) => void;
}) => {
  return (
    <div className="flex flex-1 flex-col justify-end gap-2 my-auto ">
      <small>
        {title}: {volume}
      </small>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(event) => handleSubmit(event.target.value)}
        className="range range-accent  my-auto "
      />
    </div>
  );
};

export default RangeBar;
