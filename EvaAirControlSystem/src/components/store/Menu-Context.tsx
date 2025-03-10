import { createContext } from "react";

const MenuContext = createContext<{
  showMenu: boolean;
  menuItems: string[];
  selectedItem: string | null;
  SetSelectedItem: (item: string) => void;
  SetShowMenu: () => void;
}>({
  showMenu: true,
  menuItems: [],
  selectedItem: null,
  SetSelectedItem: () => {},
  SetShowMenu: () => {},
});

export default MenuContext;
