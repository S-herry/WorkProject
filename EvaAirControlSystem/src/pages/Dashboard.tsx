import { useContext, memo, useMemo } from "react";
import MenuContext from "../components/store/Menu-Context";
import Cards from "../components/Cards";
import PowerControl from "../components/PowerControl";
import WelcomeMessage from "../components/WelcomeMessage";

const Dashboard: React.FC = () => {
  const { selectedMenu } = useContext(MenuContext) ?? {};
  const id = useMemo(() => selectedMenu?.id ?? null, [selectedMenu]);
  return (
    <main className="flex flex-col max-sm:flex-col w-full">
      <ReturnInfo id={id} />
    </main>
  );
};

const ReturnInfo = memo(
  ({ id }: { id: string | number | null }) => {
    switch (id) {
      case null:
      case undefined:
        return <WelcomeMessage />;
      case 9999:
        return <PowerControl />;
      default:
        return <Cards id={id} />;
    }
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);

export default Dashboard;
