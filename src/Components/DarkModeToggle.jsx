import React, { useContext } from "react";
import { ThemeContext } from "../theme/Themecontext";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function DarkToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        p-2 rounded-xl
        bg-gray-200 dark:bg-gray-700
        transition-all hover:scale-105 shadow-sm
      "
    >
      {dark ? (
        <LightMode className="text-yellow-300" />
      ) : (
        <DarkMode className="text-gray-700" />
      )}
    </button>
  );
}
