export interface Menu {
  id: number | string;
  group_name: string;
  description?: string;
  created_at?: string;
  computers?: Computers[];
}
export interface Computers {
  id: number | string;
  computer_name: string;
  status?: string;
  is_control: boolean;
}
