import React, { useState } from 'react';
import { Settings, Home, Thermometer, Cloud, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE, getIcon } from '../constants';
import DeviceCard from './DeviceCard';
import AdminPanel from './AdminPanel';

const Dashboard = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDevice = (roomId, deviceId) => {
    setData(prev => {
      const newRooms = prev.rooms.map(room => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          devices: room.devices.map(dev => {
            if (dev.id !== deviceId) return dev;
            return { ...dev, isOn: !dev.isOn };
          })
        };
      });
      return { ...prev, rooms: newRooms };
    });
  };

  const changeDeviceValue = (roomId, deviceId, newValue) => {
    setData(prev => {
      const newRooms = prev.rooms.map(room => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          devices: room.devices.map(dev => {
            if (dev.id !== deviceId) return dev;
            return { ...dev, value: newValue, isOn: newValue > 0 };
          })
        };
      });
      return { ...prev, rooms: newRooms };
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f4f6] dark:bg-gray-950 pb-24 relative selection:bg-amber-200 transition-colors duration-300">
      {/* Top Status Bar */}
      <header className="sticky top-0 bg-[#f2f4f6]/95 dark:bg-gray-950/95 backdrop-blur-sm z-30 px-6 py-4 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors duration-300">
         <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-gray-800 dark:text-gray-200 font-bold ml-1">My Home</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-red-500 dark:text-red-400">
              <Thermometer className="w-4 h-4" />
              <span>22.8°C</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-blue-500 dark:text-blue-400">
               <Cloud className="w-4 h-4" />
               <span>57%</span>
            </div>
            
            <div className="flex items-center gap-2 pl-2">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Admin Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/')}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
         </div>
      </header>

      <main className="px-4 md:px-6 space-y-8 max-w-4xl mx-auto">
        {data.rooms.map((room) => (
          <section key={room.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             {/* Room Header */}
             <div className="flex items-center gap-3 mb-4 pl-1">
                <div className="text-gray-800 dark:text-gray-200">
                   {getIcon(room.iconName, "w-6 h-6")}
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors">{room.name}</h2>
             </div>

             {/* Device Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {room.devices.map(device => (
                  <DeviceCard 
                    key={device.id} 
                    device={device}
                    onToggle={(id) => toggleDevice(room.id, id)}
                    onChangeValue={(id, val) => changeDeviceValue(room.id, id, val)}
                  />
                ))}
             </div>
          </section>
        ))}
      </main>

      {/* Admin Overlay */}
      {isAdminOpen && (
        <AdminPanel 
          data={data}
          onUpdate={setData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;