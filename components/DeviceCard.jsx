import React, { useState, useEffect } from 'react';
import { getIcon } from '../constants';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const DeviceCard = ({ device, onToggle, onChangeValue }) => {
  const isDimmer = device.type === 'dimmer';
  const isGraph = device.type === 'graph';
  const isSlider = device.type === 'slider';
  const isActive = device.isOn;

  // Graph Data State - Continuous Random Generation
  const [graphData, setGraphData] = useState(() => {
    if (device.type === 'graph') {
       return Array.from({ length: 20 }).map(() => {
          const variance = Math.max(device.value * 0.2, 2);
          const randomOffset = (Math.random() - 0.5) * variance;
          return { v: device.value + randomOffset };
       });
    }
    return [];
  });

  // Display Value State for live updates (syncs with graph)
  const [displayValue, setDisplayValue] = useState(device.value);

  // Sync display value if prop changes
  useEffect(() => {
    setDisplayValue(device.value);
  }, [device.value]);

  // Effect to update graph data and display value periodically
  useEffect(() => {
    if (!isGraph) return;

    const interval = setInterval(() => {
       // Calculate random value based on base prop value
       const variance = Math.max(device.value * 0.2, 2);
       const randomOffset = (Math.random() - 0.5) * variance;
       const newValue = device.value + randomOffset;
       
       // Update both the number displayed and the graph
       setDisplayValue(newValue);
       
       setGraphData(prev => {
          // If empty (shouldn't be initialized empty if isGraph is true, but safety check)
          const currentData = prev.length > 0 ? prev : Array(20).fill({v: device.value});
          
          // Shift left and add new value
          return [...currentData.slice(1), { v: newValue }];
       });
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [isGraph, device.value]);

  // Specific handling for large Graph cards
  if (isGraph) {
    return (
      <div className={`col-span-2 row-span-2 bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-48 transition-colors duration-300`}>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-gray-600 dark:text-gray-400 font-medium text-sm block mb-1">{device.name}</span>
            <span className="text-3xl font-semibold text-gray-800 dark:text-gray-100 transition-all duration-300">
              {displayValue.toFixed(1)} <span className="text-lg text-gray-500 dark:text-gray-500 font-normal">{device.unit}</span>
            </span>
          </div>
          <div className="text-blue-500 dark:text-blue-400">
             {getIcon(device.iconName, "w-6 h-6")}
          </div>
        </div>
        <div className="h-16 w-full -mb-2">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={graphData}>
               <Line 
                 type="monotone" 
                 dataKey="v" 
                 stroke="#f59e0b" 
                 strokeWidth={3} 
                 dot={false} 
                 isAnimationActive={true}
                 animationDuration={500}
               />
             </LineChart>
           </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // Large Slider Card (Dimmer/Brightness)
  if (isDimmer) {
    return (
      <div className={`col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 relative overflow-hidden transition-all duration-300`}>
         <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => onToggle(device.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' 
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
              >
                {getIcon(device.iconName, "w-5 h-5")}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{device.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{isActive ? `${device.value}%` : 'Off'}</span>
              </div>
            </div>
         </div>
         
         {/* Custom chunky slider UI */}
         {/* Use touch-none to prevent scrolling when interacting with the slider */}
         <div className="relative w-full h-14 bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden touch-none isolate">
             {/* The Fill */}
             <div 
               className="absolute top-0 left-0 h-full bg-amber-400 dark:bg-amber-500 transition-all duration-75 ease-out rounded-r-2xl z-0"
               style={{ width: isActive ? `${device.value}%` : '0%' }}
             />
             
             {/* The Interactive Input */}
             <input 
               type="range" 
               min="0" 
               max="100" 
               step="1"
               value={isActive ? device.value : 0}
               onChange={(e) => {
                 onChangeValue(device.id, parseInt(e.target.value));
               }}
               // z-30 ensures it sits above everything
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 touch-none"
             />
             
             {/* Thumb Indicator Visual */}
             <div 
                className="absolute top-1/2 h-6 w-1.5 bg-white shadow-sm rounded-full pointer-events-none transition-all duration-75 ease-out z-10" 
                style={{ 
                    left: `${isActive ? device.value : 0}%`,
                    transform: 'translate(-50%, -50%)'
                }}
             ></div>
         </div>
      </div>
    );
  }

  // Standard Tile (Switch/Sensor/Basic Slider)
  return (
    <div 
      className={`col-span-1 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 transition-colors duration-300 cursor-pointer bg-white dark:bg-gray-800`}
      onClick={(e) => {
        // If clicking the slider area, don't toggle, otherwise toggle
        if (e.target.tagName !== 'INPUT') {
            if (device.type !== 'sensor') onToggle(device.id);
        }
      }}
    >
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isActive 
            ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' 
            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
        }`}>
           {getIcon(device.iconName, "w-5 h-5")}
        </div>
      </div>
      
      <div className="mt-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm block leading-tight">{device.name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
          {device.secondaryText || (isActive ? (device.value > 0 ? `${device.value}${device.unit || ''}` : 'On') : 'Off')}
        </span>
      </div>

      {/* Mini slider for specific types */}
      {isSlider && (
        <div className="mt-2 relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-full overflow-hidden" onClick={e => e.stopPropagation()}>
           <div className="absolute h-full bg-indigo-500 dark:bg-indigo-400" style={{ width: `${device.value}%` }}></div>
           <input 
              type="range"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={device.value}
              onChange={(e) => onChangeValue(device.id, parseInt(e.target.value))}
           />
        </div>
      )}
    </div>
  );
};

export default DeviceCard;