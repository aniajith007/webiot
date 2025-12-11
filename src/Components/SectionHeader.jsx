// components/SectionHeader.jsx
import React from "react";

export default function SectionHeader({ icon, right }) {
  return (
    <div className="flex items-center justify-between mb-4">
      {icon}
      {right}
    </div>
  );
}
