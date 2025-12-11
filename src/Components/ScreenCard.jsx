// components/ScreenCard.jsx
import React from "react";
import DeviceCard from "./Devicecard";

export default function ScreenCard({ icon, isOn, onToggle }) {
  return (
    <DeviceCard
      icon={icon}
      title={isOn ? "Playing" : "Off"}
      subtitle={null}
      active={isOn}
      color="cyan"
      onClick={onToggle}
    />
  );
}
