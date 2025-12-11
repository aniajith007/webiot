// components/BlindsCard.jsx
import React from "react";
import DeviceCard from "./Devicecard";

export default function BlindsCard({
  icon,
  title = "Blinds",
  open,
  position,
  onToggle,
}) {
  return (
    <DeviceCard
      icon={icon}
      title={title}
      subtitle={`${open ? "Open" : "Closed"} · ${position}%`}
      active={open}
      color="purple"
      onClick={onToggle}
    />
  );
}
