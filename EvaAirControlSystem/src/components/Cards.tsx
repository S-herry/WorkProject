import Card from "./card/MachineStatusCard";

const Cards = () => {
  const handlePowerOff = () => {
    console.log("Power off clicked");
  };

  const handleContentControl = () => {
    console.log("Content control clicked");
  };
  return (
    <section className=" grid  gap-5">
      <Card
        machine={{
          isPoweredOn: true,
          machineName: "一號機",
        }}
        onPowerOff={handlePowerOff}
        onContentControl={handleContentControl}
      />
      <Card
        machine={{
          isPoweredOn: false,
          machineName: "二號機",
        }}
        onPowerOff={handlePowerOff}
        onContentControl={handleContentControl}
      />
      <Card
        machine={{
          isPoweredOn: false,
          machineName: "三號機",
        }}
        onPowerOff={handlePowerOff}
        onContentControl={handleContentControl}
      />
    </section>
  );
};

export default Cards;
