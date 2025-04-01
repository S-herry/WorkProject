export interface MachineStatus {
  id?: string | number;
  isPoweredOn: boolean;
  machineName: string;
}

export interface ActionButtonProps {
  label: string;
  bgColor: string;
  onClick?: () => void;
}
