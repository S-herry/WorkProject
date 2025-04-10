import { createContext } from "react";
import { Menu } from "./menuType";

const MenuContext = createContext<{
  showMenu: boolean;
  menuItems: Menu[] | null;
  selectedMenu: Menu | null;
  SetShowMenu: () => void;
  SetSelectedItem: (item: Menu) => void;
  GetCurrentMenu: (id: number) => void;
}>({
  showMenu: true,
  menuItems: [],
  selectedMenu: null,
  SetSelectedItem: () => {},
  SetShowMenu: () => {},
  GetCurrentMenu: () => {},
});

export default MenuContext;
