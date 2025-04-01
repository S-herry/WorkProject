export interface CardItem {
  id: number;
  computer_name: string;
  ip_address: string;
  status: string;
  mac_address: string;
  last_updated: string;
  current_stage: Stage;
  json_key: string;
  json_filed: Json_filed;
  group: number;
}
export interface Stage {
  room: string;
  category: string;
  id: number;
  menu: string;
  data: string;
  video: string;
}

export interface Json_filed {
  [key: string]: Json_Menus;
}

export interface Json_Menus {
  menus: MenusItem[];
}
export interface MenusItem {
  id: string | number;
  title_tw: string;
  title_en: string;
  type?: string;
  item?: MenusItem[];
}
