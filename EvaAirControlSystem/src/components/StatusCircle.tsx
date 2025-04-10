const StatusCircle = ({ state, size }: { state: boolean; size: string }) => {
  return (
    <div
      className={`${
        state ? "bg-[#09BD3C]" : "bg-[#FC2E53]"
      }  ${size} rounded-full max-sm:hidden my-auto`}
    ></div>
  );
};

export default StatusCircle;
