import React, { useState } from 'react';
import { Plus, Trash2, Save, X, ChevronDown } from 'lucide-react';
import { getIcon, AVAILABLE_ICONS } from '../constants';

const AdminPanel = ({ data, onUpdate, onClose }) => {
  const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(data)));
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleSave = () => {
    onUpdate(localData);
    onClose();
  };

  const addRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: 'New Room',
      iconName: 'sofa',
      devices: []
    };
    setLocalData({ ...localData, rooms: [...localData.rooms, newRoom] });
  };

  const removeRoom = (id) => {
    setLocalData({ ...localData, rooms: localData.rooms.filter(r => r.id !== id) });
  };

  const addDevice = (roomId) => {
    const newDevice = {
      id: `dev-${Date.now()}`,
      name: 'New Device',
      type: 'switch',
      isOn: false,
      value: 0,
      iconName: 'bulb'
    };
    
    const updatedRooms = localData.rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, devices: [...r.devices, newDevice] };
      }
      return r;
    });
    setLocalData({ ...localData, rooms: updatedRooms });
  };

  const updateRoom = (id, updates) => {
    setLocalData({
      ...localData,
      rooms: localData.rooms.map(r => r.id === id ? { ...r, ...updates } : r)
    });
  };

  const updateDevice = (roomId, devId, updates) => {
    const updatedRooms = localData.rooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          devices: r.devices.map(d => d.id === devId ? { ...d, ...updates } : d)
        };
      }
      return r;
    });
    setLocalData({ ...localData, rooms: updatedRooms });
  };

  const removeDevice = (roomId, devId) => {
    const updatedRooms = localData.rooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          devices: r.devices.filter(d => d.id !== devId)
        };
      }
      return r;
    });
    setLocalData({ ...localData, rooms: updatedRooms });
  };

  // Helper to render the Icon Picker dropdown
  const renderIconPicker = (currentIcon, onSelect, id) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdownId(openDropdownId === id ? null : id)}
        className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-between focus:border-blue-500 outline-none hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {getIcon(currentIcon, "w-4 h-4 text-gray-600 dark:text-gray-300")}
          <span className="truncate capitalize text-gray-700 dark:text-gray-200">{currentIcon}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {openDropdownId === id && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-3 grid grid-cols-5 gap-2 animate-in fade-in zoom-in-95 duration-100">
          {AVAILABLE_ICONS.map((icon) => (
            <button
              key={icon}
              onClick={() => {
                onSelect(icon);
                setOpenDropdownId(null);
              }}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all ${currentIcon === icon ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-2 ring-blue-100 dark:ring-blue-800' : 'text-gray-500 dark:text-gray-400'}`}
              title={icon}
            >
              {getIcon(icon, "w-5 h-5")}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 overflow-y-auto pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-4 flex justify-between items-center shadow-sm z-40 transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Configuration</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
            <X className="w-6 h-6" />
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {localData.rooms.map((room) => (
          <div key={room.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            {/* Room Header Configuration */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 border-b dark:border-gray-700 pb-4">
              <div className="flex-1">
                 <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1 block pl-1">Room Name</label>
                 <input 
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                    className="text-lg font-bold text-gray-800 dark:text-white border-b-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 outline-none w-full bg-transparent px-1 py-1 transition-colors"
                    placeholder="Room Name"
                 />
              </div>
              <div className="w-full md:w-48">
                 <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1 block pl-1">Icon</label>
                 {renderIconPicker(
                    room.iconName, 
                    (icon) => updateRoom(room.id, { iconName: icon }),
                    room.id
                 )}
              </div>
              <div className="flex items-end pb-1">
                  <button onClick={() => removeRoom(room.id)} className="text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
              </div>
            </div>

            <div className="space-y-4">
              {room.devices.map((device) => (
                <div key={device.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                   <div className="grid grid-cols-12 gap-4 w-full items-start">
                      <div className="col-span-12 md:col-span-4">
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-medium">Device Name</label>
                        <input 
                          value={device.name}
                          onChange={(e) => updateDevice(room.id, device.id, { name: e.target.value })}
                          className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors"
                        />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                         <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-medium">Type</label>
                         <select 
                            value={device.type}
                            onChange={(e) => updateDevice(room.id, device.id, { type: e.target.value })}
                            className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                         >
                            <option value="switch">Switch</option>
                            <option value="dimmer">Dimmer (Big)</option>
                            <option value="slider">Slider (Slim)</option>
                            <option value="sensor">Sensor</option>
                            <option value="graph">Graph</option>
                         </select>
                      </div>
                      <div className="col-span-5 md:col-span-4 relative">
                         <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-medium">Icon</label>
                         {renderIconPicker(
                            device.iconName,
                            (icon) => updateDevice(room.id, device.id, { iconName: icon }),
                            device.id
                         )}
                      </div>
                      <div className="col-span-1 flex justify-end mt-6 md:mt-0 items-center h-full pt-6">
                        <button onClick={() => removeDevice(room.id, device.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                   </div>
                </div>
              ))}
              
              <button 
                onClick={() => addDevice(room.id)}
                className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 dark:text-gray-500 font-medium hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Device
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={addRoom}
          className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl shadow-lg hover:bg-black dark:hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg font-medium"
        >
          <Plus className="w-6 h-6" /> Add New Room
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;