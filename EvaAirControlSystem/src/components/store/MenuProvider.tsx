import { useState, useCallback, useEffect } from "react";
import MenuContext from "./Menu-Context";
import { Menu } from "./menuType";
import url from "../../assets/data/url.json";
import { fetchInformationCard } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
// const menus: Menu[] = [
//   {
//     id: 5,
//     group_name: "事故預防",
//     description: "第五區：事故預防",
//     created_at: "2025-03-11T10:32:47.431180+08:00",
//     computers: [],
//   },
//   {
//     id: 6,
//     group_name: "守護的角色",
//     description: "第六區：守護的角色",
//     created_at: "2025-03-11T10:33:04.521146+08:00",
//     computers: [],
//   },
//   {
//     id: 7,
//     group_name: "安全的夥伴",
//     description: "第七區：安全的夥伴",
//     created_at: "2025-03-11T10:33:18.777430+08:00",
//     computers: [],
//   },
//   {
//     id: 4,
//     group_name: "安全的確保",
//     description: "第五區：安全的確保",
//     created_at: "2025-03-11T10:32:15.503278+08:00",
//     computers: [],
//   },
//   {
//     id: 2,
//     group_name: "機上的設備(一)",
//     description: "第二區：機上的設備(一)",
//     created_at: "2025-03-11T10:31:43.469815+08:00",
//     computers: [],
//   },
//   {
//     id: 3,
//     group_name: "機上的設備(二)",
//     description: "第三區：機上的設備(二)",
//     created_at: "2025-03-11T10:32:01.365782+08:00",
//     computers: [],
//   },
//   {
//     id: 1,
//     group_name: "航空的成長",
//     description: "第一區：全球的服務(",
//     created_at: "2025-03-11T10:30:44.550053+08:00",
//     computers: [
//       {
//         id: 1,
//         computer_name: "航空的成長",
//         status: "offline",
//       },
//     ],
//   },
// ];

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenu] = useState<Menu[] | null>(null);
  const [selectedMenu, setSelectedItem] = useState<Menu | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["menus"],
    queryFn: async ({ signal }) => {
      const host = url.test ? url.host : "";
      const path = host + url.port.menu;
      if (!path) return [];

      const result = await fetchInformationCard({ url: path, signal });
      return result ?? [];
    },
    gcTime: 1000,
  });

  useEffect(() => {
    if (data) {
      const sortMenu = [...data].sort((a, b) => Number(a.id) - Number(b.id));
      const newMenu = sortMenu.filter((item) => item.id !== 9);
      setMenu(newMenu);
    }
  }, [data]);

  const SetSelectedItem = useCallback(
    (value: Menu) => {
      setSelectedItem(value);
      if (showMenu == true) {
        setShowMenu(false);
      }
    },
    [showMenu]
  );

  function SetShowMenu() {
    setShowMenu(!showMenu);
  }

  function GetCurrentMenu(id: number) {
    const menu = menuItems?.filter((item) => item.id == id);
    setSelectedItem(menu ? menu[0] : null);
  }

  return (
    <MenuContext.Provider
      value={{
        showMenu,
        menuItems,
        selectedMenu,
        SetSelectedItem,
        SetShowMenu,
        GetCurrentMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
