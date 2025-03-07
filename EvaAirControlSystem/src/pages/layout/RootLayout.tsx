import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Button from "../../components/common/Button";
import Image from "../../components/common/Image";
interface routerType {
  id: number;
  title: string;
  to: string;
}
const navLinkActive = "block py-2 bg-green-600 rounded-md";
const router: routerType[] = [
  { id: 1, title: "MapNavigation", to: "/" },
  { id: 2, title: "Todos", to: "/test" },
];

const RootLayout = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleOpenNav = () => {
    setOpen(!open);
  };

  return (
    <div className="h-screen bg-white overflow-y-scroll ">
      <header className="flex justify-between items-center sticky top-0 w-full bg-white h-24 z-20 shadow">
        <button
          onClick={handleOpenNav}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        <Image src="/images/logo.png" alt="logo" width="200px" />
        <h4 className="text-center hidden sm:block transition-transform">
          安全教育中心
          <br />
          內容管理儀表板
        </h4>
        <Button color="bg-[#FF6666]">登出</Button>
      </header>

      <main className="flex relative justify-between h-full">
        <aside
          className={`fixed top-0 left-0 w-64 pt-24 h-full transition-transform transform z-10 ${
            open ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <h5 className=" h-[5%] bg-gray-300 flex justify-center items-center ">
            電腦設備群組列表
          </h5>
          <ul className="overflow-y-scroll flex flex-col  h-[80%] text-center gap-2 w-full p-2 bg-white ">
            {router.map((item) => (
              <li key={item.id}>
                <NavLink
                  onClick={handleOpenNav}
                  className={({ isActive }) =>
                    isActive ? navLinkActive + " text-white" : navLinkActive
                  }
                  to={item.to}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className=" bg-gray-300 flex justify-center items-center h-[15%] ">
            <Button>關閉控制機</Button>
          </div>
        </aside>
        <section className="p-4 sm:ml-64 relative w-full h-full">
          {open && (
            <div
              className="-inset-0 absolute bg-black/50  w-full h-full sm:hidden block"
              onClick={handleOpenNav}
            ></div>
          )}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default RootLayout;
