import React from "react";
import MenuItem from "./MenuItem";
import Button from "./common/Button";

const menuItems = [
  "總裁語錄",
  "航點動畫/大事紀",
  "機上設備(一)",
  "機上設備(二)",
  "氣象雷達控制",
  "教育中心花絮",
  "事故的預防",
  "VR內容",
  "安全的夥伴",
];

const Sidebar: React.FC = () => {
  return (
    <aside className="flex relative flex-col border-r border-solid bg-slate-950 border-r-neutral-600 w-[345px] max-md:w-[280px] max-sm:w-full max-sm:h-auto">
      <div className="px-14 py-10">
        <img src="/images/logo.png" alt="" />
      </div>
      <h2 className="px-12 py-0 mb-10 text-lg font-semibold text-zinc-300">
        電腦設備群組列表
      </h2>
      <nav className="flex flex-col max-sm:hidden">
        {menuItems.map((item, index) => (
          <MenuItem key={index} text={item} isActive={index === 0} />
        ))}
      </nav>
      <div className="p-10 mt-auto">
        <div className="mb-10 h-px bg-neutral-600" />
        <Button>資料同步</Button>
        <Button>開關機控制</Button>
      </div>
      <div className="absolute w-1.5 bg-zinc-300 h-[114px] left-[329px] top-[197px]" />
    </aside>
  );
};

export default Sidebar;
