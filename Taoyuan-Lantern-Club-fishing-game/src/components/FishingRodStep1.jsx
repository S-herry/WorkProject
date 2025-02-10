import HitTitle from "./HitTitle";
import HintSpring from "./Animated/Spring/HintSpring";
import { useSelector } from "react-redux";

const FishingRodStep1 = () => {
  const { language } = useSelector((state) => state.connState);

  const { 請甩動釣竿, 甩動手機拋出魚竿 } = language;

  return (
    <>
      <HitTitle title={請甩動釣竿} />
      <HintSpring>{甩動手機拋出魚竿}</HintSpring>
    </>
  );
};

export default FishingRodStep1;

export function vibrationMode() {
  if ("vibrate" in navigator) {
    navigator.vibrate(1000);
  }
}
