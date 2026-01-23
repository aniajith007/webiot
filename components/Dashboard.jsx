import React, { useState } from "react";
import {
  Settings,
  Home,
  Thermometer,
  Cloud,
  LogOut,
  LayoutDashboard,
  User,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { INITIAL_STATE, getIcon } from "../constants";
import DeviceCard from "./DeviceCard";
import AdminPanel from "./AdminPanel copy";

const LogoutDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphic Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onCancel}
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-8 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Confirm Logout
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Are you sure you want to sign out? You will need to enter your
            username and password again to access your home controls.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={onCancel}
              className="py-3 px-4 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const navigate = useNavigate();
  const username = "";

  const toggleDevice = (roomId, deviceId) => {
    setData((prev) => {
      const newRooms = prev.rooms.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          devices: room.devices.map((dev) => {
            if (dev.id !== deviceId) return dev;
            return { ...dev, isOn: !dev.isOn };
          }),
        };
      });
      return { ...prev, rooms: newRooms };
    });
  };

  const changeDeviceValue = (roomId, deviceId, newValue) => {
    setData((prev) => {
      const newRooms = prev.rooms.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          devices: room.devices.map((dev) => {
            if (dev.id !== deviceId) return dev;
            return { ...dev, value: newValue, isOn: newValue > 0 };
          }),
        };
      });
      return { ...prev, rooms: newRooms };
    });
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Clear local storage/session here if needed
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f2f4f6] dark:bg-gray-950 pb-24 relative selection:bg-amber-200 transition-colors duration-300">
      {/* Top Status Bar */}
      <header
        className="sticky top-0 z-30 w-full px-6 py-4 flex justify-between items-center 
      bg-[#f2f4f6]/95 dark:bg-gray-950/95 backdrop-blur-md 
      border-b border-gray-200 dark:border-gray-800 
      transition-colors duration-300"
      >
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-1.5 rounded-lg shadow-sm">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-800 dark:text-gray-200 font-bold tracking-tight">
              My Home
            </span>
          </div>
        </div>

        {/* Environmental Stats & User Actions */}
        <div className="flex items-center gap-6">
          {/* Sensor Data (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <Thermometer className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="text-gray-700 dark:text-gray-300">22.8°C</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">57%</span>
            </div>
          </div>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-6">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 ml-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-none">
                  {username ? username : "Admin"}
                </p>
                <p className="text-[10px] text-green-500 font-medium uppercase tracking-wider">
                  Online
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white border-2 border-white dark:border-gray-800 shadow-md">
                <User className="w-5 h-5" />
              </div>
            </div>

            <button
              onClick={() => setShowLogoutConfirm(true)} // Open Dialog
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showLogoutConfirm && (
        <LogoutDialog
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      <main className="px-4 md:px-6 space-y-8 max-w-4xl mx-auto">
        {data.rooms.map((room) => (
          <section
            key={room.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {/* Room Header */}
            <div className="flex items-center gap-3 mb-4 pl-1">
              <div className="text-gray-800 dark:text-gray-200">
                {getIcon(room.iconName, "w-6 h-6")}
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
                {room.name}
              </h2>
            </div>

            {/* Device Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {room.devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onToggle={(id) => toggleDevice(room.id, id)}
                  onChangeValue={(id, val) =>
                    changeDeviceValue(room.id, id, val)
                  }
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
