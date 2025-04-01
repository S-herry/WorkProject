import { useContext, memo } from "react";
import MenuContext from "../components/store/Menu-Context";
import Cards from "../components/Cards";
import PowerControl from "../components/PowerControl";
import WelcomeMessage from "../components/WelcomeMessage";

const ReturnInfo = memo(({ id }: { id: string | number | null }) => {
  if (id == null) {
    return <WelcomeMessage />;
  } else if (id == 9999) {
    return <PowerControl />;
  } else {
    return <Cards id={id} />;
  }
});

const Dashboard: React.FC = () => {
  const menu = useContext(MenuContext);
  const { selectedMenu } = menu;

  return (
    <main className="flex flex-col  max-sm:flex-col w-full">
      <ReturnInfo id={selectedMenu?.id ?? null} />
    </main>
  );
};

export default Dashboard;
