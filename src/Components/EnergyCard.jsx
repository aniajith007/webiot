// components/EnergyCard.jsx
import React from "react";
import DeviceCard from "./Devicecard";

export default function EnergyCard({ icon, title, value, unit, color }) {
  return (
    <DeviceCard
      icon={icon}
      title={title}
      subtitle={`${value} ${unit}`}
      active={true}
      color={color}
    />
  );
}
