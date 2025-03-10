export interface MachineStatus {
  isPoweredOn: boolean;
  machineName: string;
}

export interface ActionButtonProps {
  label: string;
  bgColor: string;
  onClick?: () => void;
}
