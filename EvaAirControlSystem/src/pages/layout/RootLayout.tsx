import Sidebar from "../../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <Header />
      <Sidebar />
      <main className="flex-1 flex pl-[21.5rem] max-sm:pl-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
