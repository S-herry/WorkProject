import Sidebar from "../../components/layout/Sidebar";
import { Outlet, redirect } from "react-router-dom";
import Header from "../../components/layout/Header";
import url from "../../assets/data/url.json";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen relative  px-5 bg-MineBgColor">
      <Sidebar />
      <div className="pl-0 xl:pl-[21rem] w-full">
        <Header />
        <main className="  w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;

export async function LoginState() {
  const host = url.test ? url.host : "";
  const path = host + url.port.loginState;
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error("取得menu 錯誤");
  }
  const data = await res.json();
  if (!data.logged_in) {
    return redirect("/login");
  }
  return true;
}
