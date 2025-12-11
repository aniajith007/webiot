import React from "react";
import { Slider } from "@mui/material";

export default function DeviceSlider({ value, onChange, color }) {
  return (
    <Slider
      value={value}
      onChange={(_, v) => onChange(v)}
      sx={{
        color,
        height: 6,
        "& .MuiSlider-thumb": {
          width: 18,
          height: 18,
          transition: "0.3s",
          "&:hover": {
            boxShadow: `0 0 0 8px rgba(0,0,0,0.05)`,
          },
        },
      }}
    />
  );
}
