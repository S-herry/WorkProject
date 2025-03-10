import React, { useContext } from "react";
import Button from "../common/Button";
import Image from "../common/Image";
import MenuContext from "../store/Menu-Context";

const Sidebar: React.FC = () => {
  const menu = useContext(MenuContext);
  const { menuItems, selectedItem, SetSelectedItem, showMenu, SetShowMenu } =
    menu;

  return (
    <>
      <aside
        className={`flex flex-col fixed left-0 top-0 h-screen border-r border-solid bg-slate-950 border-r-neutral-600 w-[345px] z-50 ${
          showMenu ? "visible" : "max-sm:hidden"
        } `}
      >
        <div className="px-14 py-10 ">
          <Image src="/images/logo.png" alt="logo" />
        </div>

        <nav className="flex flex-col gap-3 px-8 overflow-y-auto flex-grow scrollbar">
          <h2 className="text-base font-semibold text-zinc-300">
            電腦設備群組列表
          </h2>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              color={
                selectedItem === item ? "bg-[#009844]" : "hover:bg-slate-900"
              }
              onClick={() => {
                SetSelectedItem(item);
                SetShowMenu();
              }}
            >
              {item}
              <Image
                src="/images/ic_chevron.png"
                alt="icon"
                show={selectedItem === item}
              />
            </Button>
          ))}
        </nav>

        <div className="p-10 ">
          <div className="mb-10 h-px bg-neutral-600" />
          <div className="grid gap-5">
            <Button
              color={
                selectedItem === "資料同步" ? "bg-PowerOn" : "bg-[#455471]"
              }
              onClick={() => SetSelectedItem("資料同步")}
            >
              資料同步
            </Button>
            <Button
              color={
                selectedItem === "開關機控制" ? "bg-PowerOn" : "bg-[#455471]"
              }
              onClick={() => SetSelectedItem("開關機控制")}
            >
              開關機控制
            </Button>
          </div>
        </div>
      </aside>
      <div
        onClick={SetShowMenu}
        className={`absolute  w-screen h-full bg-black/80  ${
          showMenu ? "visible sm:hidden" : "hidden"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
