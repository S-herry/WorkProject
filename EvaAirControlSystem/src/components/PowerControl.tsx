import Button from "./common/Button";

const PowerControl = () => {
  return (
    <div className="text-white flex gap-5  flex-col bg-[#202020] p-5 rounded-md">
      <div className="text-center flex justify-center gap-5">
        <Button size="md" color="bg-ButtonShutdown">
          關機
        </Button>
        <Button size="md" color="bg-PowerOn">
          開機
        </Button>
      </div>
    </div>
  );
};

export default PowerControl;
