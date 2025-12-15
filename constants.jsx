import { 
  LampFloor, 
  Lightbulb, 
  Blinds, 
  Projector, 
  Refrigerator, 
  Speaker, 
  Zap, 
  Activity, 
  Thermometer, 
  Droplets, 
  Car,
  Tv,
  Sofa,
  Utensils,
  BedDouble
} from 'lucide-react';
import React from 'react';

// Available icons for selection
export const AVAILABLE_ICONS = [
  'sofa', 'kitchen', 'bedroom', 'lamp', 'bulb', 
  'blinds', 'shutter', 'fridge', 'speaker', 'power', 
  'graph', 'temp', 'water', 'car', 'tv'
];

// Helper to map string names to components
export const getIcon = (name, className) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'sofa': return <Sofa {...props} />;
    case 'kitchen': return <Utensils {...props} />;
    case 'bedroom': return <BedDouble {...props} />;
    case 'lamp': return <LampFloor {...props} />;
    case 'bulb': return <Lightbulb {...props} />;
    case 'blinds': return <Blinds {...props} />;
    case 'shutter': return <Projector {...props} />; 
    case 'fridge': return <Refrigerator {...props} />;
    case 'speaker': return <Speaker {...props} />;
    case 'power': return <Zap {...props} />;
    case 'graph': return <Activity {...props} />;
    case 'temp': return <Thermometer {...props} />;
    case 'water': return <Droplets {...props} />;
    case 'car': return <Car {...props} />;
    case 'tv': return <Tv {...props} />;
    default: return <Zap {...props} />;
  }
};

export const INITIAL_STATE = {
  rooms: [
    {
      id: 'r1',
      name: 'Living room',
      iconName: 'sofa',
      devices: [
        { id: 'd1', name: 'Floor lamp', type: 'dimmer', isOn: true, value: 70, unit: '%', iconName: 'lamp' },
        { id: 'd2', name: 'Spotlights', type: 'dimmer', isOn: true, value: 49, unit: '%', iconName: 'bulb' },
        { id: 'd3', name: 'Bar lamp', type: 'switch', isOn: true, value: 100, iconName: 'bulb', colorMode: 'warm' },
        { id: 'd4', name: 'Blinds', type: 'slider', isOn: false, value: 100, secondaryText: 'Open', iconName: 'blinds' },
        { id: 'd5', name: 'Media', type: 'switch', isOn: false, value: 0, secondaryText: 'Playing', iconName: 'tv' },
      ]
    },
    {
      id: 'r2',
      name: 'Kitchen',
      iconName: 'kitchen',
      devices: [
        { id: 'd6', name: 'Shutter', type: 'slider', isOn: false, value: 100, secondaryText: 'Open', iconName: 'shutter' },
        { id: 'd7', name: 'Spotlights', type: 'switch', isOn: false, value: 0, secondaryText: 'Off', iconName: 'bulb' },
        { id: 'd8', name: 'Worktop', type: 'switch', isOn: false, value: 0, secondaryText: 'Off', iconName: 'lamp' },
        { id: 'd9', name: 'Fridge', type: 'sensor', isOn: true, value: 4, unit: '°C', secondaryText: 'Closed', iconName: 'fridge' },
        { id: 'd10', name: 'Speaker', type: 'switch', isOn: true, value: 100, secondaryText: 'On', iconName: 'speaker' },
      ]
    },
    {
      id: 'r3',
      name: 'Climate & Energy',
      iconName: 'activity',
      devices: [
        { id: 'd11', name: 'Temperature', type: 'graph', isOn: true, value: 10.2, unit: '°C', iconName: 'temp' },
        { id: 'd12', name: 'Illuminance', type: 'sensor', isOn: true, value: 555, unit: 'lx', iconName: 'bulb' },
        { id: 'd13', name: 'EV', type: 'sensor', isOn: false, value: 0, secondaryText: 'Unplugged', iconName: 'car' },
        { id: 'd14', name: 'Home power', type: 'sensor', isOn: true, value: 797.86, unit: 'W', iconName: 'power' },
      ]
    }
  ]
};