import { useContext } from "react";
import TabSection from "../components/TabSection";
import WelcomeMessage from "../components/WelcomeMessage";
import MenuContext from "../components/store/Menu-Context";
import Cards from "../components/Cards";
import DataSynchronization from "../components/DataSynchronization";
import PowerControl from "../components/PowerControl";

const Dashboard: React.FC = () => {
  const menu = useContext(MenuContext);
  const { selectedItem } = menu;

  function ReturnInfo() {
    if (selectedItem == null) {
      return <WelcomeMessage />;
    } else if (selectedItem == "資料同步") {
      return <DataSynchronization />;
    } else if (selectedItem == "開關機控制") {
      return <PowerControl />;
    } else {
      return <Cards />;
    }
  }

  return (
    <main className="flex flex-col  bg-slate-950 max-sm:flex-col w-full pt-40">
      <section className="flex flex-col px-20 ">
        <TabSection title={selectedItem ? selectedItem : "歡迎使用"} />
        {ReturnInfo()}
      </section>
    </main>
  );
};

export default Dashboard;
