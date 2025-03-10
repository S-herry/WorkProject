import { useState } from "react";
import MenuContext from "../store/Menu-Context";

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

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  function SetSelectedItem(item: string) {
    setSelectedItem(item);
  }
  function SetShowMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <MenuContext.Provider
      value={{
        showMenu,
        menuItems,
        selectedItem,
        SetSelectedItem,
        SetShowMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
