import React, { useState } from "react";
import { Plus, Trash2, Save, X, ChevronDown } from "lucide-react";
import { getIcon, AVAILABLE_ICONS } from "../constants";

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
      name: "New Room",
      iconName: "sofa",
      devices: [],
    };
    setLocalData({ ...localData, rooms: [...localData.rooms, newRoom] });
  };

  const removeRoom = (id) => {
    setLocalData({
      ...localData,
      rooms: localData.rooms.filter((r) => r.id !== id),
    });
  };

  const addDevice = (roomId) => {
    const newDevice = {
      id: `dev-${Date.now()}`,
      name: "New Device",
      type: "switch",
      isOn: false,
      value: 0,
      iconName: "bulb",
    };

    const updatedRooms = localData.rooms.map((r) => {
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
      rooms: localData.rooms.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    });
  };

  const updateDevice = (roomId, devId, updates) => {
    const updatedRooms = localData.rooms.map((r) => {
      if (r.id === roomId) {
        return {
          ...r,
          devices: r.devices.map((d) =>
            d.id === devId ? { ...d, ...updates } : d
          ),
        };
      }
      return r;
    });
    setLocalData({ ...localData, rooms: updatedRooms });
  };

  const removeDevice = (roomId, devId) => {
    const updatedRooms = localData.rooms.map((r) => {
      if (r.id === roomId) {
        return {
          ...r,
          devices: r.devices.filter((d) => d.id !== devId),
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
          <span className="truncate capitalize text-gray-700 dark:text-gray-200">
            {currentIcon}
          </span>
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
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all ${
                currentIcon === icon
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-2 ring-blue-100 dark:ring-blue-800"
                  : "text-gray-500 dark:text-gray-400"
              }`}
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
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Admin Configuration
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {localData.rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {/* Room Header Configuration */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 border-b dark:border-gray-700 pb-4">
              <div className="flex-1">
                <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1 block pl-1">
                  Room Name
                </label>
                <input
                  value={room.name}
                  onChange={(e) =>
                    updateRoom(room.id, { name: e.target.value })
                  }
                  className="text-lg font-bold text-gray-800 dark:text-white border-b-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 outline-none w-full bg-transparent px-1 py-1 transition-colors"
                  placeholder="Room Name"
                />
              </div>
              <div className="w-full md:w-48">
                <label className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1 block pl-1">
                  Icon
                </label>
                {renderIconPicker(
                  room.iconName,
                  (icon) => updateRoom(room.id, { iconName: icon }),
                  room.id
                )}
              </div>
              <div className="flex items-end pb-1">
                <button
                  onClick={() => removeRoom(room.id)}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {room.devices.map((device) => (
                <div
                  key={device.id}
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="grid grid-cols-12 gap-4 items-end">
                    {/* 1. Basic Info (Name & Type) */}
                    <div className="col-span-12 md:col-span-3">
                      <label className="text-xs text-gray-500 mb-1 block font-medium">
                        Device Name
                      </label>
                      <input
                        value={device.name}
                        onChange={(e) =>
                          updateDevice(room.id, device.id, {
                            name: e.target.value,
                          })
                        }
                        className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* 2. Type Selector */}
                    <div className="col-span-6 md:col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block font-medium">
                        Type
                      </label>
                      <select
                        value={device.type}
                        onChange={(e) =>
                          updateDevice(room.id, device.id, {
                            type: e.target.value,
                          })
                        }
                        className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200"
                      >
                        <option value="switch">Switch</option>
                        <option value="dimmer">Dimmer</option>
                        <option value="sensor">Sensor</option>
                      </select>
                    </div>

                    {/* 3. Initial Status (Toggle) */}
                    <div className="col-span-6 md:col-span-2 flex flex-col items-center pb-2">
                      <label className="text-xs text-gray-500 mb-2 block font-medium">
                        Initial State
                      </label>
                      <button
                        onClick={() =>
                          updateDevice(room.id, device.id, {
                            isOn: !device.isOn,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          device.isOn
                            ? "bg-blue-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            device.isOn ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* 4. Initial Value (Slider) - Only show if not a simple switch */}
                    {/* 4. Initial Value (Premium Slider) */}
                    <div className="col-span-12 md:col-span-4 space-y-3">
                      <div className="flex justify-between items-end px-1">
                        <label className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                          Default Output
                        </label>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                            {device.value || 0}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            %
                          </span>
                        </div>
                      </div>

                      <div className="relative group flex items-center h-6">
                        {/* Custom Track Background */}
                        <div className="absolute w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          {/* Active Progress Highlight */}
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                            style={{ width: `${device.value || 0}%` }}
                          />
                        </div>

                        {/* The Hidden Input (Controls logic) */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={device.value || 0}
                          disabled={device.type === "switch"}
                          onChange={(e) =>
                            updateDevice(room.id, device.id, {
                              value: parseInt(e.target.value),
                            })
                          }
                          className="absolute w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />

                        {/* Custom Thumb (Visual representation) */}
                        <div
                          className="absolute pointer-events-none w-6 h-6 bg-white dark:bg-gray-100 rounded-full shadow-lg border-2 border-blue-500 transition-all duration-100 flex items-center justify-center"
                          style={{ left: `calc(${device.value || 0}% - 12px)` }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        </div>
                      </div>

                      {/* Helper Text for Switch types */}
                      {device.type === "switch" && (
                        <p className="text-[10px] text-gray-400 italic text-right">
                          Intensity not applicable for switches
                        </p>
                      )}
                    </div>

                    {/* 5. Delete Button */}
                    <div className="col-span-2 md:col-span-1 flex justify-end pb-1">
                      <button
                        onClick={() => removeDevice(room.id, device.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
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
