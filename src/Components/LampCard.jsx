// components/LampCard.jsx
import React from "react";
import DeviceCard from "./Devicecard";
import DeviceSlider from "./DeviceSlider";

export default function LampCard({
  title,
  icon,
  color = "yellow",
  isOn,
  brightness,
  onToggle,
  onBrightness,
}) {
  return (
    <DeviceCard
      icon={icon}
      title={title}
      subtitle={isOn ? `${brightness}%` : "Off"}
      active={isOn}
      color={color}
      onClick={onToggle}
    >
      {isOn && (
        <DeviceSlider
          value={brightness}
          onChange={onBrightness}
          color={color}
        />
      )}
    </DeviceCard>
  );
}
