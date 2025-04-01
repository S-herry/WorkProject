import Sidebar from "../../components/layout/Sidebar";
import { Outlet, redirect } from "react-router-dom";
import Header from "../../components/layout/Header";
import url from "../../assets/data/url.json";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen relative bg-MineBgColor">
      <Header />
      <Sidebar />
      <main className=" pl-[22.5rem]  max-sm:pl-0  md:pl-[18rem] pt-56 max-sm:mx-5 md:ms-20 md:me-5 lg:ms-20  w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

export async function LoginState() {
  const test = url.test ? url.host : "";
  const path = test + url.port.loginState;
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
