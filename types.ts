export type DeviceType = 
  | 'switch' 
  | 'dimmer' 
  | 'slider' 
  | 'sensor' 
  | 'graph' 
  | 'thermostat';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  value: number; // For dimmers, sensors, temps
  unit?: string; // e.g., "°C", "%", "W"
  iconName: string;
  secondaryText?: string; // e.g., "Open 100%"
  colorMode?: 'default' | 'warm' | 'cool'; // For lighting color simulation
}

export interface Room {
  id: string;
  name: string;
  iconName: string;
  devices: Device[];
}

export interface AppState {
  rooms: Room[];
}
